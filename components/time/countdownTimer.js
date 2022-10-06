import React, { useContext, useEffect, useState } from "react";
import { NftContext } from "../../nftContext/context";
import useEnd from "../moralis/useEndNft";
import { GetRemainingTimeUnitMsTimeStamp } from "./getRemainingTimeUnitMsTimeStamp";

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const CountDownTimer = ({ countDownTimeMs, AuctionInfo }) => {
  const { setAuctionStatus } = useContext(NftContext);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimeRemaining(countDownTimeMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDownTimeMs]);

  const updateTimeRemaining = (countdown) => {
    setRemainingTime(GetRemainingTimeUnitMsTimeStamp(countdown));
  };

  return (
    <div class="gap flex flex-row gap-5">
      <div class="border-1 flex h-full w-auto flex-col items-center rounded-md bg-orange-300">
        <span>{remainingTime.days}</span>
        <span>days</span>
      </div>
      <div class="border-1 flex h-full w-auto flex-col items-center rounded-md bg-orange-300">
        <span>{remainingTime.hours}</span>
        <span>hours</span>
      </div>
      <div class="border-1 flex h-full w-auto flex-col items-center rounded-md bg-orange-300">
        <span>{remainingTime.minutes}</span>
        <span>minutes</span>
      </div>
      <div class="border-1 flex h-full w-auto flex-col items-center rounded-md bg-orange-300">
        <span>{remainingTime.seconds}</span>
        <span>seconds</span>
      </div>
    </div>
  );
};

export default CountDownTimer;
