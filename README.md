# Webdev Template

A small starter for **Bun + Next.js + React + TypeScript + Tailwind CSS + shadcn/ui**. It includes a responsive homepage, a working browser-to-server API example, linting, type checks, and a production smoke test.

Need Python? Use [webdev-template-python](https://github.com/EdwardAstill/webdev-template-python), which adds FastAPI and uv in the same repository.

## Start a project

1. Select **Use this template → Create a new repository** on GitHub and choose your new project's name.
2. Clone **your newly created repository**, then open its folder.
3. Install [Bun](https://bun.com/docs/installation) **1.4.2**, the version pinned in `.bun-version` and `package.json` and used by CI.
4. Run:

   ```bash
   bun run setup
   bun run dev
   ```

Open [localhost:3000](http://localhost:3000). Edit `src/app/page.tsx` and save to see the change. Click **Check connection** to call `/api/message` and display `Hello from Next.js.`

No environment variables, database, or account keys are needed. `.env.example` explains where to add local configuration later. If port 3000 is in use, stop the other server or use `bun run dev --port 3001`.

## Everyday commands

| Command | What it does |
| --- | --- |
| `bun run setup` | Install the exact dependencies in `bun.lock` |
| `bun run dev` | Start the Next.js development server on port 3000 |
| `bun run check` | Run ESLint and TypeScript checks |
| `bun run build` | Create a production Next.js build |
| `bun run start` | Serve that production build on port 3000 |
| `bun run test:smoke` | Start the built app on a temporary port and test its page and APIs |

Before pushing a change:

```bash
bun run check
bun run build
bun run test:smoke
```

GitHub Actions runs the same checks on pushes and pull requests. The smoke test needs an existing production build, starts its own server, and stops it when finished. It verifies server rendering and HTTP contracts; it does not replace browser interaction tests for features you add.

## Where things live

```text
src/
├── app/
│   ├── api/health/route.ts    # GET /api/health → { status: "ok" }
│   ├── api/message/route.ts   # GET /api/message → an example message
│   ├── globals.css           # Tailwind and shadcn theme tokens
│   ├── layout.tsx            # Shared layout and page metadata
│   └── page.tsx              # Starter homepage
├── components/
│   ├── api-example.tsx       # Client interaction, loading, and error states
│   └── ui/                   # Editable shadcn Button and Card source
└── lib/utils.ts              # shadcn class-name utility export
public/                       # Static assets
tests/smoke.test.ts           # Tests the built app over HTTP
```

The homepage is a React Server Component. `api-example.tsx` uses `"use client"` because it has state and click handlers. API routes execute on the server. Start your app by replacing the homepage, its example routes, and the metadata in `layout.tsx`; replace `src/app/icon.svg` with your icon.

## Add UI components

The template is already configured for shadcn/ui's **Base UI / Nova** style. Its components are local source you can edit. Add more from the repository root:

```bash
bunx --bun shadcn@latest add dialog input
```

Use Tailwind classes for layout and `src/app/globals.css` for theme colours. This starter uses system fonts and a local SVG icon, so builds don't need to download fonts or images.

## How Bun and Next.js fit

Bun installs packages, runs scripts, and executes the Next.js CLI. Next.js owns routing, server rendering, the development server, and the production build through Turbopack. The scripts explicitly use `bun --bun next …`, so running `bun run dev` uses Bun's runtime. This is not a Bun frontend bundler or Vite project.

Keep `bun.lock` committed. Use `bun add <package>` to add dependencies. When upgrading Bun, update `.bun-version` and the `packageManager` and `engines` fields in `package.json` together, then run the checks and production smoke test again.

As of 10 October 2026, `bun audit` reports an unpatched [nested-pattern denial-of-service issue in `braces`](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), reached only through the ESLint and shadcn development tooling in this template. It is not in the production dependency graph. Recheck the advisory when updating dependencies; `bun audit fix` currently has no published fix.

## Environment and deployment

Put local variables in `.env.local` (ignored by Git). Only variables deliberately prefixed with `NEXT_PUBLIC_` should be exposed to the browser; keep credentials in server code. No `.env.local` file is needed for the example app.

For a host that runs Bun processes, install Bun and run:

```bash
bun run setup
bun run build
bun run start
```

Set `PORT` through your host, or pass `--port` to `bun run start`. The host must keep the Next.js server running; serving only the `public/` directory will not run API routes. HTTPS, environment variables, and the application's domain are configured at the host. Managed Next.js platforms may use their own runtime and build integration; follow their deployment settings rather than assuming the local Bun runtime transfers automatically.

See [Next.js deployment](https://nextjs.org/docs/app/getting-started/deploying), [Next.js with Bun](https://bun.com/guides/ecosystem/nextjs), and [shadcn/ui for Next.js](https://ui.shadcn.com/docs/installation/next).

## License

MIT. See [LICENSE](LICENSE).
