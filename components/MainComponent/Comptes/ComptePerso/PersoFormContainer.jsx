"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Eye, EyeOff } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const PersoFormContainer = () => {
  const [step, setStep] = useState(1); // To track the current step
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  }); // Consolidate form values in one state

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const previousStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Prevent going below step 1
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PersonalForm
            nextStep={nextStep}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        );
      case 2:
        return (
          <EmailVerification nextStep={nextStep} previousStep={previousStep} />
        );
      case 3:
        return (
          <PhoneForm
            nextStep={nextStep}
            previousStep={previousStep}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        );
      case 4:
        return (
          <PhoneVerification nextStep={nextStep} previousStep={previousStep} />
        );
      case 5:
        return <PasswordForm nextStep={nextStep} previousStep={previousStep} />;
      default:
        return (
          <PersonalForm
            nextStep={nextStep}
            formValues={formValues}
            setFormValues={setFormValues}
          />
        );
    }
  };

  return <div className="perso-form-container">{renderStep()}</div>;
};

function PersonalForm({ nextStep, formValues, setFormValues }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNext = () => {
    console.log("Nom:", formValues.nom);
    console.log("Prénom:", formValues.prenom);
    console.log("Email:", formValues.email);
    nextStep();
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
          Etape 1 : Vos informations personnelles
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez renseigner vos informations personnelles
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2 pt-6">
          <Label
            htmlFor="nom"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Votre nom
          </Label>
          <Input
            type="text"
            id="nom"
            name="nom"
            placeholder="Votre nom"
            required
            value={formValues.nom}
            onChange={handleChange}
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="prenom"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Votre prénom
          </Label>
          <Input
            type="text"
            id="prenom"
            name="prenom"
            placeholder="Votre prénom"
            required
            value={formValues.prenom}
            onChange={handleChange}
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>

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
            value={formValues.email}
            onChange={handleChange}
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>

        <div className="flex flex-col space-y-4 pt-5">
          <Button
            type="button"
            className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
            onClick={nextStep} // Handle next step here
          >
            Suivant
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// EmailVerification component
function EmailVerification({ nextStep, previousStep }) {
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
          Etape 2 : Vérification de l'email
        </h2>
        <p className="text-[#15213d] font-medium">
          Nous avons envoyé un code de vérification à votre adresse email,
          veuillez le saisir ici.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center pt-5">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-center pt-4 space-x-3">
          <p>Aucun code reçu?</p>
          <Button
            type="button"
            className="text-[#182135] text-[17px] bg-transparent hover:bg-transparent font-semibold hover:underline"
            onClick={() => {
              /* Handle resend code */
            }}
          >
            Renvoyer le code
          </Button>
        </div>

        <div className="flex flex-col space-y-4 pt-5">
          <Button
            type="button"
            className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
            onClick={previousStep}
          >
            Retour
          </Button>
          <Button
            type="button"
            className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
            onClick={nextStep}
          >
            Vérifier
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// PhoneForm component
function PhoneForm({ nextStep, previousStep, formValues, setFormValues }) {
  const handleChange = (value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      phone: value,
    }));
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
          Etape 3 : Votre numéro de téléphone
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez saisir votre numéro de téléphone
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2 pt-6">
          <Label
            htmlFor="phone"
            className="text-right text-[#425466] font-medium text-[17px]"
          >
            Votre numéro de téléphone
          </Label>
          <PhoneInput
            id="phone"
            name="phone"
            placeholder="Ex: 0123456789"
            required
            value={formValues.phone}
            onChange={handleChange}
            className="col-span-3 items-start w-full bg-[#edf2f7] text-[17px] text-[#27272E] font-medium"
          />
        </div>

        <div className="flex flex-col space-y-4 pt-5">
          <Button
            type="button"
            className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
            onClick={previousStep}
          >
            Retour
          </Button>
          <Button
            type="button"
            className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
            onClick={nextStep}
          >
            Suivant
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// PhoneVerification component
function PhoneVerification({ nextStep, previousStep }) {
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
          Etape 4 : Vérification du numéro de téléphone
        </h2>
        <p className="text-[#15213d] font-medium">
          Nous avons envoyé un code de vérification à votre numéro de téléphone,
          veuillez le saisir ici.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center pt-5">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex items-center justify-center pt-4 space-x-3">
          <p>Aucun code reçu?</p>
          <Button
            type="button"
            className="text-[#182135] text-[17px] bg-transparent hover:bg-transparent font-semibold hover:underline"
            onClick={() => {
              /* Handle resend code */
            }}
          >
            Renvoyer le code
          </Button>
        </div>

        <div className="flex flex-col space-y-4 pt-5">
          <Button
            type="button"
            className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
            onClick={previousStep}
          >
            Retour
          </Button>
          <Button
            type="button"
            className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
            onClick={nextStep}
          >
            Vérifier
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// PasswordForm component
function PasswordForm({ nextStep, previousStep }) {
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
          Etape 5 : Choisissez un mot de passe
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez créer un mot de passe pour votre compte
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

      <div className="flex flex-col space-y-4 pt-5">
        <Button
          type="button"
          className="w-full px-5 py-2 text-[#2563eb] bg-inherit text-[17px] border border-[#2563eb] rounded-md hover:bg-blue-700 hover:text-white"
          onClick={previousStep}
        >
          Retour
        </Button>
        <Button
          type="button"
          className="w-full px-5 py-2 bg-blue-600 text-white text-[17px] rounded-md hover:bg-blue-700"
          onClick={nextStep}
        >
          Créer un compte
        </Button>
      </div>
    </motion.div>
  );
}

// picture
function PictureProfile({ handlePreviousStep, handleNextStep }) {
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
          Etape 6 : La photo de profil
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
export default PersoFormContainer;
