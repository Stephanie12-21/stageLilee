// "use client";

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { z } from "zod";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Alert } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";
// import Image from "next/image";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useRouter } from "next/navigation";
// import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";

// // Schéma de validation Zod
// const annonceSchema = z.object({
//   title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
//   description: z
//     .string()
//     .min(10, "La description doit contenir au moins 10 caractères"),
//   images: z.array(z.instanceof(File)).optional(),
//   category: z.string().min(1, "La catégorie d'activité est requis."),
//   localisation: z.string().min(1, "La localisation est requise."),
//   adresse: z.string().min(1, "L'adresse est requise."),
// });

// const AddAnnonce = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState({});
//   const [images, setImages] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [localisation, setLocalisation] = useState("");
//   const [adresse, setAdresse] = useState("");
//   const [iframeSrc, setIframeSrc] = useState("");

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       router.push("/login");
//     }
//   }, [status, router]);

//   const resetForm = () => {
//     setTitle("");
//     setDescription("");
//     setCategory("");
//     setLocalisation("");
//     setAdresse("");
//     setImages([]);
//     setIframeSrc("");
//     setErrors({});
//   };

//   const handleLocalisationChange = (e) => {
//     const value = e.target.value;
//     setLocalisation(value);
//     const regex = /https:\/\/www\.google\.com\/maps\/embed\?pb=([^&]+)/;
//     const match = value.match(regex);

//     if (match) {
//       setIframeSrc(value);
//       setErrors((prevErrors) => ({ ...prevErrors, localisation: undefined }));
//     } else {
//       setIframeSrc("");
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         localisation: "Veuillez entrer un lien valide d'iframe Google Maps.",
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const selectedImages = Array.from(e.target.files);
//     setImages((prevImages) => [...prevImages, ...selectedImages]);
//   };

//   const handleRemoveImage = (index) => {
//     setImages(images.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (
//       !title ||
//       !description ||
//       !category ||
//       !localisation ||
//       !adresse ||
//       images.length === 0
//     ) {
//       alert(
//         "Tous les champs doivent être remplis et au moins une image doit être uploadée."
//       );
//       return;
//     }
//     const statut = "DESACTIVEE";
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", JSON.stringify(description));
//     formData.append("category", category);
//     formData.append("adresse", adresse);
//     formData.append("localisation", localisation);
//     formData.append("statut", statut);
//     formData.append("userId", session?.user.id);

//     if (images.length > 0) {
//       images.forEach((image) => {
//         formData.append("images", image);
//       });
//     }

//     try {
//       const response = await fetch("/api/annonce/", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Erreur lors de l'ajout de l'annonce");
//       }

//       const result = await response.json();
//       toast.success("Annonce ajoutée avec succès !");
//       router.push(`/professionel/annonces/`);
//       resetForm();
//     } catch (error) {
//       console.error("Erreur :", error);
//       toast.error("Une erreur est survenue lors de l'ajout de l'annonce.");
//     }
//   };

//   if (status === "loading") {
//     return <div>Chargement...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="font-bold text-3xl">
//         Ajouter une Annonce par l&apos;utilisateur:{""} {session?.user.nom}{" "}
//         <br />
//         avec l&apos;ID:{""} {session?.user.id}
//       </h1>
//       <div className="flex flex-col space-y-4  w-full">
//         {/* titre */}
//         <div className="space-y-3">
//           <Label htmlFor="title">Titre:</Label>
//           <Input
//             type="text"
//             id="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             error={errors.title}
//           />
//           {errors.title && <Alert variant="error">{errors.title}</Alert>}
//         </div>

//         {/* catégorie */}
//         <div className="space-y-3">
//           <Label htmlFor="category">Catégorie:</Label>
//           <Select
//             className="w-full"
//             onValueChange={(value) => setCategory(value)}
//           >
//             <SelectTrigger className="w-full px-4">
//               <SelectValue
//                 placeholder=" Sélectionner une catégorie"
//                 className="flex items-start"
//               />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="IMMOBILIER">Immobilier</SelectItem>
//                 <SelectItem value="VETEMENT">Vêtements</SelectItem>
//                 <SelectItem value="EMPLOI">Emplois / Recrutement</SelectItem>
//                 <SelectItem value="SERVICE">Services</SelectItem>
//                 <SelectItem value="VOITURE">Voitures</SelectItem>
//                 <SelectItem value="LOISIR">Loisir</SelectItem>
//                 <SelectItem value="MATERIEL">
//                   Matériels / Equipements
//                 </SelectItem>
//                 <SelectItem value="MOBILIER">Mobilier</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           {errors.category && <Alert variant="error">{errors.category}</Alert>}
//         </div>

//         {/* description */}
//         <div className="space-y-3">
//           <Label htmlFor="description">Description:</Label>

//           <RichTextEditor
//             content={description}
//             onChange={(json) => setDescription(json)} // L'éditeur retourne maintenant un objet JSON
//           />
//           {errors.description && (
//             <Alert variant="error">{errors.description}</Alert>
//           )}
//         </div>

