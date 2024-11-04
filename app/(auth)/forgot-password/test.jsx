"use client";
import { Button } from "@/components/ui/button";
import { Logo, MarcusAurelius } from "@/public/assets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const SignUpPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // États pour les champs de formulaire
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numTel, setNumTel] = useState("");
  const [otpEmail, setOtpEmail] = useState(["", "", "", "", "", ""]);
  const [otpTel, setOtpTel] = useState(["", "", "", "", "", ""]);

  // Ajout de la constante totalSteps
  const totalSteps = 5; // Il y a 4 étapes dans le formulaire

  const nextStep = () => {
    setDirection(1); // Positive direction for going forward
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1)); // Incrémente sans dépasser totalSteps
  };

  const previousStep = () => {
    setDirection(-1); // Negative direction for going backward
    setCurrentStep((prev) => Math.max(prev - 1, 0)); // Décrémente sans aller en-dessous de 0
  };

  const checkAndShowAlert = () => {
    const otpCodeTel = otpTel.join("");
    const otpCodeEmail = otpEmail.join("");
    if (
      !nom ||
      !prenom ||
      !email ||
      otpCodeTel.length < 6 ||
      otpCodeEmail.length < 6
    ) {
      alert("Veuillez remplir tous les champs.");
    } else {
      // Afficher une alerte avec toutes les informations
      alert(`Informations remplies :
      - Nom: ${nom}
      - Prénom: ${prenom}
      - Email: ${email}
      - OTP Tel: ${otpCodeTel}
      - OTP Email: ${otpCodeEmail}`);
    }
  };

  const finishOnboarding = () => {
    checkAndShowAlert();
  };

  const slideVariants = {
    initial: (direction) => ({
      x: direction < 0 ? -300 : 300, // Entrée : vers la gauche si retour en arrière
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300, // Sortie : vers la droite si avance
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <Image
        src={Logo}
        width="200"
        height="100"
        alt="Logo Lilee"
        className="absolute top-4 left-40 max-md:left-8 h-[70px]"
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto grid w-[350px] gap-6 max-md:px-8">
          <div className="flex items-start justify-between">
            <div className="grid gap-2 text-center">
              <h1 className="text-2xl font-bold max-md:text-start">
                Bienvenue parmi nous
              </h1>
            </div>
          </div>
          {/* ============= */}
          <form className="w-[310px] h-[400px] flex flex-col justify-between relative">
            <motion.div
              className="w-full h-[80%] mx-1 flex gap-4"
              key={currentStep} // Important pour que Framer Motion sache quel élément animer
              custom={currentStep}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={slideVariants}
            >
              {/* Étape 1 - Formulaire Nom, Prénom, Email */}
              {currentStep === 0 && (
                <div className="grid gap-4 h-full w-[300px]">
                  <div className="grid space-y-2">
                    <Label htmlFor="nom">Votre nom</Label>
                    <Input
                      type="text"
                      id="nom"
                      name="nom"
                      placeholder="Votre nom"
                      value={nom} // Lier l'état au champ
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Votre prénom</Label>
                    <Input
                      type="text"
                      id="prenom"
                      name="prenom"
                      placeholder="Votre prénom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Votre adresse email</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Étape 2 - Code OTP Email */}
              {currentStep === 1 && (
                <div className="grid gap-4 h-full w-[300px] items-start">
                  <div className="grid gap-2">
                    <p className="text-[#15213d] font-medium mb-5">
                      Nous avons envoyé un code de vérification à votre adresse
                      email, veuillez le saisir ici.
                    </p>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          value={otpEmail[0] || ""}
                          onChange={(e) =>
                            setOtpEmail(
                              (prev) =>
                                prev.slice(0, 0) +
                                e.target.value +
                                prev.slice(1)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={1}
                          value={otpEmail[1] || ""}
                          onChange={(e) =>
                            setOtpEmail(
                              (prev) =>
                                prev.slice(0, 1) +
                                e.target.value +
                                prev.slice(2)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={2}
                          value={otpEmail[2] || ""}
                          onChange={(e) =>
                            setOtpEmail(
                              (prev) =>
                                prev.slice(0, 2) +
                                e.target.value +
                                prev.slice(3)
                            )
                          }
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          value={otpEmail[3] || ""}
                          onChange={(e) =>
                            setOtpEmail(
                              (prev) =>
                                prev.slice(0, 3) +
                                e.target.value +
                                prev.slice(4)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={4}
                          value={otpEmail[4] || ""}
                          onChange={(e) =>
                            setOtpEmail(
                              (prev) =>
                                prev.slice(0, 4) +
                                e.target.value +
                                prev.slice(5)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={5}
                          value={otpEmail[5] || ""}
                          onChange={(e) =>
                            setOtpEmail(
                              (prev) => prev.slice(0, 5) + e.target.value
                            )
                          }
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              )}

              {/* Étape 3 - Numéro de téléphone */}
              {currentStep === 2 && (
                <div className="grid gap-2 h-full w-[300px] items-start">
                  <div className="grid gap-2 h-fit">
                    <Label htmlFor="num">Votre numéro de téléphone</Label>
                    <Input
                      placeholder="Entrez votre numéro"
                      value={numTel}
                      onChange={(e) => setNumTel(e.target.value)}
                      className="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Étape 4 - Code OTP Téléphone */}
              {currentStep === 3 && (
                <div className="grid gap-4 h-full w-[300px] items-start">
                  <div className="grid gap-2">
                    <p className="text-[#15213d] font-medium mb-5">
                      Nous avons envoyé un code de vérification à votre numéro
                      de téléphone, veuillez le saisir ici.
                    </p>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          value={otpTel[0] || ""}
                          onChange={(e) =>
                            setOtpTel(
                              (prev) =>
                                prev.slice(0, 0) +
                                e.target.value +
                                prev.slice(1)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={1}
                          value={otpTel[1] || ""}
                          onChange={(e) =>
                            setOtpTel(
                              (prev) =>
                                prev.slice(0, 1) +
                                e.target.value +
                                prev.slice(2)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={2}
                          value={otpTel[2] || ""}
                          onChange={(e) =>
                            setOtpTel(
                              (prev) =>
                                prev.slice(0, 2) +
                                e.target.value +
                                prev.slice(3)
                            )
                          }
                        />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          value={otpTel[3] || ""}
                          onChange={(e) =>
                            setOtpTel(
                              (prev) =>
                                prev.slice(0, 3) +
                                e.target.value +
                                prev.slice(4)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={4}
                          value={otpTel[4] || ""}
                          onChange={(e) =>
                            setOtpTel(
                              (prev) =>
                                prev.slice(0, 4) +
                                e.target.value +
                                prev.slice(5)
                            )
                          }
                        />
                        <InputOTPSlot
                          index={5}
                          value={otpTel[5] || ""}
                          onChange={(e) =>
                            setOtpTel(
                              (prev) => prev.slice(0, 5) + e.target.value
                            )
                          }
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              )}
              {/* Étape 5 - Code Profile */}
              {currentStep === 4 && (
                <div className="grid gap-4 h-full w-[300px] items-start">
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
                        <span className="text-gray-500">
                          Aucune photo sélectionnée
                        </span>
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
                </div>
              )}
            </motion.div>

            {/* Boutons de navigation */}
            <div className="flex justify-between mt-4">
              <Button
                className="w-full"
                onClick={previousStep}
                disabled={currentStep === 0} // Désactive si à la première étape
              >
                Retour
              </Button>
              {currentStep < totalSteps - 1 ? (
                <Button
                  type="button"
                  className="w-full ml-2"
                  onClick={nextStep}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  type="button"
                  className="w-full ml-2"
                  onClick={finishOnboarding}
                >
                  Créer le compte
                </Button>
              )}
            </div>
          </form>
          {/* ============= */}
          <div className="mt-4 text-center text-sm">
            Vous êtes déjà membre?
            <br />
            <Link href="/sign-in" className="underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
      <div className="block max-lg:hidden bg-muted overflow-hidden">
        <Image
          src={MarcusAurelius}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
