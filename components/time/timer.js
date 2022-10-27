import classes from "./Timer.module.scss";
import { useState, useEffect, useContext } from "react";
// const PLANNED_DATE = new Date("2022-05-30").getTime();

import FlipNumbers from "react-flip-numbers";
import { GetRemainingTimeUnitMsTimeStamp } from "./getRemainingTimeUnitMsTimeStamp";
import { NftContext } from "../../nftContext/context";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Timer = ({ countDownTimeMs, AuctionInfo }) => {
  const { themeColor } = useContext(NftContext);
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  countDownTimeMs, AuctionInfo;
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimeRemaining(countDownTimeMs);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDownTimeMs]);

  const updateTimeRemaining = (countdown) => {
    setRemainingTime(GetRemainingTimeUnitMsTimeStamp(countdown));
  };

  const color = themeColor === "light" ? "black" : "white";

  return (
    <div class=" flex h-40 items-center gap-5 lg:gap-10 ">
      <div class="flex flex-col gap-5">
        <span>Days</span>
        <FlipNumbers
          height={20}
          width={20}
          color={color}
          background="transparent"
          play
          perspective={500}
          numbers={String(remainingTime.days)}
          numberStyle={{ fontWeight: "normal" }}
        />
      </div>
      <div class="flex flex-col gap-5">
        <span>Hours</span>
        <FlipNumbers
          height={20}
          width={20}
          color={color}
          background="transparent"
          play
          perspective={500}
          numbers={String(remainingTime.hours)}
        />
      </div>
      <div class="flex flex-col gap-5">
        <span>Minutes</span>
        <FlipNumbers
          height={20}
          width={20}
          color={color}
          background="transparent"
          play
          perspective={300}
          numbers={String(remainingTime.minutes)}
        />
      </div>
      <div class="flex flex-col gap-5">
        <span>Seconds</span>
        <FlipNumbers
          height={20}
          width={20}
          color={color}
          background="transparent"
          play
          perspective={500}
          numbers={String(remainingTime.seconds)}
        />
      </div>
    </div>
  );
};

export default Timer;
