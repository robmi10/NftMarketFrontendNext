import React, { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useEnd from "../moralis/useEndNft";
import Timer from "../time/timer";

const NftCardAuction = ({ option, handleOpenSellModal }) => {
  const { setBidType, transactionStatus, setOpenModal } =
    useContext(NftContext);
  const { Moralis } = useMoralis();
  const isTimeOver = new Date().getTime() - option.option.Duration;
  const { endNFT } = useEnd();
  console.log({ isTimeOver });
  const NftCardData = { option, ipfsInfo: option?.option.ipfsInfo };
  const currentPrice = option?.option.Price
    ? Moralis.Units.FromWei(option?.option.Price?.toString())
    : 0;

  console.log({ optionAuction: option });

  useEffect(() => {
    console.log("transactionStatus check option in Auction", transactionStatus);
    console.log({ optionID: option?.option?.TokenId });
    console.log({ transactionStatusInCardAcution: transactionStatus });
  }, [transactionStatus]);

  return (
    <div class="border-1 flex h-5/6 w-1/4 flex-col items-center gap-2 rounded-md border-black bg-white bg-opacity-60 drop-shadow-xl backdrop-blur-lg backdrop-filter hover:drop-shadow-2xl">
      <div class="h-96 w-full">
        <img
          class="h-64 w-full justify-center object-cover"
          src={option?.option.ipfsInfo?.image}
        />
      </div>
      <h1>{option?.option.Seller?.toString()?.substr(0, 10)}</h1>

      <div class="flex w-full flex-col gap-5 pl-5">
        <h1>{option?.option.ipfsInfo?.title}</h1>

        <h1>{option?.option.ipfsInfo?.description}</h1>
        <h1 style={{ fontWeight: "light" }}>CURRENT BIDDER</h1>
        <h1>{option?.option.Bidder?.toString()?.substr(0, 10)}</h1>

        <h1>{currentPrice} MATIC</h1>
      </div>

      {isTimeOver < 0 && (
        <>
          <div class="flex w-full items-center justify-center ">
            <Timer
              countDownTimeMs={option.option.Duration}
              AuctionInfo={option.option}
            />
          </div>

          <div class="flex h-2/4 w-full flex-row justify-center">
            <button
              onClick={() => {
                setBidType(option);
                handleOpenSellModal({
                  status: true,
                  data: NftCardData,
                  type: "bid",
                });
                setOpenModal(true);
              }}
            >
              <p>PUT BID</p>
            </button>
          </div>
        </>
      )}
      {isTimeOver > 0 && (
        <div class="mt-10 flex h-2/4 w-full flex-row justify-center space-x-10 ">
          <button
            onClick={() => {
              endNFT(option);
            }}
          >
            {transactionStatus.loading === "loading" &&
            transactionStatus.id === option?.option?.AuctionID ? (
              <BouncerLoader />
            ) : (
              <p class="mt-10">END AUCTION</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default NftCardAuction;