//         {/*ADRESSE*/}
//         <div className="space-y-3">
//           <Label htmlFor="adresse">Adresse exacte:</Label>
//           <Input
//             type="text"
//             id="adresse"
//             value={adresse}
//             onChange={(e) => setAdresse(e.target.value)}
//             required
//             error={errors.adresse}
//           />
//           {errors.adresse && <Alert variant="error">{errors.adresse}</Alert>}
//         </div>

//         {/*  Localisation  */}
//         <div className="space-y-3">
//           <Label htmlFor="localisation">
//             Localisation ( prendre uniquement la source de l&apos;iframe Google
//             Maps):
//           </Label>
//           <Input
//             type="text"
//             id="localisation"
//             value={localisation}
//             onChange={handleLocalisationChange}
//             required
//             error={errors.localisation}
//           />
//           {errors.localisation && (
//             <Alert variant="error">{errors.localisation}</Alert>
//           )}
//           {/* Affichage de l'iframe Google Maps */}
//           {iframeSrc && (
//             <iframe
//               src={iframeSrc}
//               width="1200"
//               height="500"
//               style={{ border: "0", marginTop: "10px" }}
//               allowFullScreen
//               loading="lazy"
//               title="Localisation"
//               className="items-center"
//             />
//           )}
//         </div>

//         {/* image */}
//         <div className="space-y-3">
//           <Label htmlFor="images">Images:</Label>
//           <Input
//             type="file"
//             id="images"
//             onChange={handleImageChange}
//             accept="image/*"
//             multiple
//           />
//           <div className="flex space-x-4 mt-4">
//             {images.map((image, index) => (
//               <div key={index} className="relative">
//                 <Image
//                   src={URL.createObjectURL(image)}
//                   alt={`preview-${index}`}
//                   width={200}
//                   height={200}
//                   className="w-32 h-32 object-cover rounded"
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   onClick={() => handleRemoveImage(index)}
//                 >
//                   <X size={16} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <Button onClick={handleSubmit}>Ajouter l&apos;annonce</Button>
//       </div>

//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//       />
//     </div>
//   );
// };

// export default AddAnnonce;

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Progress } from "@/components/ui/progress";
import { MapPin, FileText, ImagePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Alert } from "@/components/ui/alert";
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";
import Image from "next/image";

