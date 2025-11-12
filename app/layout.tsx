import type { Metadata } from "next";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";

import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { Provider } from "jotai";

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
    <html
      lang="en"
      className={`${inter.variable} ${serif.variable} ${mono.variable} antialiased`}
    >
      <body>
        <TRPCReactProvider>
          <NuqsAdapter>
            <Provider>{children}</Provider>
            <Toaster />
          </NuqsAdapter>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
