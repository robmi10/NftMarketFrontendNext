import React, { useContext, useEffect, useState } from "react";
import styles from "../components/animation/TabSlide/tabslide.module.scss";
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
        <div class=" mt-10 flex h-12 w-2/6 items-center justify-center rounded-xl shadow-lg shadow-[#185ee041]">
          MY BIDS
        </div>

        <div class="mt-10 flex h-full w-screen flex-col items-center justify-center gap-4 ">
          {myBidsNfts?.map((option, i) => {
            return (
              <div class="flex  w-2/5 flex-col gap-5">
                <div class="flex w-full items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-2xl hover:shadow-[#185ee041]">
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
                    <div class="flex w-full justify-center">
                      <button
                        class="flex w-2/4 items-center justify-center rounded-lg shadow-lg shadow-[#185ee041]"
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
