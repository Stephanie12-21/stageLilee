"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logo, MarcusAurelius } from "@/public/assets";
import React from "react";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Professionnel = () => {
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

  //INFORMATIONS DE LA SOCIETE
  const [siret, setSiret] = useState("");
  const [nomSociete, setNomSociete] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [adresse, setAdresse] = useState("");
  const [ville, setVille] = useState("");
  const [secteurActivite, setSecteurActivite] = useState("");
  const [typeSociete, setTypeSociete] = useState("");
  const [companyInfo, setCompanyInfo] = useState("");
  const [siretValid, setSiretValid] = useState(null); // Pour stocker l'état de la validation
  const [errorMessage, setErrorMessage] = useState(""); // Pour stocker les messages d'erreur

  const schema = z.object({
    // Informations de la société
    nomSociete: z.string().min(1, "Le nom de la société est requis."),
    siret: z
      .string()
      .regex(
        /^\d{14}$/,
        "Le numéro de SIRET doit contenir exactement 14 chiffres."
      ),
    adresse: z.string().min(1, "L'adresse est requise."),
    codePostal: z
      .string()
      .regex(/^\d{5}$/, "Le code postal doit contenir 5 chiffres."),

    ville: z.string().min(1, "La ville est requise."),
    secteurActivite: z.string().min(1, "Le secteur d'activité est requis."),
    typeSociete: z.string().min(1, "Le type de société est requis."),

    //info de l'admin du compte
    nom: z.string().min(1, "Le nom est requis."),
    prenom: z.string().min(1, "Le prénom est requis."),
    email: z.string().email("L'email est invalide."),
    phone: z.string().min(1, "Le numéro de téléphone est requis."),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères."),
    imageFile: z
      .array(z.instanceof(File))
      .min(0, "Au moins une image doit être uploadée."),
    verificationCode: z
      .string()
      .length(6, "Le code de vérification doit contenir 6 chiffres."),
  });

  //génére des codes opt pour l'email et le numéro de téléphone
  function generateVerificationCodes() {
    const emailVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const phoneVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // afficher les codes générés
    console.log("Generated Email Verification Code:", emailVerificationCode);
    console.log("Generated Phone Verification Code:", phoneVerificationCode);

    return { emailVerificationCode, phoneVerificationCode };
  }

  //fonction pour les actions "précédent"
  const handlePreviousStep = () => {
    if (step > 1) {
      const previousStep = step - 1;
      setStep(previousStep);
      console.log(`Retour à l'étape ${previousStep}`);
    }
  };

  //fonction pour la vérification du siret
  const verifySiret = async () => {
    const sanitizedSiret = siret.replace(/\s/g, "");

    // Vérification de la longueur et des chiffres
    if (!/^\d{14}$/.test(sanitizedSiret)) {
      console.error(
        "Erreur : Le numéro de SIRET doit contenir exactement 14 chiffres."
      );
      setErrorMessage(
        "Le numéro de SIRET doit contenir exactement 14 chiffres."
      );
      setSiretValid(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.insee.fr/entreprises/sirene/V3.11/siret/${sanitizedSiret}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer b9977817-1310-3865-b0b2-c49e2d8c160e`, // Assurez-vous que cette clé est valide
            "Content-Type": "application/json",
          },
        }
      );

      // Vérification des erreurs de réponse
      if (response.status === 404) {
        console.error("Erreur : Le numéro de SIRET n'existe pas.");
        setErrorMessage("Le numéro de SIRET n'existe pas.");
        setSiretValid(false);
      } else if (!response.ok) {
        const errorText = await response.json();
        console.error(
          "Erreur lors de la vérification du numéro de SIRET :",
          errorText
        );
        setErrorMessage(
          errorText.message ||
            "Erreur lors de la vérification du numéro de SIRET."
        );
        setSiretValid(false);
      } else {
        const data = await response.json();
        if (data && data.etablissement) {
          console.log("Le numéro de SIRET est valide :", data.etablissement);
          setErrorMessage("");
          setCompanyInfo(data.etablissement);

          setSiretValid(true);
        } else {
          console.error(
            "Erreur : Le SIRET a été trouvé, mais la propriété attendue n'est pas présente."
          );
          setErrorMessage(
            "Le numéro de SIRET est valide, mais des informations sont manquantes."
          );
          setSiretValid(true);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du SIRET :", error);
      setErrorMessage("Erreur lors de la vérification du SIRET.");
      setSiretValid(false);
    }
  };

  //fonction pour les actions "suivant"
  const handleNextStep = async () => {
    ////si on est à la 1eme étape, on vérifie la validité du siret
    if (step === 1) {
      verifySiret();
    }
    //si on est à la 4eme étape, on envoie le code à l'email saisi
    else if (step === 4) {
      const generatedCodes = generateVerificationCodes();
      try {
        const response = await fetch("/api/user/verifEmail/", {
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
    }
    //si on est à la 5eme étape, on vérifie le code envoyé
    else if (step === 5) {
      if (verificationCode !== emailVerificationCode) {
        alert("Le code de vérification est incorrect.");
        return;
      }
      console.log("Code de vérification correct.");
    }
    // //si on est à la 6eme étape, on envoie le code au numéro de téléphone saisi
    // else if (step === 6) {
    //   const generatedCodes = generateVerificationCodes();
    //   const Phone = `+${phone}`;
    //   try {
    //     const response = await fetch("/api/user/verifPhone/", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         Phone,
    //         prenom,
    //         verificationCode: generatedCodes.phoneVerificationCode,
    //       }),
    //     });

    //     if (!response.ok) {
    //       throw new Error("Erreur lors de l'envoi du SMS");
    //     }

    //     console.log("SMS envoyé avec succès");
    //     console.log(
    //       "Code de vérification envoyé par SMS:",
    //       generatedCodes.phoneVerificationCode
    //     );
    //     setPhoneVerificationCode(generatedCodes.phoneVerificationCode);
    //   } catch (error) {
    //     console.error(error);
    //     alert(error.message);
    //     return;
    //   }
    // }
    // //si on est à la 7eme étape, on vérifie le code envoyé
    // else if (step === 7) {
    //   if (verificationCodePhone !== phoneVerificationCode) {
    //     alert("Le code de vérification est incorrect.");
    //     return;
    //   }
    //   console.log("Code de vérification correct.");
    // }
    if (step < 9) {
      setStep(step + 1);
      console.log(`Vous allez passer à l'étape ${step + 1}`);
    } else {
      handleSubmit();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Vérifiez si le fichier est une image
      if (!file.type.startsWith("image/")) {
        alert("Veuillez télécharger un fichier image valide.");
        return;
      }

      // Créer une URL pour prévisualiser l'image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setImageFile(file); // Assurez-vous que c'est un fichier unique
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const role = "PRO"; // Définir le rôle
    const Phone = `+${phone}`; // Formater le numéro de téléphone

    // Création d'un nouvel objet FormData
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("phone", Phone);
    formData.append("password", password);
    formData.append("role", role);

    // Ajout des informations de la société
    formData.append("secteurActivite", secteurActivite);
    formData.append("typeSociete", typeSociete);
    formData.append("siret", siret);
    formData.append(
      "nomSociete",
      companyInfo.uniteLegale.denominationUniteLegale
    );
    formData.append(
      "adresse",
      `${companyInfo.adresseEtablissement.numeroVoieEtablissement} ${companyInfo.adresseEtablissement.typeVoieEtablissement} ${companyInfo.adresseEtablissement.libelleVoieEtablissement}`
    );
    formData.append(
      "codePostal",
      companyInfo.adresseEtablissement.codePostalEtablissement
    );
    formData.append(
      "ville",
      companyInfo.adresseEtablissement.libelleCommuneEtablissement
    );

    console.log("Secteur d'activité sélectionné:", secteurActivite);
    console.log("Type de société sélectionné:", typeSociete);

    // Ajout du fichier d'image s'il existe
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      // Envoi des données au serveur
      const response = await fetch("/api/userPro/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);

      // Vérification de la réponse du serveur
      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi des données.");
      } else {
        // Redirection après le succès
        router.push(`/login`);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto grid w-[350px] gap-6 max-md:px-8">
          <div className="flex items-start justify-between">
            <div className="grid gap-2 text-center">
              <h1 className="text-2xl font-bold max-md:text-start">
                Création de compte Professionnel
              </h1>
            </div>
          </div>

          {/* informations concernant la societé */}

          {/* numéro de siret, nom de la société  */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                type="text"
                name="siret"
                placeholder="Votre numéro de siret"
                value={siret}
                onChange={(e) => setSiret(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />

              <div className="mt-4 flex justify-between">
                <Button onClick={handleNextStep}>Suivant</Button>
              </div>
            </div>
          )}

          {/* code postal - ville - adresse */}
          {siretValid === true && companyInfo && (
            <>
              {step === 2 && (
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="nomSociete"
                    placeholder="Le nom de votre société"
                    value={companyInfo.uniteLegale.denominationUniteLegale}
                    onChange={(e) => setNomSociete(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <Input
                    type="text"
                    name="adresse"
                    placeholder="L'adresse"
                    value={`${companyInfo.adresseEtablissement.numeroVoieEtablissement} ${companyInfo.adresseEtablissement.typeVoieEtablissement} ${companyInfo.adresseEtablissement.libelleVoieEtablissement}`}
                    onChange={(e) => setAdresse(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />

                  <Input
                    type="text"
                    name="codePostal"
                    placeholder="Le code postal de votre société"
                    value={
                      companyInfo.adresseEtablissement.codePostalEtablissement
                    }
                    onChange={(e) => setCodePostal(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <Input
                    type="text"
                    name="ville"
                    placeholder="Le ville de localisation"
                    value={
                      companyInfo.adresseEtablissement
                        .libelleCommuneEtablissement
                    }
                    onChange={(e) => setVille(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />

                  <div className="mt-4 flex justify-between">
                    <Button onClick={handlePreviousStep}>Précédent</Button>
                    <Button onClick={handleNextStep}>Suivant</Button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* secteur - type */}
          {step === 3 && (
            <div className="space-y-4">
              {/* secteur */}
              <Select
                className="w-full"
                onValueChange={(value) => setSecteurActivite(value)}
              >
                <SelectTrigger className="w-full px-4">
                  <SelectValue
                    placeholder="Selectionner le secteur"
                    className="flex items-start"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="IMMOBILIER">Immobilier</SelectItem>
                    <SelectItem value="VETEMENT">Vêtements</SelectItem>
                    <SelectItem value="EMPLOI">
                      Emplois / Recrutement
                    </SelectItem>
                    <SelectItem value="SERVICE">Services</SelectItem>
                    <SelectItem value="VOITURE">Voitures</SelectItem>
                    <SelectItem value="LOISIR">Loisir</SelectItem>
                    <SelectItem value="MATERIEL">
                      Matériels / Equipements
                    </SelectItem>
                    <SelectItem value="MOBILIER">Mobilier</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* type */}
              <Select
                className="w-full"
                onValueChange={(value) => setTypeSociete(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ENTREPRISE_INDIVIDUELLE">
                      Entreprise individuelle
                    </SelectItem>
                    <SelectItem value="SOCIETE_PRIVEE">
                      Société privée
                    </SelectItem>
                    <SelectItem value=" SOCIETE_PUBLIQUE">
                      Société publique
                    </SelectItem>
                    <SelectItem value="COOPERATIVE">Coopérative</SelectItem>
                    <SelectItem value="ASSOCIATION">Association</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePreviousStep}>Précédent</Button>
                <Button onClick={handleNextStep}>Suivant</Button>
              </div>
            </div>
          )}

          {/*  informations de l'admin du compte  */}
          {/* nom-prenom-email */}
          {step === 4 && (
            <div className="space-y-4">
              <Input
                type="text"
                name="firstName"
                placeholder="Votre prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePreviousStep}>Précédent</Button>
                <Button onClick={handleNextStep}>Suivant</Button>
              </div>
            </div>
          )}

          {/* vérification email */}
          {step === 5 && (
            <div className="space-y-4">
              <Label className="text-xl font-bold pb-6 underline">
                Vérification de l&apos;mail
              </Label>
              <Input
                type="text"
                placeholder="Entrez le code de vérification"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePreviousStep}>Précédent</Button>
                <Button onClick={handleNextStep}>Suivant</Button>
              </div>
            </div>
          )}

          {/* numéro et mot de passe  */}
          {step === 6 && (
            <div className="space-y-4">
              <Label className="text-xl font-bold pb-6 underline">
                Informations supplémentaires
              </Label>
              <PhoneInput
                country={"fr"}
                value={phone}
                onChange={(value) => setPhone(value)} // Utilisez `value` au lieu de `e.target.value`
                placeholder="Entrez votre numéro"
                inputStyle={{ width: "100%", height: "40px" }}
                inputClass="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
              />
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-16"
              >
                {isPasswordVisible ? <EyeOff /> : <Eye />}
              </button>
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePreviousStep}>Précédent</Button>
                <Button onClick={handleNextStep}>Suivant</Button>
              </div>
            </div>
          )}

          {/* vérification phone */}
          {step === 7 && (
            <div className="space-y-4">
              <Label className="text-xl font-bold pb-6 underline">
                Vérification du numéro de téléphone
              </Label>
              <Input
                type="text"
                placeholder="Entrez le code de vérification"
                value={verificationCodePhone}
                onChange={(e) => setVerificationCodePhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePreviousStep}>Précédent</Button>
                <Button onClick={handleNextStep}>Suivant</Button>
              </div>
            </div>
          )}

          {/* image du profil */}
          {step === 8 && (
            <div className="space-y-4">
              <Label className="text-xl font-bold pb-6 underline">
                Téléversement des images
              </Label>
              <Input
                type="file"
                accept="image/*"
                id="imageFile"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {selectedImage && (
                <div className="mt-2">
                  <Image
                    src={selectedImage}
                    alt="Selected preview"
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div className="mt-4 flex justify-between">
                <Button onClick={handlePreviousStep}>Précédent</Button>
                <Button onClick={handleSubmit}>Confirmer</Button>
              </div>
            </div>
          )}
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

export default Professionnel;
