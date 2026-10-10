import { afterAll, beforeAll, expect, test } from "bun:test";
import { createServer } from "node:net";
import { fileURLToPath } from "node:url";

let server: ReturnType<typeof Bun.spawn>;
let baseUrl: string;

beforeAll(async () => {
  // Ask the OS for an unused port so the test can run beside a dev server.
  const port = await new Promise<number>((resolve, reject) => {
    const socket = createServer();
    socket.on("error", reject);
    socket.listen(0, "127.0.0.1", () => {
      const address = socket.address();
      if (!address || typeof address === "string") {
        socket.close();
        reject(new Error("Could not allocate a test port."));
        return;
      }
      socket.close(() => resolve(address.port));
    });
  });
  baseUrl = `http://127.0.0.1:${port}`;
  server = Bun.spawn(
    [process.execPath, "node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)],
    { cwd: fileURLToPath(new URL("../", import.meta.url)), stdout: "inherit", stderr: "inherit" },
  );

  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error("Next.js exited before becoming ready. Run bun run build first.");
    }
    try {
      const response = await fetch(`${baseUrl}/api/health`, { signal: AbortSignal.timeout(1_000) });
      if (response.ok) return;
    } catch {
      // The server may still be starting.
    }
    await Bun.sleep(100);
  }
  throw new Error("Next.js did not become ready.");
}, 20_000);

afterAll(async () => {
  if (server) {
    server.kill();
    await server.exited;
  }
});

test("the production server renders the starter page", async () => {
  const response = await fetch(baseUrl);
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("text/html");
  const html = await response.text();
  expect(html).toContain("Build your next idea.");
  expect(html).toContain("Check connection");
});

test("the health endpoint responds through Next.js", async () => {
  const response = await fetch(`${baseUrl}/api/health`);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});

test("the API example returns the message contract used by the UI", async () => {
  const response = await fetch(`${baseUrl}/api/message`);
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
  expect(await response.json()).toEqual({ message: "Hello from Next.js." });
});

test("the message endpoint rejects unsupported writes", async () => {
  const response = await fetch(`${baseUrl}/api/message`, { method: "POST" });
  expect(response.status).toBe(405);
});
