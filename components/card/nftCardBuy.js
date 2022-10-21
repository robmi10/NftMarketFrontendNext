import React, { useContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { NftContext } from "../../nftContext/context";
import BouncerLoader from "../animation/loader/bouncerLoader";
import useBuyNft from "../moralis/useBuyNft";
import { FiShoppingCart } from "react-icons/fi";

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
    <div class="border-1 flex h-4/6 w-1/4 flex-col items-center gap-5 rounded-md border-black bg-white bg-opacity-60 drop-shadow-xl backdrop-blur-lg backdrop-filter hover:drop-shadow-2xl">
      <div class="h-96 w-full">
        <img
          class="h-64 w-full justify-center object-cover"
          src={option.option?.ipfsInfo?.image}
        />
      </div>

      <h1>{option.option?.Seller?.toString()?.substr(0, 10)}</h1>
      <div class="flex w-full flex-col gap-5 pl-5">
        <h1>{option.option?.ipfsInfo?.title}</h1>

        <h1>{option?.option?.ipfsInfo?.description}</h1>
        <h1>{currentPrice} MATIC</h1>
      </div>

      <div class="w-6/6 flex h-1/6 items-center justify-center rounded-sm bg-purple-300"></div>

      <div class="flex h-1/5 w-full flex-row justify-center">
        <button
          onClick={() => {
            buyNft(option?.option);
          }}
        >
          {transactionStatus.loading === "loading" &&
          transactionStatus.id === option?.option?.TokenId ? (
            <BouncerLoader />
          ) : (
            <FiShoppingCart />
          )}
        </button>
      </div>
    </div>
  );
};

export default NftCardBuy;
