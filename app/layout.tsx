import type { Metadata } from "next";
import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { getOrCreateSession } from "@/lib/session";
import { SiteHeader } from "@/components/layout/site-header";
import { MatrixRain } from "@/components/layout/matrix-rain";
import { AppProviders } from "@/app/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cypher — Enter the Code. Create Reality.",
  description: "A premium AI Creation Studio for scripts, video prompts, captions, and complete content packages.",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getOrCreateSession();

  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="cypher-grid relative min-h-screen">
        <MatrixRain />
        <div className="relative z-10">
          <AppProviders initialIsMember={session.isMember}>
            <SiteHeader />
            <main>{children}</main>
          </AppProviders>
        </div>
      </body>
    </html>
  );
}
