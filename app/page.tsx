import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { studios } from "@/lib/studios";
import { StudioCard } from "@/components/studio/studio-card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const featured = studios.slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24">
      <section className="flex min-h-[70vh] flex-col items-start justify-center py-20">
        <p className="font-mono text-sm text-signal">cypher_</p>
        <h1 className="mt-4 max-w-2xl text-5xl font-medium leading-[1.1] tracking-tight text-ink md:text-6xl">
          Enter the code.
          <br />
          <span className="text-ink-muted">Create reality.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-muted">
          Structured AI workflows that turn one idea into a complete script, shot list, and
          caption — ready to shoot, post, or sell.
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild size="lg">
            <Link href="/studio">
              Open the Studios <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/skills">Browse Skills</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-surface-border py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-xl font-medium text-ink">Featured Studios</h2>
          <Link href="/studio" className="text-sm text-ink-muted hover:text-signal">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((studio) => (
            <StudioCard key={studio.id} studio={studio} />
          ))}
        </div>
      </section>
    </div>
  );
}
