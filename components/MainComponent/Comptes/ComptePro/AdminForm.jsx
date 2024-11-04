"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function AdminForm({ handlePreviousStep, handleNextStep }) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleAlert = () => {
    if (selectedValue === "monsieur") {
      alert("Vous avez sélectionné Monsieur.");
    } else if (selectedValue === "madame") {
      alert("Vous avez sélectionné Madame.");
    } else if (selectedValue === "mademoiselle") {
      alert("Vous avez sélectionné Mademoiselle.");
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
        <h2 className="text-[#15213d] text-2xl font-bold underline">
          Etape 3 : L'administrateur du compte
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez renseigner les informations concernant la personne qui gèrera
          ce compte.
        </p>
      </div>

      <div className="space-y-2 ">
        {/* civilité */}
        <div className="pt-2 space-y-2">
          <Label
            className="text-right font-medium text-[17px] text-[#425466]"
            htmlFor="civilite"
          >
            La civilité
          </Label>
          <div className="flex items-start gap-2 ">
            <RadioGroup
              className="flex items-center space-x-6"
              onValueChange={(value) => setSelectedValue(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monsieur" id="monsieur" />
                <Label
                  className="text-right font-medium text-[17px]"
                  htmlFor="monsieur"
                >
                  Monsieur
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="madame" id="madame" />
                <Label
                  className="text-right font-medium text-[17px]"
                  htmlFor="madame"
                >
                  Madame
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mademoiselle" id="mademoiselle" />
                <Label
                  className="text-right font-medium text-[17px]"
                  htmlFor="mademoiselle"
                >
                  Mademoiselle
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* nom */}
        <div className="space-y-2">
          <Label
            htmlFor="nom"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Le nom
          </Label>
          <Input
            type="text"
            id="nom"
            name="nom"
            placeholder="Votre nom"
            required
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>

        {/* prénom */}
        <div className="space-y-2">
          <Label
            htmlFor="prenom"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Le prénom
          </Label>
          <Input
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Votre prénom"
            required
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>

        {/* email */}
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            L'adresse email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="email@gmail.com"
            required
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
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
            onClick={() => {
              handleAlert();
              handleNextStep();
            }}
          >
            Suivant
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
