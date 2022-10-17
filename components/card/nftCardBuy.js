import React, { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useBuyNft from "../moralis/useBuyNft";

const NftCardBuy = ({ option }) => {
  const { Moralis } = useMoralis();
  const { buyNft } = useBuyNft();
  const { transactionStatus, nftListOnSale, setTransactionStatus } =
    useContext(NftContext);

  useEffect(() => {}, [nftListOnSale]);

  console.log({ optionInNftCardBuy: option });

  console.log({
    option: option,
    optionIpfs: option?.ipfsInfo,
    optionId: option.TokenId,
    optionOwner: option.Owner,
  });

  const currentPrice = option?.option?.Price
    ? Moralis.Units.FromWei(option?.option?.Price.toString())
    : 0;

  return (
    <div class="border-1 flex h-3/5 w-2/6 flex-col items-center justify-center rounded-md border-black bg-slate-100 drop-shadow-xl">
      <div class="border-1 mt-10 flex h-2/4 w-2/6 items-center justify-center rounded-md border-black bg-slate-400">
        <img src={option.option?.ipfsInfo?.image} />
      </div>

      <h1 class="mt-5">{option.option?.ipfsInfo?.title}</h1>

      <h1 class="mt-5">{option.option?.TokenId}</h1>

      <h1 class="mt-5">{option.option?.Seller?.toString()?.substr(0, 10)}</h1>

      <h1 class="mt-5">{currentPrice} ETH</h1>

      <div class="mt-5 flex h-4/6 w-5/6 items-center justify-center rounded-sm bg-purple-300">
        <h1>{option?.option?.ipfsInfo?.description}</h1>
      </div>

      <div class="m-50 mt-20 flex h-2/4 w-full flex-row justify-center space-x-10 ">
        <button
          onClick={() => {
            buyNft(option?.option);
          }}
        >
          {transactionStatus.loading === "loading" &&
          transactionStatus.id === option?.option?.TokenId ? (
            <BouncerLoader />
          ) : (
            <p>BUY</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default NftCardBuy;
