"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Informations = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 1,
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

  const cards = [
    {
      src: "/informations/Figure.svg",
      title1: "Services très",
      title2: "rapides",
    },
    {
      src: "/informations/Figure(3).svg",
      title1: "Payement en ligne",
      title2: "sécurisé",
    },
    {
      src: "/informations/Figure(1).svg",
      title1: "Devenir membre",
      title2: "facilement",
    },
    {
      src: "/informations/Figure(2).svg",
      title1: "Services clients",
      title2: "24/7",
    },
  ];

  return (
    <div className="container flex items-center justify-between">
      <motion.div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center justify-between w-full"
        initial="hidden"
        animate={controls}
      >
        {cards.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            // className="w-full max-w-xs flex justify-between items-center flex-col h-[250px]  rounded-[36px]"
          >
            <Card className="bg-[#fccd83] hover:bg-[#FCA311]">
              <CardHeader>
                <Image
                  src={card.src}
                  alt="Description de l'image"
                  width={72}
                  height={60}
                  className="mt-8 mx-auto"
                />
              </CardHeader>
              <CardContent className="flex justify-between items-center flex-col mb-5">
                <h4 className="text-lg font-semibold">{card.title1}</h4>
                <p className="text-lg font-semibold">{card.title2}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Informations;
