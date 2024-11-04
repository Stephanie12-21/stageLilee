import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";



export function PersonnalForm({ handlePreviousStep, handleNextStep }) {
  // State pour stocker les valeurs des champs
  const [formValues, setFormValues] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  // Fonction pour gérer les changements dans les champs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Fonction pour gérer le clic sur le bouton "Suivant"
  const handleNext = () => {
    // Affiche les valeurs des champs dans la console
    console.log("Nom:", formValues.nom);
    console.log("Prénom:", formValues.prenom);
    console.log("Email:", formValues.email);

    // Appelle la fonction handleNextStep si elle est fournie
    if (handleNextStep) {
      handleNextStep();
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
          Etape 1 : Vos informations personnelles
        </h2>
        <p className="text-[#15213d] font-medium">
          Veuillez renseigner vos informations personnelles
        </p>
      </div>

      <div className="space-y-4 ">
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
            value={formValues.nom} // Attache la valeur de l'état
            onChange={handleChange} // Met à jour l'état lors d'un changement
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
            value={formValues.prenom} // Attache la valeur de l'état
            onChange={handleChange} // Met à jour l'état lors d'un changement
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
            value={formValues.email} // Attache la valeur de l'état
            onChange={handleChange} // Met à jour l'état lors d'un changement
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
            onClick={handleNext} // Appelle la fonction handleNext qui affiche les valeurs dans la console
          >
            Suivant
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

