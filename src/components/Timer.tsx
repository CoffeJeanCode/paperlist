import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [mode, setMode] = useState("work");
  const [play, setPlay] = useState(false);
  const [{ seconds, minutes }, setTime] = useState({ minutes: 25, seconds: 0 });

  useEffect(() => {
    if (mode === "work") setTime({ minutes: 25, seconds: 0 });
    if (mode === "short") setTime({ minutes: 5, seconds: 0 });
    if (mode === "long") setTime({ minutes: 10, seconds: 0 });
    setPlay(true);
  }, [mode]);

  useEffect(() => {
    let interval: number;
    if (play) {
      interval = setInterval(() => {
        clearInterval(interval);
        if (seconds === 0 && minutes !== 0) {
          if (minutes !== 0) {
            setTime((timer) => ({ ...timer, seconds: 59 }));
            setTime((timer) => ({ ...timer, minutes: timer.minutes - 1 }));
          } else {
            setTime((timer) => ({
              ...timer,
              seconds: timer.minutes,
              minutes: timer.minutes,
            }));
            return;
          }
        } else {
          setTime((timer) => ({ ...timer, seconds: timer.seconds - 1 }));
        }
      }, 1000);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [seconds]);

  const arrageTime = () => {
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${displayMinutes}:${displaySeconds}`;
  };
  return (
    <div className="timer__container">
      <h3>{arrageTime()}</h3>
      <button onClick={() => setMode("work")}>Work</button>
      <button onClick={() => setMode("short")}>Short Break</button>
      <button onClick={() => setMode("long")}>Long Breack</button>
    </div>
  );
};
