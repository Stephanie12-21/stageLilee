"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { EyeOff, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AuthForm({ setShowLogin, handlePasswordRecovery }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-size-sm w-[70%] h-fit p-8 container mx-auto pt-3 bg-white rounded-[24px] shadow-lg"
    >
      <div className="flex items-center justify-center">
        <Image src="/assets/logo.svg" width={200} height={200} alt="logo" />
      </div>

      <div className="flex items-start flex-col gap-3 pt-2">
        <h2 className="text-[#15213d] text-2xl font-bold">
          Bon retour parmi nous
        </h2>
        <p className="text-[#15213d] font-medium">
          Accédez à votre compte pour découvrir les dernières nouveautés.
        </p>
      </div>

      <div className="pt-6">
        <form className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-right text-[#425466] font-medium text-[17px]"
            >
              Votre adresse email
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

          <div className="flex items-start underline text-[15px] ">
            <Link
              href="#"
              className=" text-[#2c2e33] font-medium"
              onClick={handlePasswordRecovery}
            >
              Mot de passe oublié?
            </Link>
          </div>

          <div className="pt-5">
            <Button
              type="submit"
              className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
            >
              Connexion
            </Button>
          </div>

          <div className="flex flex-col items-center justify-center p-4 space-y-1">
            <p>Vous êtes nouveau? Venez nous rejoindre</p>
            <Link
              href="#"
              className="text-[#182135] font-semibold hover:underline"
              onClick={() => setShowLogin(false)}
            >
              Créer un compte
            </Link>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
