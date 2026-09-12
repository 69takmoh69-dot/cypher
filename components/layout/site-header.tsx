import Link from "next/link";
import { UnlockButton } from "@/components/studio/unlock-modal";

const NAV = [
  { href: "/studio", label: "Studios" },
  { href: "/skills", label: "Skills" },
  { href: "/missions", label: "Missions" },
  { href: "/projects", label: "Projects" },
  { href: "/tools/flow", label: "Tools" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-void/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-mono text-lg tracking-tight text-ink">
          cypher<span className="text-signal">_</span>
        </Link>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <UnlockButton />
      </div>
    </header>
  );
}
