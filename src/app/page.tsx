import { ArrowUpRight, Braces, Terminal } from "lucide-react";

import { ApiExample } from "@/components/api-example";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const resources = [
  { name: "Next.js", href: "https://nextjs.org/docs", detail: "Pages, routing, and server code" },
  { name: "shadcn/ui", href: "https://ui.shadcn.com/docs", detail: "Components you can make your own" },
  { name: "Tailwind CSS", href: "https://tailwindcss.com/docs", detail: "Style directly in your markup" },
  { name: "Bun", href: "https://bun.com/docs", detail: "Packages, scripts, and runtime" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-10">
      <header className="flex items-center justify-between border-b py-6">
        <span className="flex items-center gap-2.5 text-sm font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Braces className="size-4" aria-hidden="true" />
          </span>
          webdev template
        </span>
        <span className="hidden text-xs text-muted-foreground sm:inline">Your next starting point</span>
      </header>

      <main className="space-y-12 py-14 sm:py-20">
        <section className="max-w-2xl space-y-6" aria-labelledby="welcome">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Ready when you are</p>
          <h1 id="welcome" className="text-4xl leading-[1.1] font-semibold tracking-tight sm:text-6xl">
            Build your next idea.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            The essentials are connected. A place to build your interface,
            write server code, and turn a first experiment into something useful.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Included technologies">
            {["Bun", "Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"].map((name) => (
              <li key={name} className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                {name}
              </li>
            ))}
          </ul>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <Card className="gap-6 p-2">
            <CardHeader className="pt-4">
              <Terminal className="mb-3 size-5 text-primary" aria-hidden="true" />
              <CardTitle><h2>Make the first change</h2></CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 pb-4 text-muted-foreground">
              <p className="leading-6">
                Edit the homepage and save. Your development server updates the
                browser as you work.
              </p>
              <code className="block overflow-x-auto rounded-lg border bg-muted/60 p-3 text-xs text-foreground">
                src/app/page.tsx
              </code>
              <p className="text-xs leading-5">
                Start with one small feature. Add components, connect its data,
                then run the checks before you ship.
              </p>
            </CardContent>
          </Card>
          <ApiExample />
        </div>

        <section aria-labelledby="resources">
          <h2 id="resources" className="mb-5 text-sm font-semibold">Keep the docs close</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map(({ name, href, detail }) => (
              <a key={name} href={href} className="group rounded-xl border p-4 transition-colors hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                <span className="flex items-center justify-between text-sm font-medium">
                  {name}<ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{detail}</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-2 border-t py-6 text-xs text-muted-foreground">
        <span>A small foundation. Room to make it yours.</span>
        <span>Setup and commands in README.md</span>
      </footer>
    </div>
  );
}
