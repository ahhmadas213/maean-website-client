"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "div",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(210, 100%, 50%) 0%, rgba(0, 0, 0, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(210, 100%, 50%) 0%, rgba(0, 0, 0, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(210, 100%, 50%) 0%, rgba(0, 0, 0, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(210, 100%, 50%) 0%, rgba(0, 0, 0, 0) 100%)",
  };

  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(0, 0, 0, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-lg border content-center bg-white transition duration-500 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-hidden p-px decoration-clone w-full",
        containerClassName
      )}
      {...props}
    >
      <div className={cn("w-full z-10 rounded-[inherit]", className)}>
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit]"
        style={{
          filter: "blur(8px)",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration }}
      />
      <div className="bg-white absolute z-1 inset-[1px] rounded-[inherit]" />
    </Tag>
  );
}

