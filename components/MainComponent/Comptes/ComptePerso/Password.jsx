import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export function PasswordForm({ handlePreviousStep, handleNextStep }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
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
          Etape 5 : Le mot de passe
        </h2>
        <p className="text-[#15213d] font-medium">
          Pour sécuriser votre compte, entrez un mot de passe sécurisé.
        </p>
      </div>

      <div className="space-y-2 relative pt-4">
        <Label
          htmlFor="password"
          className="text-right text-[#425466] font-medium text-[16px]"
        >
          Votre mot de passe
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="*******"
            className="col-span-3 items-start w-full bg-[#edf2f7] pr-10 text-[17px] text-[#27272E] font-medium"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Eye className="w-5 h-5 text-gray-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2 relative pt-4">
        <Label
          htmlFor="confirm-password"
          className="text-right text-[#425466] font-medium text-[16px]"
        >
          Confirmez le mot de passe
        </Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="*******"
            className="col-span-3 items-start w-full bg-[#edf2f7] pr-10 text-[17px] text-[#27272E] font-medium"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Eye className="w-5 h-5 text-gray-600" />
            ) : (
              <EyeOff className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 pt-10">
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
    </motion.div>
  );
}
