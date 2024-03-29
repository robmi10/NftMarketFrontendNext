import React, { useContext, useEffect, useState } from "react";
import useWithdraw from "../components/moralis/useWithdraw";
import { NftContext } from "../nftContext/context";
import { useToast } from "@chakra-ui/react";
import BouncerLoader from "../components/animation/loader/bouncerLoader";
import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";

const MyBids = () => {
  const { account } = useEthers();
  const { withdrawNFT } = useWithdraw();
  const toast = useToast();
  const { myBids, transactionStatus, toastNotifcation, setToastNotifcation } =
    useContext(NftContext);

  useEffect(() => {
    if (toastNotifcation) {
      toast({
        title: "NFT widthdraw.",
        description: `Your'e NFT widthdraw of ${toastNotifcation.auctionID} is succeded.`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
    setToastNotifcation(false);
  }, [myBids, transactionStatus, toastNotifcation]);

  if (!myBids)
    return (
      <div className="flex h-screen w-screen items-center justify-center ">
        {" "}
        <BouncerLoader />
      </div>
    );
  const myBidsNfts = myBids?.filter((Nft) => Nft?.Bidder === account);

  return (
    <>
      <div className="mt-10  flex  flex-col items-center justify-center gap-4 ">
        <div className=" flex h-12 w-2/6 items-center justify-center rounded-xl shadow-lg shadow-[#185ee041]">
          MY BIDS
        </div>

        <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 ">
          {myBidsNfts.length <= 0 && (
            <h1 className=" text-4xl font-extrabold">No Bids</h1>
          )}

          {myBidsNfts?.map((Nft, i) => {
            return (
              <div key={i} className="flex h-auto w-2/6 flex-col gap-5 ">
                <div className="flex w-full items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-2xl hover:shadow-[#185ee041]">
                  <div className="flex flex-col gap-10 p-4">
                    <div className="h-full w-full  bg-red-500">
                      <img
                        className="rounded-sm"
                        src="https://sm.ign.com/t/ign_ap/screenshot/default/cropped-155786657620190514n-dragon-ball-broly-data_xjzd.h960.jpg"
                      />
                    </div>
                    <div>
                      <h1>AuctionID </h1>
                      <div>{Nft.AuctionID}</div>
                    </div>
                    <div>
                      <h1>Amount </h1>
                      <div>{formatEther(Nft.Amount.toString())} MATIC</div>
                    </div>
                    <div className="flex w-full justify-center">
                      <button
                        className="flex w-2/4 items-center justify-center rounded-lg shadow-lg shadow-[#185ee041]"
                        onClick={() => {
                          withdrawNFT(Nft);
                        }}
                      >
                        {transactionStatus.loading === "loading" &&
                        transactionStatus.id === Nft?.TokenId ? (
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
    </>
  );
};

export default MyBids;
