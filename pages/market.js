import React, { useContext } from "react";
import NftCardAuction from "../components/nftCardAuction";
import NftCardBuy from "../components/nftCardBuy";
import { NftContext } from "../nftContext/context";

const Market = () => {
  const { marketAuction, setMarketAuction } = useContext(NftContext);
  return (
    <div>
      <div class="flex justify-center">
        <div class="mt-10 flex w-4/6 flex-row justify-center space-x-10">
          <div
            class="cursor-pointer underline"
            onClick={() => {
              setMarketAuction(false);
            }}
          >
            SALE
          </div>
          <div
            class="cursor-pointer underline"
            onClick={() => {
              setMarketAuction(true);
            }}
          >
            AUCTION
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="mt-10 flex h-screen w-screen flex-wrap justify-center gap-5 overflow-auto rounded-sm">
          {!marketAuction ? (
            <>
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
              <NftCardBuy />
            </>
          ) : (
            <>
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
              <NftCardAuction />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Market;
