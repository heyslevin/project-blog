"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import { LayoutGroup, motion } from "framer-motion";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [activeTimer, setActiveTimer] = React.useState(false);

  function toggleTimer() {
    setActiveTimer((prevState) => !prevState);
  }

  function resetTimer() {
    setActiveTimer(false);
    setTimeElapsed(0);
  }

  // TODO: This value should increase by 1 every second:
  React.useEffect(() => {
    if (!activeTimer) {
      return () => {};
    }
    const intervalTimer = window.setInterval(() => {
      setTimeElapsed((prevState) => prevState + 1);
    }, 1000);
    return () => {
      clearInterval(intervalTimer);
    };
  }, [activeTimer]);

  //TODO clear timer on pause

  // TODO: This value should cycle through the colors in the
  // COLORS array:

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <LayoutGroup>
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId="selectedOutline"
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>

          <div className={styles.actions}>
            <button onClick={toggleTimer}>
              {activeTimer ? <Pause /> : <Play />}
              <VisuallyHidden>Play</VisuallyHidden>
            </button>
            <button onClick={resetTimer}>
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </LayoutGroup>
  );
}

export default CircularColorsDemo;
