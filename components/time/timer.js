import classes from "./Timer.module.scss";
import { useState, useEffect } from "react";
// const PLANNED_DATE = new Date("2022-05-30").getTime();

import FlipNumbers from "react-flip-numbers";
import { GetRemainingTimeUnitMsTimeStamp } from "./getRemainingTimeUnitMsTimeStamp";
const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const Timer = ({ countDownTimeMs, AuctionInfo }) => {
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

  return (
    <div class=" flex h-40 items-center gap-12 ">
      <div>
        <span>Days</span>
        <FlipNumbers
          height={27}
          width={27}
          color="black"
          background="transparent"
          play
          perspective={500}
          numbers={String(remainingTime.days)}
          numberStyle={{ fontWeight: "normal" }}
        />
      </div>
      <div>
        <span>Hours</span>
        <FlipNumbers
          height={27}
          width={27}
          color="black"
          background="transparent"
          play
          perspective={500}
          numbers={String(remainingTime.hours)}
        />
      </div>
      <div>
        <span>Minutes</span>
        <FlipNumbers
          height={27}
          width={27}
          color="black"
          background="transparent"
          play
          perspective={300}
          numbers={String(remainingTime.minutes)}
        />
      </div>
      <div>
        <span>Seconds</span>
        <FlipNumbers
          height={27}
          width={27}
          color="black"
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
