import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header";
import { Providers } from "../providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <main className="w-full px-[45px]">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
