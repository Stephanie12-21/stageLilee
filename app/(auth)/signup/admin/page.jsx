"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";

import { motion } from "framer-motion";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useRouter } from "next/navigation";

const Administrator = () => {
  const [step, setStep] = useState(1);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [verificationCodePhone, setVerificationCodePhone] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const router = useRouter();

  const schema = z.object({
    nom: z.string().min(1, "Le nom est requis."),
    prenom: z.string().min(1, "Le prénom est requis."),
    email: z.string().email("L'email est invalide."),
    phone: z.string().min(1, "Le numéro de téléphone est requis."),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
    imageFile: z
      .array(z.instanceof(File))
      .min(0, "L'ajout de l'image est optionnelle."),
    verificationCode: z
      .string()
      .length(6, "Le code de vérification doit contenir 6 chiffres."),
  });

  function generateVerificationCodes() {
    const emailVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const phoneVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated Email Verification Code:", emailVerificationCode);
    console.log("Generated Phone Verification Code:", phoneVerificationCode);

    return { emailVerificationCode, phoneVerificationCode };
  }

  const handlePreviousStep = () => {
    if (step > 1) {
      const previousStep = step - 1;
      setStep(previousStep);
      console.log(`Retour à l'étape ${previousStep}`);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const generatedCodes = generateVerificationCodes();
      try {
        const response = await fetch("/api/user/emailVerif/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            prenom,

            verificationCode: generatedCodes.emailVerificationCode,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi de l'e-mail");
        }

        console.log("E-mail envoyé avec succès");
        setEmailVerificationCode(generatedCodes.emailVerificationCode);
      } catch (error) {
        console.error(error);
        alert(error.message);
        return;
      }
    } else if (step === 2) {
      if (verificationCode !== emailVerificationCode) {
        alert("Le code de vérification est incorrect.");
        return;
      }
      console.log("Code de vérification correct.");
    } else if (step === 3) {
      const generatedCodes = generateVerificationCodes();
      const Phone = `+${phone}`;
      try {
        const response = await fetch("/api/user/verifPhone/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Phone,
            prenom,
            verificationCode: generatedCodes.phoneVerificationCode,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du SMS");
        }

        console.log("SMS envoyé avec succès");
        console.log(
          "Code de vérification envoyé par SMS:",
          generatedCodes.phoneVerificationCode
        );
        setPhoneVerificationCode(generatedCodes.phoneVerificationCode);
      } catch (error) {
        console.error(error);
        alert(error.message);
        return;
      }
    } else if (step === 4) {
      if (verificationCodePhone !== phoneVerificationCode) {
        alert("Le code de vérification est incorrect.");
        return;
      }
      console.log("Code de vérification correct.");
    }
    if (step < 6) {
      setStep(step + 1);
      console.log(`Vous allez passer à l'étape ${step + 1}`);
    } else {
      handleSubmit();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Veuillez télécharger un fichier image valide.");
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = "ADMIN";
    const statutUser = "ACTIF";
    const Phone = `+${phone}`;
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("phone", Phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("statutUser", statutUser);

    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await fetch("/api/user/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi des données.");
      } else {
        router.push(`/login`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const slideVariants = {
    initial: (direction) => ({
      x: direction < 0 ? -300 : 300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  const handlePrevPage = () => {
    router.push("/signup");
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto grid  gap-6 max-md:px-8">
          <div className="flex items-start justify-between">
            <div className="flex items-start justify-center text-center h-full">
              <Image
                src="/assets/logo.svg"
                width="200"
                height="100"
                alt="Logo Lilee"
                className="absolute top-4 left-40 max-md:left-8 h-[70px]"
              />
            </div>
          </div>

          <motion.div
            className="w-full h-[80%] mx-1 flex gap-4"
            key={step}
            custom={step}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={slideVariants}
          >
            {step === 1 && (
              <div className="grid gap-4 h-full w-[400px]">
                <h1 className="text-2xl font-bold max-md:text-start">
                  Bienvenue parmi nous
                </h1>
                <div className="grid space-y-4">
                  {/* nom */}
                  <div className="space-y-2">
                    <Label htmlFor="nom">Votre nom</Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Votre nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="bg-white p-2 border border-gray-300 rounded"
                    />
                  </div>

                  {/* prénom */}
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Votre prénom</Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="Votre prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      className="bg-white p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Votre adresse email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="pt-6 flex space-x-8 justify-center">
                    <Button
                      onClick={handlePrevPage}
                      className="w-full  text-[16px]"
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="w-full text-[16px]"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 h-full w-[400px]">
                <div className="space-y-3">
                  <Label className="text-balance text-[16px] text-muted-foreground max-md:text-center pb-6">
                    Nous avons envoyé un code de vérification à votre adresse
                    email. <br /> <br /> Veuillez le saisir ici.
                  </Label>
                  <Input
                    type="text"
                    placeholder="Entrez le code de vérification"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="bg-white p-2 border border-gray-300 rounded"
                  />
                </div>

                <div className="pt-6 flex space-x-8 justify-center">
                  <Button
                    onClick={handlePreviousStep}
                    className="w-full text-[16px]"
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="w-full text-[16px]"
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 h-full w-[400px]">
                <div className="space-y-4">
                  <div className="grid space-y-2 h-fit">
                    <Label htmlFor="num">Votre numéro de téléphone</Label>
                    <PhoneInput
                      country={"fr"}
                      value={phone}
                      onChange={(value) => setPhone(value)} // Utilisez `value` au lieu de `e.target.value`
                      placeholder="Entrez votre numéro"
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        fontSize: "16px",
                      }}
                      inputClass="col-span-2 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                    />
                  </div>

                  <div className="relative">
                    <Label htmlFor="num">Votre mot de passe</Label>
                    <Input
                      id="password"
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="*******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white pr-10 text-[16px] font-medium"
                    />
                    <div
                      className="absolute top-1/2 right-3 flex items-center cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <Eye className="w-5 h-5 text-gray-600" />
                      ) : (
                        <EyeOff className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>

                  <div className="pt-6 flex space-x-8 justify-center">
                    <Button
                      onClick={handlePreviousStep}
                      className="w-full text-[16px]"
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="w-full text-[16px]"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="grid gap-4 h-full w-[400px]">
                <div className="space-y-3">
                  <Label className="text-balance text-[16px] text-muted-foreground max-md:text-center pb-6">
                    Nous avons envoyé un code de vérification à votre numéro de
                    téléphone. <br /> <br /> Veuillez le saisir ici.
                  </Label>
                  <Input
                    type="text"
                    placeholder="Entrez le code de vérification"
                    value={verificationCodePhone}
                    onChange={(e) => setVerificationCodePhone(e.target.value)}
                    className="bg-white p-2 border border-gray-300 rounded"
                  />
                  <div className="pt-6 flex space-x-8 justify-center">
                    <Button
                      onClick={handlePreviousStep}
                      className="w-full text-[16px]"
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      className="w-full text-[16px]"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="grid gap-4 h-full w-[400px]">
                <div className="space-y-4">
                  <Label className="text-balance text-[16px] text-muted-foreground max-md:text-center pb-6">
                    L&apos;ajout de l&apos;image est optionnelle.
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="imageFile"
                    onChange={handleImageChange}
                    className="bg-white p-2 border border-gray-300 rounded"
                  />
                  {selectedImage && (
                    <div className="mt-2 flex items-center justify-center">
                      <Image
                        src={selectedImage}
                        alt="Selected preview"
                        width={300}
                        height={300}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div className="pt-6 flex space-x-8 justify-center">
                    <Button
                      onClick={handlePreviousStep}
                      className="w-full text-[16px]"
                    >
                      Retour
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="w-full text-[16px]"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <div className="block max-lg:hidden bg-muted overflow-hidden">
        <Image
          src="/assets/marcus-aurelius.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default Administrator;
