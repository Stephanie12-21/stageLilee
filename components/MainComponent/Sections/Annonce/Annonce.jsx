"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { CardAnnonce } from "./CardAnnonce";

const Annonce = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
    hidden: (i) => ({
      opacity: 0,
      y: 50,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  };

  const textVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.5,
      },
    },
  };

  const buttonVariants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
      x: 50,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto py-10 h-[680px]">
      <div className="flex justify-between">
        <motion.h1
          className="text-[30px]"
          initial="hidden"
          animate={controls}
          variants={textVariants}
        >
          Trouvez des locations adaptées à vos besoins.
        </motion.h1>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={buttonVariants}
        >
          <Link href="/Annonces">
            <Button className="h-[45px] w-[137px] text-[18px] rounded-[10px]">
              Voir plus
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        ref={ref}
        className="mt-8 flex justify-between items-center"
        initial="hidden"
        animate={controls}
      >
        {[0, 1, 2].map((i) => (
          <motion.div key={i} custom={i} variants={cardVariants}>
            <CardAnnonce />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Annonce;
