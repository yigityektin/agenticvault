"use client";
import Card from "@/components/Cards";

const headers = [
  "RWA",
  "DeFi",
  "Artificial Intelligence",
  "DeSci",
  "Layer-2",
  "Gaming",
  "Zero Knowledge",
  "Others",
];

const genTokens = (start: number) =>
  Array.from({ length: 3 }, (_, i) => ({ name: `Token ${start + i}` }));

export default function Page2() {
  return (
    <section className="pt-[10px] pb-0 overflow-hidden">
      <div className="px-[40px] md:px-[56px]">
        <div
          className="grid h-[calc(100vh-56px-15px-10px)] items-start
                        grid-cols-4 gap-x-[24px] gap-y-[22px]"
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const start = i * 3 + 1;
            return (
              <Card
                key={i}
                header={headers[i]}
                riskRev={5 + i}
                stableRev={2 + (i % 3)}
                tokens={genTokens(start)}
                onInvest={(amt, cur) => console.log(`Card ${i + 1}`, amt, cur)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
