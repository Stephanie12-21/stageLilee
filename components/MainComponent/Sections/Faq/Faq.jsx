"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import Description from "./Description";
import { QuestionList } from "./QuestionList";

const Faq = () => {
  return (
    <div className="container mx-auto flex justify-between items-center gap-x-10 h-[600px]">
      <AnimatePresence>
        <Description />
        <QuestionList />
      </AnimatePresence>
    </div>
  );
};

export default Faq;
