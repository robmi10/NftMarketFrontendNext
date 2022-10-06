import React from "react";
import { useMoralis } from "react-moralis";
import useBuyNft from "../moralis/useBuyNft";

const NftCardBuy = ({ option, ipfsInfo }) => {
  const { Moralis } = useMoralis();
  const { buyNft } = useBuyNft();

  const currentPrice = option?.Price
    ? Moralis.Units.FromWei(option?.Price.toString())
    : 0;

  // console.log({ option });
  // console.log({ ipfsInfo });
  return (
    <div class="border-1 flex h-3/5 w-2/6 flex-col items-center justify-center rounded-md border-black bg-slate-100 drop-shadow-xl">
      <div class="border-1 mt-10 flex h-2/4 w-2/6 items-center justify-center rounded-md border-black bg-slate-400">
        <img src={ipfsInfo?.image} />
      </div>

      <h1 class="mt-5">{ipfsInfo.title}</h1>

      <h1 class="mt-5">{option.TokenId}</h1>

      <h1 class="mt-5">{option.Seller.toString()?.substr(0, 10)}</h1>

      <h1 class="mt-5">{currentPrice} ETH</h1>

      <div class="mt-5 flex h-4/6 w-5/6 items-center justify-center rounded-sm bg-purple-300">
        <h1>{ipfsInfo.description}</h1>
      </div>

      <div class="m-50 mt-20 flex h-2/4 w-full flex-row justify-center space-x-10 ">
        <button
          onClick={() => {
            buyNft(option);
          }}
        >
          BUY
        </button>
      </div>
    </div>
  );
};

export default NftCardBuy;
