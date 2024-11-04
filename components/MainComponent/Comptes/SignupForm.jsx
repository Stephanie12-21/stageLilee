"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export function SignUpForm({ handleNextStep, setShowLogin }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleSubmit = () => {
    if (selectedOption === "default") {
      handleNextStep("personnel");
    } else if (selectedOption === "professionnel") {
      handleNextStep("professionnel");
    } else {
      alert("Veuillez sélectionner une option.");
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
        <h2 className="text-[#15213d] text-2xl font-bold">
          Bienvenue parmi nous
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez suivre les étapes afin de créer votre compte
        </p>
      </div>

      <div className="flex items-start flex-col gap-3 pt-5">
        <p className="text-[#15213d] text-2xl font-bold">Choisir une option</p>
        <RadioGroup
          defaultValue={selectedOption}
          onValueChange={handleOptionChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="perso" />
            <Label
              className="text-right font-medium text-[17px]"
              htmlFor="perso"
            >
              Compte personnel
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="professionnel" id="pro" />
            <Label className="text-right font-medium text-[17px]" htmlFor="pro">
              Compte professionnel
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mt-5">
        <Button
          type="button"
          className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Suivant
        </Button>
      </div>

      <div className="flex items-center justify-center pt-4 space-x-3">
        <p>Vous êtes déjà membre?</p>
        <Link
          href="#"
          className="text-[#182135] font-semibold hover:underline"
          onClick={() => setShowLogin(true)}
        >
          Se connecter
        </Link>
      </div>

      <Separator className="mt-2" />

      <div className="flex flex-col items-start space-y-2 pt-5">
        <p className="text-[#9eafeb]">
          *L'option "compte personnel" serait idéale si vous voulez agir en tant
          que particulier.
        </p>
        <p className="text-[#9eafeb]">
          *L'option "compte professionnel" serait plus adaptée pour les
          entreprises individuelles, les sociétés, les associations, etc...
        </p>
        <p className="text-[#e35959] underline ">
          *Toutes les annonces non conformes aux règlements de notre site seront
          refusées.
        </p>
      </div>
    </motion.div>
  );
}
