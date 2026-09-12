import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-32 text-center">
      <p className="font-mono text-signal">404</p>
      <h1 className="text-2xl font-medium text-ink">This page doesn't exist in this reality.</h1>
      <p className="text-ink-muted">The code you followed didn't lead anywhere.</p>
      <Link href="/" className="text-sm text-signal hover:underline">
        Back to the entrance
      </Link>
    </div>
  );
}
