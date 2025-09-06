import { Wallet } from "@coinbase/onchainkit/wallet";

export default function Home() {
  return (
    <div >
      <main>
        <div className="justify-items-right">
          <Wallet />
        </div>
      </main>
    </div>
  );
}