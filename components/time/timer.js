import { useState, useEffect, useContext } from "react";
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
  }, [countDownTimeMs, themeColor]);

  const updateTimeRemaining = (countdown) => {
    setRemainingTime(GetRemainingTimeUnitMsTimeStamp(countdown));
  };

  const color = themeColor === "light" ? "black" : "white";

  return (
    <div className=" flex h-40 items-center gap-5 lg:gap-10 ">
      <div className="flex flex-col gap-5">
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
      <div className="flex flex-col gap-5">
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
      <div className="flex flex-col gap-5">
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
      <div className="flex flex-col gap-5">
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
