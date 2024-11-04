"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import React, { useState } from "react";

export function PictureProfilePro({ handlePreviousStep, handleNextStep }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-size-sm w-[70%] h-fit p-8 container mx-auto pt-2 bg-white rounded-[24px] shadow-lg"
    >
      <div className="flex items-center justify-center">
        <Image src="/assets/logo.svg" width={200} height={200} alt="logo" />
      </div>

      <div className="flex items-start flex-col gap-2 pt-1">
        <h2 className="text-[#15213d] text-2xl font-bold underline">
          Etape 8 : La photo de profil
        </h2>
        <p className="text-[#15213d] font-medium">
          Pour personnaliser votre profil, pensez à mettre une photo de votre
          entreprise.
        </p>
      </div>

      <div className="relative w-[300px] h-[300px] mx-auto pt-4">
        <div className="border-2 border-dashed border-gray-300 p-4 w-full h-full flex items-center justify-center">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Selected photo"
              width={300}
              height={300}
              className="object-contain"
            />
          ) : (
            <span className="text-gray-500">Aucune photo sélectionnée</span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="imageUpload"
          onChange={handleImageChange}
        />
        <label
          htmlFor="imageUpload"
          className="absolute top-0 right-0 pl-8 text-blue-600  cursor-pointer"
        >
          <MdOutlineAddPhotoAlternate className="w-6 h-6" />
        </label>
      </div>

      <div className="flex flex-col space-y-4 pt-5">
        <Button
          type="button"
          className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
          onClick={handlePreviousStep}
        >
          Retour
        </Button>
        <Button
          type="button"
          className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
          onClick={handleNextStep}
        >
          Créer le compte
        </Button>
      </div>
    </motion.div>
  );
}
