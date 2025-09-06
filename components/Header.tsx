"use client";

import Link from "next/link";
import {
  Wallet,
  ConnectWallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import { Avatar, Name, Address, Identity } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Proje
          </Link>
          <Link
            href="/page2.tsx"
            className="text-2xl font-semibold hover:opacity-80"
          >
            Page 2
          </Link>
        </div>

        {/* <nav className="hidden items-center gap-6 md:flex">
          <Link href="/sayfa-1" className="text-sm hover:opacity-80">
            Sayfa 1
          </Link>
        </nav> */}

        <div
          className="
            [&>button]:bg-[#272EF5] [&>button]:text-white
            [&>button]:rounded-xl
            [&>button:hover]:opacity-90
            [&>button:focus-visible]:ring-2
            [&>button:focus-visible]:ring-[#272EF5]/40
          "
        >
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address className={color.foregroundMuted} />
              </Identity>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
    </header>
  );
}
