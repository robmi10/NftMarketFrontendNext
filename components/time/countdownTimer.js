import React, { useEffect, useState } from "react";
import { GetRemainingTimeUnitMsTimeStamp } from "./getRemainingTimeUnitMsTimeStamp";
import styled, { keyframes } from "styled-components";

const flipBottom = keyframes`
 100%{
  transform: rotateX(90deg)
 }
`;

const flipTop = keyframes`
 100%{
  transform: rotateX(0deg)
 }
`;

export const FlipCard = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  box-shadow: 0 2px 3px 0 rgb(0, 0, 0, 0.2);
  border-radius: 0.1em;
  width: 100%;
  &:after {
    background-color: #f7f7f7f7;
    bottom: 0;
    border-top-left-radius: 0.1em;
    border-top-right-radius: 0.1em;
    content: "1";
    position: absolute;
    animation: ${flipBottom} 2000ms ease-in;
    transform-origin: top;
    transform: rotate(0);
  }

  &:before {
    content: "1";
    position: absolute;
    height: 2em;
    line-height: 2;
    padding: 1em;
    border-bottom-left-radius: 0.1em;
    border-bottom-right-radius: 0.1em;
    animation: ${flipTop} 2000ms ease-in;
    transform-origin: bottom;
    background-color: white;
  }
`;

export const TopNumber = styled.div`
  background-color: #f7f7f7f7;
  height: 2em;
  line-height: 2;
  padding: 1em;
  border-top-left-radius: 0.1em;
  border-top-right-radius: 0.1em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const BottomNumber = styled.div`
  background-color: white;
  height: 2em;
  line-height: 2;
  padding: 1em;
  display: flex;
  align-items: flex-end;
  border-bottom-left-radius: 0.1em;
  border-bottom-right-radius: 0.1em;
  overflow: hidden;
`;

const defaultRemainingTime = {
  seconds: "00",
  minutes: "00",
  hours: "00",
  days: "00",
};

const CountDownTimer = ({ countDownTimeMs, AuctionInfo }) => {
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
    <div className="gap flex flex-row gap-5 text-4xl">
      <div className="container-segment">
        <div className="segment">
          <div className="segment-title">Days</div>
          <div className={styles.flipCard} dataCurrent={dataCurrent}>
            <span className={styles.top}>{remainingTime.days}</span>
            <span className={styles.bottom}>{remainingTime.days}</span>
          </div>
        </div>
      </div>

      <div className="container-segment">
        <div className="segment">
          <div className="segment-title">Hours</div>
          <div className={styles.flipCard}>
            <span className={styles.top}>{remainingTime.hours}</span>
            <span className={styles.bottom}>{remainingTime.hours}</span>
          </div>
        </div>
      </div>

      <div className="container-segment">
        <div className="segment">
          <div className="segment-title">Minutes</div>
          <div className={styles.flipCard}>
            <span className={styles.top}>{remainingTime.minutes}</span>
            <span className={styles.bottom}>{remainingTime.minutes}</span>
          </div>
        </div>
      </div>

      <div className="container-segment">
        <div className="segment">
          <div className="segment-title">Minutes</div>
          <div className={styles.flipCard}>
            <span className={styles.top}>{remainingTime.seconds}</span>
            <span className={styles.bottom}>{remainingTime.seconds}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
