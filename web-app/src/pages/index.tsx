import CoinCard from "@/components/CoinCard";
import { Input } from "@/components/ui/input";
import { coinIds } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
  const [shownCoins, setShownCoins] = useState(coinIds);

  const filterShownCoins = (value: string) => {
    setShownCoins(
      coinIds.filter((coin) => coin.toLowerCase().includes(value.toLowerCase()))
    );
  };

  return (
    <div className="flex py-16 px-8 flex-col gap-10">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Crypto
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-4">
          Check out the latest crypto prices and market data
        </p>
        <Input
          placeholder="Search"
          onChange={(e) => filterShownCoins(e.target.value)}
          className="mt-4"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {shownCoins.map((placeholder, index) => (
          <CoinCard key={index} ticker={placeholder} />
        ))}
      </div>
    </div>
  );
}
