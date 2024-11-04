"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardAnnonce } from "@/components/MainComponent/Sections/Annonce/CardAnnonce";
import { Search } from "./Search";

export function Annonces() {
  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
    hidden: (i) => ({
      opacity: 0,
      y: 50,
      transition: {
        delay: i * 0.01,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="w-full py-9 px-6">
      {/* Champ de recherche */}
      <div className="mb-6 container mx-auto flex justify-between items-center space-x-3">
        <input
          type="text"
          placeholder="Rechercher ici..."
          className="border border-gray-300 p-2 w-full rounded-lg"
        />
        <Search />
        <Button className="flex items-center justify-center p-2 w-12 h-12 text-lg">
          <FaSearch className="text-2xl" />
        </Button>
      </div>

      <Tabs defaultValue="logement" className="container mx-auto">
        <TabsList className="grid w-full grid-cols-8 space-x-10 h-[70px] text-black">
          <TabsTrigger value="logement" className="text-[16px] font-semibold">
            Logement
          </TabsTrigger>
          <TabsTrigger value="emploi" className="text-[16px] font-semibold">
            Emploi
          </TabsTrigger>
          <TabsTrigger value="voiture" className="text-[16px] font-semibold">
            Voiture
          </TabsTrigger>
          <TabsTrigger value="loisir" className="text-[16px] font-semibold">
            Loisir
          </TabsTrigger>
          <TabsTrigger value="materiel" className="text-[16px] font-semibold">
            Matériel
          </TabsTrigger>
          <TabsTrigger value="don" className="text-[16px] font-semibold">
            Donation
          </TabsTrigger>
          <TabsTrigger value="vetement" className="text-[16px] font-semibold">
            Vêtement
          </TabsTrigger>
          <TabsTrigger value="mobilier" className="text-[16px] font-semibold">
            Mobilier
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mobilier" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="logement" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="emploi" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="voiture" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="loisir" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="materiel" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="don" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="vetement" className=" mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => {
              const [ref, inView] = useInView({
                threshold: 0.1,
                triggerOnce: false,
              });
              const controls = useAnimation();

              useEffect(() => {
                if (inView) {
                  controls.start("visible");
                } else {
                  controls.start("hidden");
                }
              }, [controls, inView]);

              return (
                <motion.div
                  key={index}
                  ref={ref}
                  custom={index}
                  initial="hidden"
                  animate={controls}
                  variants={cardVariants}
                >
                  <CardAnnonce />
                </motion.div>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
      <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
        <Link href="/Annonces">
          <Button className="py-4 px-5 text-[17px] rounded-[10px]">
            Voir plus
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Annonces;
