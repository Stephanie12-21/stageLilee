"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import Description from "./Description";
import QuestionList from "./QuestionList";

const Faq = () => {
  return (
    <div className="container flex flex-col gap-8 p-4 md:px-8 items-start">
      <AnimatePresence>
        <Description />
        <QuestionList />
      </AnimatePresence>
    </div>
  );
};

export default Faq;
