import "@coinbase/onchainkit/styles.css";
import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Providers } from "../providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <Header />
          <main className="w-full px-[15px]">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
