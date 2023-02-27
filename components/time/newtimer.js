import classnamees from "./Timer.module.scss";
import { useState, useEffect } from "react";
import CountDownTimer from "./countdownTimer";

const Timer = (props) => {
  const PLANNED_DATE = props.countDownTimeMs + new Date().getTime();
  const [counter, setCounter] = useState(
    new Date(PLANNED_DATE - new Date().getTime())
  );

  useEffect(() => {
    let timer = setTimeout(() => {
      setCounter(new Date(PLANNED_DATE - new Date().getTime()));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  const seconds = counter.getSeconds();
  const minutes = counter.getMinutes();
  const hours = counter.getHours();
  const days = Math.ceil(
    (counter.getTime() - (hours * 3600 + minutes * 60 + seconds) * 1000) /
      86400000
  );

  return (
    <div classnameName={classnamees.timer}>
      <div classnameName={classnamees.segment}>
        <CountDownTimer countDownTimeMs={days} type="days" />
        <p>Days</p>
      </div>
      <div classnameName={classnamees.segment}>
        <CountDownTimer countDownTimeMs={hours} type="hours" />
        <p>Hours</p>
      </div>
      <div classnameName={classnamees.segment}>
        <CountDownTimer countDownTimeMs={minutes} type="minutes" />
        <p>Minutes</p>
      </div>
      <div classnameName={classnamees.segment}>
        <CountDownTimer countDownTimeMs={seconds} type="seconds" />
        <p>Seconds</p>
      </div>
    </div>
  );
};

export default Timer;
