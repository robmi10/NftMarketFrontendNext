import React from "react";
import NftCard from "../../components/nftCard";

const MyCollection = () => {
  return (
    <div class="flex justify-center">
      <div class="mt-20 flex h-auto w-5/6 flex-row flex-wrap justify-center gap-10 overflow-auto">
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
        <NftCard />
      </div>
    </div>
  );
};

export default MyCollection;
