// Dev-mini browser screenshot helper (no external deps).
// Usage:
//   node scripts/screenshot.mjs --url http://127.0.0.1:3000 --out shot.png
//   [--width 1440] [--height 900] [--full] [--scale 1] [--wait 500]
//   [--eval "document.querySelector('.x').click()"] [--wait-after 600] [--mobile]
//   [--dpr 1]
// Repeatable: --eval and --wait-after pairs run in order.
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

function parseArgs(argv) {
  const out = { url: "http://127.0.0.1:3000", out: "shot.png", width: 1440, height: 900, full: false, scale: 1, wait: 700, mobile: false, dpr: 1, actions: [], timeout: 30000, anchor: null, anchorOffset: 0, profile: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => argv[++i];
    if (a === "--url") out.url = next();
    else if (a === "--profile") out.profile = next();
    else if (a === "--navigate") out.actions.push({ type: "navigate", value: next() });
    else if (a === "--out") out.out = next();
    else if (a === "--width") out.width = Number(next());
    else if (a === "--height") out.height = Number(next());
    else if (a === "--full") out.full = true;
    else if (a === "--scale") out.scale = Number(next());
    else if (a === "--dpr") out.dpr = Number(next());
    else if (a === "--wait") out.wait = Number(next());
    else if (a === "--timeout") out.timeout = Number(next());
    else if (a === "--mobile") out.mobile = true;
    else if (a === "--anchor") out.anchor = next();
    else if (a === "--anchor-offset") out.anchorOffset = Number(next());
    else if (a === "--eval") out.actions.push({ type: "eval", value: next() });
    else if (a === "--eval-file") out.actions.push({ type: "eval-file", value: next() });
    else if (a === "--wait-after") out.actions.push({ type: "wait", value: Number(next()) });
    else if (a === "--click") out.actions.push({ type: "click", value: next() });
    else if (a === "--scroll") out.actions.push({ type: "scroll", value: next() });
    else throw new Error(`unknown arg ${a}`);
  }
  return out;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForChrome(port, timeout) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (res.ok) return;
    } catch {}
    await sleep(120);
  }
  throw new Error("chrome did not start");
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const pending = new Map();
    let id = 0;
    const events = [];
    ws.addEventListener("open", () => resolve({ ws, send, events }));
    ws.addEventListener("error", () => reject(new Error("ws error")));
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        const { resolve: res, reject: rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(JSON.stringify(msg.error)));
        else res(msg.result);
      } else if (msg.method) {
        events.push(msg);
      }
    });
    function send(method, params = {}) {
      const msgId = ++id;
      return new Promise((res, rej) => {
        pending.set(msgId, { resolve: res, reject: rej });
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }
  });
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const port = 9300 + Math.floor(Math.random() * 500);
  const profile = opts.profile || (await fs.mkdtemp(path.join(os.tmpdir(), "dsh-shot-")));
  if (opts.profile) await fs.mkdir(opts.profile, { recursive: true });
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--hide-scrollbars",
    "--force-color-profile=srgb",
    "--font-render-hinting=none",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    "about:blank",
  ], { stdio: "ignore" });

  try {
    await waitForChrome(port, 15000);
    const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const target = list.find((t) => t.type === "page");
    const { ws, send, events } = await connect(target.webSocketDebuggerUrl);

    await send("Page.enable");
    await send("Runtime.enable");
    await send("Log.enable");
    await send("Emulation.setDeviceMetricsOverride", {
      width: opts.width,
      height: opts.height,
      deviceScaleFactor: opts.dpr,
      mobile: opts.mobile,
    });
    await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "no-preference" }] });

    await send("Page.navigate", { url: opts.url });
    await sleep(opts.wait);

    // wait for network quiet-ish
    const started = Date.now();
    await sleep(300);

    for (const action of opts.actions) {
      if (action.type === "eval" || action.type === "eval-file") {
        const expression = action.type === "eval-file" ? await fs.readFile(action.value, "utf8") : action.value;
        const res = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
        if (res.exceptionDetails) console.error("eval warning:", JSON.stringify(res.exceptionDetails).slice(0, 400));
        else if (res.result?.value !== undefined) console.error("eval:", JSON.stringify(res.result.value).slice(0, 300));
        await sleep(250);
      } else if (action.type === "click") {
        const res = await send("Runtime.evaluate", {
          expression: `(() => { const el = document.querySelector(${JSON.stringify(action.value)}); if (!el) return 'not-found'; el.click(); return 'ok'; })()`,
          returnByValue: true,
        });
        console.error("click:", res.result?.value);
        await sleep(250);
      } else if (action.type === "scroll") {
        await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${Number(action.value) || 0})` });
        await sleep(200);
      } else if (action.type === "navigate") {
        await send("Page.navigate", { url: action.value });
        await sleep(1300);
      } else if (action.type === "wait") {
        await sleep(action.value);
      }
    }

    // optional: scroll to top so screenshots start at the page top
    let scrollY = 0;
    if (opts.anchor) {
      const res = await send("Runtime.evaluate", {
        expression: `(() => { const el = document.querySelector(${JSON.stringify(opts.anchor)}); if (!el) return -1; const y = el.getBoundingClientRect().top + window.scrollY - ${opts.anchorOffset || 0}; window.scrollTo(0, Math.max(0, y)); return window.scrollY; })()`,
        returnByValue: true,
      });
      scrollY = Number(res.result?.value) || 0;
      await sleep(350);
    } else {
      await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
      await sleep(120);
    }

    let screenshotParams = { format: "png", fromSurface: true, captureBeyondViewport: true };
    if (opts.full) {
      const metrics = await send("Page.getLayoutMetrics");
      const content = metrics.cssContentSize || metrics.contentSize;
      const height = Math.min(Math.ceil(content.height), 12000);
      screenshotParams = {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: Math.ceil(content.width), height, scale: opts.scale },
      };
    } else {
      screenshotParams = { ...screenshotParams, clip: { x: 0, y: scrollY, width: opts.width, height: opts.height, scale: opts.scale } };
    }

    const shot = await send("Page.captureScreenshot", screenshotParams);
    const outPath = path.resolve(opts.out);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, Buffer.from(shot.data, "base64"));
    console.error(`saved ${outPath} (${Date.now() - started}ms)`);
    // surface page-side errors (exceptions, console.error, failed requests)
    const problems = events.filter((event) => {
      if (event.method === "Runtime.exceptionThrown") return true;
      if (event.method === "Log.entryAdded") return event.params?.entry?.level === "error";
      if (event.method === "Runtime.consoleAPICalled") return event.params?.type === "error";
      return false;
    });
    if (problems.length) {
      for (const problem of problems.slice(0, 8)) {
        const text =
          problem.params?.exceptionDetails?.text ||
          problem.params?.entry?.text ||
          problem.params?.args?.map((arg) => arg.value ?? arg.description).join(" ");
        console.error("page error:", String(text).slice(0, 300));
      }
    }
    ws.close();
  } finally {
    chrome.kill();
    await sleep(300);
    if (!opts.profile) fs.rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

main().catch((err) => {
  console.error("FAILED:", err.message);
  process.exitCode = 1;
});
