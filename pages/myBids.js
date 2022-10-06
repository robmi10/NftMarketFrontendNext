import React, { useContext, useState } from "react";
import useWithdraw from "../components/moralis/useWithdraw";
import { NftContext } from "../nftContext/context";

const MyBids = () => {
  const { myBids, userAddress } = useContext(NftContext);
  const myBidsNfts = myBids?.filter(
    (option) => option?.Bidder?.toLowerCase() === userAddress[0]
  );

  const { withdrawNFT } = useWithdraw();
  console.log({ myBids });
  console.log({ myBidsNfts });

  return (
    <>
      <div class="flex flex-col items-center  justify-center">
        <div class="mt-10 flex w-4/6 flex-row justify-center space-x-10 rounded-sm">
          <div class="underline">MY BIDS</div>
        </div>
        <div class="flex h-full w-screen flex-col items-center justify-center gap-4 ">
          {myBidsNfts?.map((option, i) => {
            return (
              <div class="flex flex-col gap-5">
                <div class="mt-10 flex w-full items-center justify-center rounded-md bg-blue-600 text-white">
                  <div class="flex flex-row gap-10 p-10">
                    <h1>Bidder </h1>
                    <div>{option.Bidder}</div>
                    <h1>AuctionID </h1>
                    <div>{option.AuctionID}</div>
                    <h1>Amount </h1>
                    <div>{option.Amount}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    console.log("withdraw money");
                    withdrawNFT(option);
                  }}
                >
                  Withdraw
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div class="flex justify-center"></div>
    </>
  );
};

export default MyBids;
