"use client";
import Card from "@/components/Cards";

const genTokens = (start: number) =>
  Array.from({ length: 3 }, (_, i) => ({ name: `Token ${start + i}` }));

export default function Page2() {
  return (
    // üst 24px, alt 36px (alttaki boşluk biraz daha artırıldı)
    <section className="pt-[24px] pb-[36px]">
      {/* 4x2 grid, aralarda 15px
          100vh - header(56) - padding(24+36=60) */}
      <div className="grid grid-cols-4 grid-rows-2 gap-[15px] min-h-[calc(100vh-56px-60px)]">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            // imageSrc="/placeholders/vault.jpg" // istersen ekle
            riskRev={5 + i}
            stableRev={2 + (i % 3)}
            tokens={genTokens(i * 3 + 1)} // 1-3, 4-6, 7-9...
            onInvest={(amt, cur) => console.log(`Card ${i + 1}`, amt, cur)}
          />
        ))}
      </div>
    </section>
  );
}
