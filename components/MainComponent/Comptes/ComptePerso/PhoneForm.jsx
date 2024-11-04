"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

export function PhoneForm({ handlePreviousStep, handleNextStep }) {
  const [phone, setPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    value: "fr",
    label: "France",
  });

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-size-sm w-[70%] h-[450px] container mx-auto pt-2 bg-white rounded-[24px] shadow-lg"
    >
      <div className="flex items-center justify-center">
        <Image src="/assets/logo.svg" width={200} height={200} alt="logo" />
      </div>

      <div className="flex items-start flex-col gap-2 pt-1">
        <h2 className="text-[#15213d] text-2xl font-bold underline">
          Etape 3 : Le numéro de téléphone
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez renseigner vos informations personnelles
        </p>
      </div>

      <div className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label
            htmlFor="num"
            className="text-right text-[#425466] font-medium text-[16px]"
          >
            Votre numéro de téléphone
          </Label>
          <PhoneInput
            country={selectedCountry.value}
            value={phone}
            onChange={setPhone}
            placeholder="Entrez votre numéro"
            inputStyle={{ width: "100%", height: "40px" }}
            buttonClass="custom-flag-style"
            inputClass="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
          />
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
            Suivant
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
