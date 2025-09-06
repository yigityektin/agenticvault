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
    <header className="sticky top-[15px] z-50 border-b bg-background/70 backdrop-blur">
      <div className="flex h-14 w-full items-center justify-between px-[25px]">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight font-verdana"
          >
            FinMate
          </Link>
          <Link
            href="/page2"
            className="text-2xl font-semibold hover:opacity-80 font-verdana"
          >
            Vaults
          </Link>
        </div>

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
    </header>
  );
}
