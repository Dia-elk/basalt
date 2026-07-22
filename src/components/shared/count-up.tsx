"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.4,
  delay = 0,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}) {
  const motionValue = useMotionValue(0);
  const display = useTransform(motionValue, (v) =>
    `${prefix}${v.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  );

  useEffect(() => {
    const controls = animate(motionValue, value, { duration, delay, ease: "easeOut" });
    return () => controls.stop();
  }, [value, duration, delay, motionValue]);

  return <motion.span className={className}>{display}</motion.span>;
}
