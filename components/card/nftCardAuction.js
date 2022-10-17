import React, { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import Modal from "../modal";
import useEnd from "../moralis/useEndNft";
import CountDownTimer from "../time/countdownTimer";

const NftCardAuction = ({ option, handleOpenSellModal }) => {
  const { setBidType, bidType, transactionStatus, setOpenModal } =
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
    <div class="border-1 flex h-3/5 w-2/6 flex-col items-center justify-center rounded-md border-black bg-slate-100 drop-shadow-xl">
      <div class="border-1 mt-10 h-2/4 w-2/6 rounded-md border-black bg-slate-400">
        <img src={option?.option.ipfsInfo?.image} />
      </div>
      <h1 class="mt-5">{option?.option.ipfsInfo?.title}</h1>

      <h1 class="mt-5">{option?.option.Seller?.toString()?.substr(0, 10)}</h1>

      <h1 class="mt-5">CURRENT BIDDER</h1>

      <h1 class="mt-5">{option?.option.Bidder?.toString()?.substr(0, 10)}</h1>

      <h1 class="mt-5">{currentPrice} ETH</h1>

      <div class="mt-5 flex h-4/6 w-4/6 items-center justify-center rounded-sm bg-purple-300">
        <h1>{option?.option.ipfsInfo?.description}</h1>
      </div>

      {isTimeOver < 0 && (
        <>
          <div class="mt-5 flex h-2/4 w-auto items-center justify-center rounded-sm bg-violet-400">
            <CountDownTimer
              countDownTimeMs={option.option.Duration}
              AuctionInfo={option.option}
            />
          </div>

          <div class="m-50 mt-10 flex h-2/4 w-full flex-row justify-center space-x-10 ">
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
        <div class="m-50 mt-10 flex h-2/4 w-full flex-row justify-center space-x-10 ">
          <button
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
