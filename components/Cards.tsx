"use client";

import { useState } from "react";
import Image from "next/image";

type Currency = "USDT" | "USDC";
type Token = { name: string; iconSrc?: string };

export type CardProps = {
  imageSrc?: string;
  riskRev?: number;
  stableRev?: number;
  tokens: Token[];
  onInvest?: (amount: number, currency: Currency) => void;
};

function CurrencySelect({
  value,
  onChange,
}: {
  value: Currency;
  onChange: (c: Currency) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 px-3 py-2 text-sm text-white focus:outline-none"
      >
        {value}
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`h-4 w-4 text-white/80 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 0 1 1.08 1.04l-4.25 4.25a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-20 mt-1 w-28 rounded-[8px] bg-[#1b1f27] text-sm text-white shadow-lg ring-1 ring-white/10"
          role="listbox"
        >
          {(["USDT", "USDC"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={value === opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left hover:bg-white/10 ${
                value === opt ? "font-semibold" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Card({
  imageSrc,
  riskRev,
  stableRev,
  tokens,
  onInvest,
}: CardProps) {
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>("USDT");

  return (
    <div className="flex h-full w-full flex-col rounded-[5px] bg-[#333754] p-4 text-white">
      {/* Image */}
      {imageSrc && (
        <div className="mb-3 overflow-hidden rounded-[5px]">
          <Image
            src={imageSrc}
            alt=""
            width={800}
            height={450}
            className="h-36 w-full object-cover"
            priority={false}
          />
        </div>
      )}

      {/* Revenues */}
      <div className="space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <span>Risk Rev.</span>
          <span className="font-semibold">{riskRev ?? "--"}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Stable Rev.</span>
          <span className="font-semibold">{stableRev ?? "--"}%</span>
        </div>
      </div>

      {/* Tokens */}
      <ul className="mt-3 space-y-2">
        {tokens.slice(0, 3).map((t, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            {t.iconSrc ? (
              <Image
                src={t.iconSrc}
                alt={t.name}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <span className="inline-block h-2 w-2 rounded-full bg-white/70" />
            )}
            <span>{t.name}</span>
          </li>
        ))}
      </ul>

      {/* Amount + Currency  */}
      <div className="mt-4 mx-auto w-[90%]">
        <div className="flex items-stretch rounded-[8px] bg-[#232A34] focus-within:ring-2 focus-within:ring-[#272EF5]/40">
          <input
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-white/60 outline-none"
          />
          <div className="border-l border-white/10">
            <CurrencySelect value={currency} onChange={setCurrency} />
          </div>
        </div>
      </div>

      {/* Invest */}
      <button
        type="button"
        onClick={() => onInvest?.(Number(amount), currency)}
        className="invest-btn mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40"
      >
        Invest
      </button>
    </div>
  );
}
