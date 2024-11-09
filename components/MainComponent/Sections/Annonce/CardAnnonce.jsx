"use client";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export function CardAnnonce() {
  const [isLiked, setIsLiked] = useState(false);

  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Card className="w-[400px] h-[500px] rounded-[24px]  shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl">
      <CardContent className="w-[390px] h-[300px] flex items-center mt-1 mx-auto  rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
        <div
          className="relative mx-auto p-2 left-40 top-[-110px] rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer"
          onClick={toggleHeart}
        >
          {isLiked ? (
            <AiFillHeart size={28} color="#FC1111" />
          ) : (
            <AiOutlineHeart size={28} color="#FC1111" />
          )}
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start p-2 gap-y-4 mt-2">
        <div className="flex items-center space-x-52">
          <Label htmlFor="categorie" className="bg-slate-300 p-2 rounded-[4px]">
            Catégorie
          </Label>
          <Link href="/Annonces/InfoAnnonces">
            <Button className=" text-[#15213D] text-[16px] font-semibold bg-transparent hover:underline hover:bg-transparent px-4 py-2 rounded-[10px]">
              Découvrir
            </Button>
          </Link>
        </div>

        <Label htmlFor="type" className="text-xl">
          Titre
        </Label>
        <Label htmlFor="localisation">Localisation </Label>

        <div className="flex gap-x-52">
          <div className="flex">
            <p className="text-[#FCA311] font-normal text-[18px]">Date</p>
          </div>

          <div className="flex items-center">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gold"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="none"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
