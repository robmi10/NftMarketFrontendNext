import React, { useContext, useEffect } from "react";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useEnd from "../moralis/useEndNft";
import Timer from "../time/timer";
import { formatEther, parseUnits } from "ethers/lib/utils";
const NftCardAuction = ({ option, handleOpenSellModal }) => {
  const {
    setBidType,
    transactionStatus,
    setOpenModal,
    themeColor,
    setThemeColor,
  } = useContext(NftContext);
  const isTimeOver = new Date().getTime() - option.option.Duration;
  const { endNFT } = useEnd();
  console.log({ isTimeOver });
  const NftCardData = { option, ipfsInfo: option?.option.ipfsInfo };
  const currentPrice = option?.option?.Price
    ? formatEther(option?.option?.Price.toString())
    : 0;

  console.log({ optionAuction: option });

  useEffect(() => {
    console.log("transactionStatus check option in Auction", transactionStatus);
    console.log({ optionID: option?.option?.TokenId });
    console.log({ transactionStatusInCardAcution: transactionStatus });
  }, [transactionStatus]);

  return (
    <div class=" border-1 h-5/8 flex w-3/4 animate-fade flex-col items-center gap-2 rounded-md border-black shadow-lg shadow-[#185ee041] hover:shadow-2xl hover:shadow-[#185ee041]  lg:w-1/4">
      <div class="h-62 w-full">
        <img
          class="h-64 w-full justify-center object-cover"
          src={option?.option.ipfsInfo?.image}
        />
      </div>
      <div class=" mt-5 flex w-3/6 justify-center  shadow-lg shadow-[#185ee041]">
        <h1>{option?.option.Seller?.toString()?.substr(0, 10)}</h1>
      </div>

      <div class="flex w-full flex-col gap-5 pl-5">
        <h1>{option?.option.ipfsInfo?.title}</h1>

        <h1>{option?.option.ipfsInfo?.description}</h1>
        <div class=" flex w-3/6 justify-center shadow-lg shadow-[#185ee041]">
          <h1 style={{ fontWeight: "light" }}>CURRENT BID</h1>
        </div>
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

          <button
            class=" mb-5 flex h-14 w-3/6 flex-row items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041]"
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
        </>
      )}
      {isTimeOver > 0 && (
        <div class="flex h-2/4 w-full flex-row items-end justify-center space-x-10">
          <button
            class="mb-5 flex h-14 w-3/6 flex-row items-center justify-center rounded-md shadow-lg shadow-[#185ee041] hover:shadow-xl hover:shadow-[#185ee041]"
            onClick={() => {
              endNFT(option);
            }}
          >
            {transactionStatus.loading === "loading" &&
            transactionStatus.id === option?.option?.AuctionID ? (
              <BouncerLoader />
            ) : (
              <p>END AUCTION</p>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default NftCardAuction;
