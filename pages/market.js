import React from "react";
import NftCard from "../components/nftCard";

const Market = () => {
  return (
    <div>
      <div class="flex justify-center">
        <div class="mt-10 flex w-4/6 flex-row justify-center space-x-10">
          <div class="cursor-pointer underline">SALE</div>
          <div class="cursor-pointer underline">AUCTION</div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="mt-10 flex h-screen w-screen flex-wrap justify-center gap-5 overflow-auto rounded-sm">
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
        </div>
      </div>
    </div>
  );
};

export default Market;
