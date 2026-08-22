"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  className?: string;
  speed?: number;
  pauseTime?: number;
  loop?: boolean;
}

export default function TypewriterText({
  text,
  className = "",
  speed = 40,
  pauseTime = 3200,
  loop = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && index < text.length) {
      // Typing forward
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && index === text.length) {
      // Completed typing, pause before deleting if loop is true
      if (loop) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else if (isDeleting && index > 0) {
      // Deleting / erasing backward
      timer = setTimeout(() => {
        setDisplayText(text.slice(0, index - 1));
        setIndex((prev) => prev - 1);
      }, speed / 1.8);
    } else if (isDeleting && index === 0) {
      // Finished deleting, start typing again
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [index, isDeleting, text, speed, pauseTime, loop]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[3px] h-[0.85em] align-middle bg-cyan-400 animate-pulse ml-1" />
    </span>
  );
}
