import React, { useContext } from "react";
import { useMoralis } from "react-moralis";
import { NftContext } from "../../nftContext/context";
import Modal from "../modal";
import useBidNft from "../moralis/useBidNft";
import CountDownTimer from "../time/countdownTimer";

const NftCardAuction = ({ option, ipfsInfo, handleOpenSellModal }) => {
  const { setBidType, bidType, openModal, setOpenModal } =
    useContext(NftContext);
  const { Moralis } = useMoralis();
  const { bidNFT } = useBidNft();
  const NftCardData = { option, ipfsInfo };

  const currentPrice = option?.Price
    ? Moralis.Units.FromWei(option?.Price.toString())
    : 0;

  return (
    <div class="border-1 flex h-3/5 w-2/6 flex-col items-center justify-center rounded-md border-black bg-slate-100 drop-shadow-xl">
      <div class="border-1 mt-10 h-2/4 w-2/6 rounded-md border-black bg-slate-400">
        <img src={ipfsInfo?.image} />
      </div>
      <h1 class="mt-5">{ipfsInfo.title}</h1>

      <h1 class="mt-5">{option.Seller.toString()?.substr(0, 10)}</h1>

      <h1 class="mt-5">CURRENT BIDDER</h1>

      <h1 class="mt-5">{option.Bidder.toString()?.substr(0, 10)}</h1>

      <h1 class="mt-5">{currentPrice} ETH</h1>

      <div class="mt-5 flex h-4/6 w-4/6 items-center justify-center rounded-sm bg-purple-300">
        <h1>{ipfsInfo.description}</h1>
      </div>

      <div class="mt-5 flex h-2/4 w-auto items-center justify-center rounded-sm bg-violet-400">
        <CountDownTimer />
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
            console.log("setBidType ->", bidType);
          }}
        >
          PUT BID
        </button>
      </div>
    </div>
  );
};

export default NftCardAuction;
