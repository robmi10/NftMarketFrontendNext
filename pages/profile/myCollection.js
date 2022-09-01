import React from "react";
import NftCard from "../../components/nftCard";

const MyCollection = () => {
  return (
    <>
      <div class="flex justify-center">
        <div class="mt-10 flex w-4/6 flex-row justify-center space-x-10 rounded-sm">
          <div class="underline">COLLECTION</div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="mt-10 flex h-auto w-5/6 flex-row flex-wrap justify-center gap-10 overflow-auto">
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
          <NftCard />
        </div>
      </div>
    </>
  );
};

export default MyCollection;
