import React from "react";
import CountDownTimer from "./time/countdownTimer";

const NftCardAuction = () => {
  return (
    <div class="border-1 flex h-3/5 w-2/6 flex-col items-center justify-center rounded-md border-black bg-slate-100 drop-shadow-xl">
      <div class="border-1 mt-10 h-3/4 w-3/4 rounded-md border-black bg-slate-400">
        hejhejhejhejhejhejhej hejhejhejhejhejhejhej
      </div>

      <div class="mt-5 h-4/6 w-4/6 rounded-sm bg-purple-300">Description</div>

      <div class="mt-5 flex h-2/4 w-auto items-center justify-center rounded-sm bg-violet-400">
        <CountDownTimer />
      </div>

      <div class="m-50 mt-20 flex h-2/4 w-full flex-row justify-center space-x-10 ">
        <h1>AUCTION</h1>
        <h1>PRICE</h1>
      </div>
    </div>
  );
};

export default NftCardAuction;
