"use client";

import React, { useState, useEffect } from "react";

const CountdownTimer = ({ sections }) => {
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(sections[index].time);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [doneSeconds, setDoneSeconds] = useState(0);
  const totalTime = sections.reduce(
    (acc, section) => acc + Number(section.time),
    0
  );

  const [donePercent, setDonePercent] = useState(0);

  const progressBarStyle = {
    width: `${donePercent}%`,
  };

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      // If it is the last section, we will consider the timer finished
      if (!sections[index + 1]) {
        setIsActive(false);
        setIsFinished(true);
      } else {
        setIndex((prevIndex) => prevIndex + 1);
      }
      clearInterval(interval);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    setSeconds(sections[index].time);
  }, [index]);

  useEffect(() => {
    const prevTime = sections
      .slice(0, index)
      .reduce((acc, section) => acc + Number(section.time), 0);

    let cumulativeTime = prevTime + (sections[index].time - seconds);

    setDoneSeconds(cumulativeTime);
    setDonePercent((cumulativeTime / totalTime) * 100);
  }, [seconds, doneSeconds, donePercent, totalTime]);

  const toggle = () => {
    setIsActive(!isActive);
    setIsFinished(false);
  };

  const reset = () => {
    setIndex(0);
    setSeconds(sections[0].time);
    setIsActive(false);
    setIsFinished(false);
  };

  const goPrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsActive(false);
      setIsFinished(false);
    } else {
      reset();
    }
  };

  const goNext = () => {
    if (sections[index + 1]) {
      setIndex(index + 1);
      setIsActive(false);
      setIsFinished(false);
    } else {
      reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-5 w-full max-w-[700px]">
      <div className="text-xl text-gray-600 mb-2 text-center">
        {sections[index].name}
      </div>
      <div className="text-8xl font-bold text-gray-800 mb-5">
        {seconds === -1 ? 0 : seconds}
      </div>

      {/* Start/Pause & Reset */}
      <div className="flex min-w-[200px] space-x-4">
        <button
          onClick={toggle}
          disabled={isFinished}
          className={`px-6 py-2 rounded-lg flex-auto ${
            isFinished
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isFinished ? "Finished" : isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={reset}
          className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex-auto"
        >
          Reset
        </button>
      </div>

      {/* Prev and Next Buttons */}
      <div className="flex min-w-[200px] space-x-4 mt-3">
        <button
          onClick={goPrev}
          className="px-6 py-1 rounded-lg bg-gray-300 hover:bg-gray-400 text-white flex-auto"
        >
          Prev
        </button>

        <button
          onClick={goNext}
          className="px-6 py-1 rounded-lg bg-gray-300 hover:bg-gray-400  text-white flex-auto"
        >
          Next
        </button>
      </div>

      {/* Progress Bar */}
      <div class="w-full mt-4 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          class="bg-green-300 h-2.5 rounded-full"
          style={progressBarStyle}
        ></div>
      </div>
    </div>
  );
};

export default CountdownTimer;
