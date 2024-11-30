"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";
import Description from "./Description";
import QuestionList from "./QuestionList";

const Faq = () => {
  return (
    <div className="container mx-auto mt-10 flex flex-col gap-8 p-4 md:px-8 w-full">
      <AnimatePresence>
        <Description />
        <QuestionList />
      </AnimatePresence>
    </div>
  );
};

export default Faq;
