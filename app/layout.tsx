import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "Flowbit — Automate Anything Visually",
  description:
    "Flowbit lets you connect APIs and automate tasks through an intuitive, no-code workflow builder. Self-hosted and open source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className}  antialiased`}>
        <TRPCReactProvider>
          <NuqsAdapter>
            {children}
            <Toaster richColors />
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
