"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import DetailAnnonces from "./DetailAnnonces";
import { CardAnnonce } from "@/components/MainComponent/Sections/Annonce/CardAnnonce";
import { SectionDate } from "./SectionDate";

const InfoAnnonces = () => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  // État pour l'image actuellement sélectionnée
  const [mainImage, setMainImage] = useState("/infoannonce/photo(1).svg");

  // Fonction pour changer l'image principale
  const changeImage = (newImage) => {
    setMainImage(newImage);
  };

  // Variantes d'animation pour les cartes
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
    <div className="container mx-auto py-10">
      <Link href="/PAGES/Annonces">
        <Button className="py-5 text-[18px] rounded-[10px] space-x-3">
          <FaArrowLeft className="ml-2 mr-4" />
          Retour
        </Button>
      </Link>

      <div className="pt-10 pb-10 flex items-center space-x-20">
        <div className="flex space-x-5 w-[50%]">
          <Image src={mainImage} width={500} height={300} />

          <div className="flex flex-col justify-center items-center space-y-14 ">
            <Image
              src="/infoannonce/photo(2).svg"
              width={82}
              height={80}
              onClick={() => changeImage("/infoannonce/photo(2).svg")}
              className="cursor-pointer"
            />
            <Image
              src="/infoannonce/photo(3).svg"
              width={82}
              height={80}
              onClick={() => changeImage("/infoannonce/photo(3).svg")}
              className="cursor-pointer"
            />
            <Image
              src="/infoannonce/photo(4).svg"
              width={82}
              height={80}
              onClick={() => changeImage("/infoannonce/photo(4).svg")}
              className="cursor-pointer"
            />
            <Image
              src="/infoannonce/photo(5).svg"
              width={82}
              height={80}
              onClick={() => changeImage("/infoannonce/photo(5).svg")}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="w-[50%]">
          <Card className="w-[700px] space-y-2 flex flex-col shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl gap-4">
            <CardHeader>
              <div className="flex items-center space-x-80">
                <CardTitle>Désignation de l'annonce</CardTitle>
                <div
                  className="p-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer"
                  onClick={toggleHeart}
                >
                  {isLiked ? (
                    <AiFillHeart size={24} color="#FC1111" />
                  ) : (
                    <AiOutlineHeart size={24} color="#FC1111" />
                  )}
                </div>
              </div>
              <CardDescription>Brève description</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <Label htmlFor="name">Durée de réservation</Label>
              <SectionDate className="w-full text-[14px]" />
            </CardContent>

            <CardFooter className="flex justify-center">
              <Button className="w-full">Réservez</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex items-start w-full pt-10">
        <DetailAnnonces />
      </div>

      <div className="pt-10 space-y-5">
        <h1 className="text-3xl text-[#23262F] font-semibold">
          Vous pourrez aussi aimer
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => {
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

        <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
          <Link href="/Annonces">
            <Button className="py-4 px-5 text-[17px] rounded-[10px]">
              Voir plus
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoAnnonces;