export default function Component() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    titre: "",
    categorie: "",
    sousCategorie: "",
    adresse: "",
    localisation: "",
    description: "",
    images: null,
  });
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [description, setDescription] = useState({});
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const sousCategoriesMap = {
    IMMOBILIER: [
      "Appartements",
      "Camping",
      "Chambres d'hôtes",
      "Hôtel",
      "Logements insolites",
      "Maison",
    ],
    VETEMENT: ["Femme", "Homme", "Enfant"],
    VOITURE: ["Équipée d'une rampe", "Conduite adaptée"],
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setLocalisation("");
    setAdresse("");
    setImages([]);
    setIframeSrc("");
    setErrors({});
  };

  const handleLocalisationChange = (e) => {
    const value = e.target.value;
    setLocalisation(value);
    const regex = /https:\/\/www\.google\.com\/maps\/embed\?pb=([^&]+)/;
    const match = value.match(regex);

    if (match) {
      setIframeSrc(value);
      setErrors((prevErrors) => ({ ...prevErrors, localisation: undefined }));
    } else {
      setIframeSrc("");
      setErrors((prevErrors) => ({
        ...prevErrors,
        localisation: "Veuillez entrer un lien valide d'iframe Google Maps.",
      }));
    }
  };

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...selectedImages]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 10) {
      setIsAlertOpen(true);
      return;
    }

    if (
      !title ||
      !description ||
      !category ||
      !subcategory ||
      !localisation ||
      !adresse ||
      images.length === 0
    ) {
      alert(
        "Tous les champs doivent être remplis et au moins une image doit être uploadée."
      );
      return;
    }
    const statut = "EN_ATTENTE_DE_VALIDATION";
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", JSON.stringify(description));
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("adresse", adresse);
    formData.append("localisation", localisation);
    formData.append("statut", statut);
    formData.append("userId", session?.user.id);

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const response = await fetch("/api/annonce/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'annonce");
      }

      const result = await response.json();
      toast.success("Annonce ajoutée avec succès !");
      router.push(`/professionel/annonces/`);
      resetForm();
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Une erreur est survenue lors de l'ajout de l'annonce.");
    }
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const hasPredefinedSousCategories =
    sousCategoriesMap[formData.categorie] !== undefined;
  const sousCategories = sousCategoriesMap[formData.categorie] || [];

  const steps = [
    { icon: FileText, title: "Informations" },
    { icon: MapPin, title: "Localisation" },
    { icon: FileText, title: "Description" },
    { icon: ImagePlus, title: "Images" },
  ];

  if (status === "loading") {
    return <div>Chargement...</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardHeader className="space-y-6 pb-8">
          <CardTitle className="text-2xl font-bold text-center">
            Ajouter une Annonce
            <div>
              <h1 className="font-bold text-3xl">
                Ajouter une Annonce par l&apos;utilisateur:{""}{" "}
                {session?.user.nom} <br />
                avec l&apos;ID:{""} {session?.user.id}
              </h1>
            </div>
          </CardTitle>

          <div className="space-y-4">
            <Progress value={(step / 4) * 100} className="w-full h-2" />

            <div className="flex justify-between">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center space-y-2 ${
                    i + 1 === step ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      i + 1 === step ? "bg-primary/10" : "bg-gray-100"
                    }`}
                  >
                    <s.icon
                      className={`w-5 h-5 ${
                        i + 1 === step ? "text-primary" : "text-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-medium">{s.title}</span>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 1 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-2">
                <Label htmlFor="titre" className="text-sm font-medium">
                  Titre de l&apos;annonce
                </Label>
                <Input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  error={errors.title}
                />
                {errors.title && <Alert variant="error">{errors.title}</Alert>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categorie" className="text-sm font-medium">
                  Catégorie
                </Label>
                <Select
                  name="categorie"
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="IMMOBILIER">Immobilier</SelectItem>
                      <SelectItem value="VETEMENT">Vêtements</SelectItem>
                      <SelectItem value="EMPLOI_SERVICE">
                        Emplois / Recrutement / Services
                      </SelectItem>
                      <SelectItem value="VOITURE">Voitures</SelectItem>
                      <SelectItem value="LOISIR">Loisir</SelectItem>
                      <SelectItem value="MATERIEL">
                        Matériels / Equipements
                      </SelectItem>
                      <SelectItem value="MOBILIER">Mobilier</SelectItem>
                      <SelectItem value="DONS">Dons</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sousCategorie" className="text-sm font-medium">
                  Sous-catégorie
                </Label>
                {hasPredefinedSousCategories ? (
                  <Select
                    name="sousCategorie"
                    value={subcategory}
                    onValueChange={(value) => setSubCategory(value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez une sous-catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {sousCategories.map((subcategory, index) => (
                        <SelectItem key={index} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="sousCategorie"
                    name="sousCategorie"
                    value={subcategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="h-12"
                    placeholder="Entrez une sous-catégorie"
                    required
                  />
                )}
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 2 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-2">
                <Label htmlFor="adresse" className="text-sm font-medium">
                  Adresse complète
                </Label>
                <Input
                  type="text"
                  id="adresse"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                  error={errors.adresse}
                />
                {errors.adresse && (
                  <Alert variant="error">{errors.adresse}</Alert>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="localisation" className="text-sm font-medium">
                  Localisation par google map
                </Label>
                <Input
                  type="text"
                  id="localisation"
                  value={localisation}
                  onChange={handleLocalisationChange}
                  required
                  error={errors.localisation}
                />
                {errors.localisation && (
                  <Alert variant="error">{errors.localisation}</Alert>
                )}
                {/* Affichage de l'iframe Google Maps */}
                {iframeSrc && (
                  <iframe
                    src={iframeSrc}
                    width="650"
                    height="500"
                    style={{ border: "0", marginTop: "10px" }}
                    allowFullScreen
                    loading="lazy"
                    title="Localisation"
                    className="items-center px-5 justify-center"
                  />
                )}
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 3 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description détaillée
                </Label>
                <RichTextEditor
                  content={description}
                  onChange={(json) => setDescription(json)} // L'éditeur retourne maintenant un objet JSON
                />
                {errors.description && (
                  <Alert variant="error">{errors.description}</Alert>
                )}
              </div>
            </div>

            <div
              className={`space-y-6 transition-all duration-300 ${
                step === 4 ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="space-y-6">
                <Label
                  htmlFor="images"
                  className="text-lg font-semibold text-gray-700"
                >
                  {" "}
                  Images{" "}
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                  <Input
                    type="file"
                    id="images"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <div className="flex justify-center space-x-6 mt-6">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <Image
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          width={200}
                          height={200}
                          className="w-40 h-40 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 group-hover:block hidden"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Label
                    htmlFor="images"
                    className="cursor-pointer mt-4 flex flex-col items-center text-center"
                  >
                    <ImagePlus className="mx-auto h-14 w-14 text-gray-400 transition-all duration-200 hover:text-gray-600" />
                    <span className="mt-2 text-sm font-medium text-gray-600">
                      {" "}
                      Cliquez pour ajouter des images{" "}
                    </span>
                    <span className="mt-1 text-xs text-gray-500">
                      {" "}
                      PNG, JPG jusqu&apos;à 10MB{" "}
                    </span>
                  </Label>
                </div>
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-between pt-6">
          {step > 1 && (
            <Button onClick={handlePrevious} variant="outline" className="w-32">
              Précédent
            </Button>
          )}
          <div className="flex-1" />
          {step < 4 ? (
            <Button onClick={handleNext} className="w-32">
              Suivant
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="w-32">
              Publier
            </Button>
          )}
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
}
