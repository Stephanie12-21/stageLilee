"use client";

import { motion } from "framer-motion";

export default function AnimatedSymbol() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: "easeInOut" },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-inherit">
      <div className="transform rotate-180">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="400"
          height="200"
          viewBox="40 40 150 180"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M76.1 170.1c16.2-5.1 28.6-18.8 35.1-38.7 2-5.9 2.3-9.1 2.3-21.9 0-13.8-0.2-15.3-2.3-19.4-3.3-6.1-10.3-13.3-16-16.4-10.3-5.6-25.4-7.5-29.2-3.7-2.4 2.4-2.5 3.8-0.5 6.7 1.2 1.7 2.9 2.2 9.2 2.8 12.6 1.1 20.9 6 25.5 14.8 3 5.9 2.2 6.5-7 5.9-11.1-0.6-22.5 1.3-35.4 5.8-18.1 6.4-30.4 15.3-35.4 25.8-3.7 7.6-4 18.6-0.7 24.7 4 7.5 11.1 12.3 21.3 14.4 3 0.6 6.4 1.3 7.5 1.5 4.4 1 19.3-0.3 25.6-2.3zm109.2 1.5c16.7-3.2 24.4-9.6 26.8-22.1 0.8-4.6-0.6-13.6-2.8-18-4.6-8.8-14.7-16.8-29-23-13.5-5.8-22.1-7.7-36.8-8.1l-13-0.3 0.2-3.1c0.1-4.1 4-9 10.2-13 4.2-2.6 6.8-3.4 14.4-4.4 5-0.6 9.8-1.5 10.5-1.9 1.4-0.9 1.6-5.5 0.3-7.6-2.2-3.5-17.9-2.2-27.5 2.4-17 8.1-23.8 23.3-20.7 46.6 2.3 17.1 7.5 28.3 18.1 39 12.7 12.7 29.4 17.3 49.3 13.5z"
            fill="none"
            stroke="#FFA500"
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
          />
          <motion.path
            d="M49.5 160.9c-7.5-1.2-13.2-3.7-16-7-3.2-3.9-3.5-12.1-0.6-17.7 5.3-10.2 22.2-19.5 43-23.7 9.4-1.9 23-1.7 25.5 0.4 2 1.7 1.4 6.6-2 17.2-7.5 23.3-26.1 34.8-49.9 30.8z"
            fill="none"
            stroke="#FFA500"
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
          />
          <motion.path
            d="M166 161.4c-5.1-1-12.6-3.8-16-5.9-10.6-6.6-19.8-23.6-20.3-37.1-0.2-5.4 0-5.8 2.3-6.5 4.3-1.2 16.6-1 23.7 0.5 15 3.2 33.7 11.8 38.8 17.8 8.2 9.8 8.6 20.9 0.9 26.2-5 3.5-22.1 6.4-29.4 5z"
            fill="none"
            stroke="#FFA500"
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
          />
        </motion.svg>
      </div>
    </div>
  );
}
