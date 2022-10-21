import React, { useContext, useEffect, useState } from "react";
import BouncerLoader from "../components/animation/loader/bouncerLoader";
import useWithdraw from "../components/moralis/useWithdraw";
import { NftContext } from "../nftContext/context";

const MyBids = () => {
  const { myBids, userAddress, transactionStatus } = useContext(NftContext);

  useEffect(() => {
    "inside my bids useffect ";
  }, [myBids, transactionStatus]);

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
              <div class="flex  w-2/5 flex-col gap-5">
                <div class="mt-10 flex w-full items-center justify-center rounded-md bg-white bg-opacity-60 drop-shadow-xl backdrop-blur-lg backdrop-filter hover:drop-shadow-2xl">
                  <div class="flex flex-col gap-10 p-10">
                    <div class="h-full w-full  bg-red-500">
                      <img
                        class="rounded-sm"
                        src="https://sm.ign.com/t/ign_ap/screenshot/default/cropped-155786657620190514n-dragon-ball-broly-data_xjzd.h960.jpg"
                      />
                    </div>
                    <div>
                      <h1>AuctionID </h1>
                      <div>{option.AuctionID}</div>
                    </div>
                    <div>
                      <h1>Amount </h1>
                      <div>{option.Amount} MATIC</div>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-center">
                  <button
                    onClick={() => {
                      console.log("withdraw money");
                      withdrawNFT(option);
                    }}
                  >
                    {transactionStatus.loading === "loading" &&
                    transactionStatus.id === option?.TokenId ? (
                      <BouncerLoader />
                    ) : (
                      <p>WITHDRAW</p>
                    )}
                  </button>
                </div>
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
