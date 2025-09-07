import Link from "next/link";

export default function Home() {
  return (
    // Header h-14 = 56px, Footer h-5 = 20px
    <section className="grid min-h-[calc(100vh-56px-20px)] place-items-center">
      <div className="text-center">
        {/* İstediğin kısa-öz cümleyi buraya koyabilirsin */}
        <p className="mt-12 text-[32px] text-white/80">
          Web3 yatırımlarını tek panelden yönet.
        </p>

        {/* Get Started: Invest ile aynı stil (renk #4F46E5, radius 8px, kalın) */}
        <div className="mt-6">
          <Link
            href="/page2"
            className="inline-flex items-center justify-center rounded-[15px] bg-[#4F46E5]
                       px-6 py-3 text-base font-semibold text-white
                       hover:opacity-90 focus-visible:outline-none
                       focus-visible:ring-2 focus-visible:ring-[#4F46E5]/40"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
