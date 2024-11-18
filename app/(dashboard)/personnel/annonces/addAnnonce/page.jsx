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
//     const statut = "PUBLIEE";
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
//       router.push(`/admin/annonces/`);
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

// {/* description */}
// <div className="space-y-3">
//   <Label htmlFor="description">Description:</Label>

//   <RichTextEditor
//     content={description}
//     onChange={(json) => setDescription(json)} // L'éditeur retourne maintenant un objet JSON
//   />
//   {errors.description && (
//     <Alert variant="error">{errors.description}</Alert>
//   )}
// </div>

// {/*ADRESSE*/}
// <div className="space-y-3">
//   <Label htmlFor="adresse">Adresse exacte:</Label>
//   <Input
//     type="text"
//     id="adresse"
//     value={adresse}
//     onChange={(e) => setAdresse(e.target.value)}
//     required
//     error={errors.adresse}
//   />
//   {errors.adresse && <Alert variant="error">{errors.adresse}</Alert>}
// </div>

// {/*  Localisation  */}
// <div className="space-y-3">
//   <Label htmlFor="localisation">
//     Localisation ( prendre uniquement la source de l&apos;iframe Google
//     Maps):
//   </Label>
//   <Input
//     type="text"
//     id="localisation"
//     value={localisation}
//     onChange={handleLocalisationChange}
//     required
//     error={errors.localisation}
//   />
//   {errors.localisation && (
//     <Alert variant="error">{errors.localisation}</Alert>
//   )}
//   {/* Affichage de l'iframe Google Maps */}
//   {iframeSrc && (
//     <iframe
//       src={iframeSrc}
//       width="1200"
//       height="500"
//       style={{ border: "0", marginTop: "10px" }}
//       allowFullScreen
//       loading="lazy"
//       title="Localisation"
//       className="items-center"
//     />
//   )}
// </div>

// {/* image */}
// <div className="space-y-3">
//   <Label htmlFor="images">Images:</Label>
//   <Input
//     type="file"
//     id="images"
//     onChange={handleImageChange}
//     accept="image/*"
//     multiple
//   />
//   <div className="flex space-x-4 mt-4">
//     {images.map((image, index) => (
//       <div key={index} className="relative">
//         <Image
//           src={URL.createObjectURL(image)}
//           alt={`preview-${index}`}
//           width={200}
//           height={200}
//           className="w-32 h-32 object-cover rounded"
//         />
//         <button
//           type="button"
//           className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//           onClick={() => handleRemoveImage(index)}
//         >
//           <X size={16} />
//         </button>
//       </div>
//     ))}
//   </div>
// </div>
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
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog"; // Importez les composants Dialog

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
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // État pour contrôler l'ouverture du Dialog
//   const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
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

//     if (images.length + selectedImages.length > 10) {
//       // Afficher le Dialog si la limite est dépassée
//       setIsDialogOpen(true);
//       return;
//     }

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
//       toast.error(
//         "Tous les champs doivent être remplis et au moins une image doit être uploadée."
//       );
//       return;
//     }

//     const statut = "PUBLIEE";
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
//       router.push(`/personnel/annonces/`);
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
//         Ajouter une Annonce par l&apos;utilisateur : {session?.user.nom}
//         <br />
//         avec l&apos;ID : {session?.user.id}
//       </h1>
//       <div className="flex flex-col space-y-4 w-full">
//         {/* Titre */}
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

//         {/* Catégorie */}
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
//                   Matériels / Équipements
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

//         {/* Bouton d'ajout */}
//         <Button onClick={handleSubmit}>Ajouter l&apos;annonce</Button>
//       </div>

//       {/* Dialog */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Limite de téléchargement atteinte</DialogTitle>
//           </DialogHeader>
//           <p>
//             Vous avez dépassé la limite de 10 images. Un paiement est requis
//             pour continuer.
//           </p>
//           <DialogFooter>
//             <Button
//               onClick={() => {
//                 // Fermer le premier dialogue, puis ouvrir le second avec un délai
//                 setIsDialogOpen(false);
//                 setTimeout(() => setIsPaymentDialogOpen(true), 0); // Assure que le second dialogue s'ouvre après le premier
//               }}
//             >
//               Compris
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
//         <DialogContent className="sm:max-w-[440px] p-6">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//               <label className="block text-sm text-gray-700">E-mail</label>
//               <Input
//                 type="email"
//                 placeholder="isabelle.martin@exemple.fr"
//                 className="w-full rounded-md border-gray-300"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm text-gray-700">
//                 Informations de la carte
//               </label>
//               <div className="relative">
//                 <Input
//                   type="text"
//                   placeholder="4242 4242 4242 4242"
//                   className="w-full rounded-md border-gray-300"
//                 />
//                 <img
//                   src="/api/placeholder/24/16"
//                   alt="visa"
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-3">
//                 <Input
//                   type="text"
//                   placeholder="12/24"
//                   className="rounded-md border-gray-300"
//                 />
//                 <div className="relative">
//                   <Input
//                     type="text"
//                     placeholder="123"
//                     className="rounded-md border-gray-300"
//                   />
//                   <img
//                     src="/api/placeholder/16/16"
//                     alt="cvc"
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 opacity-70"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm text-gray-700">
//                 Nom du titulaire de la carte
//               </label>
//               <Input
//                 type="text"
//                 placeholder="Isabelle Martin"
//                 className="w-full rounded-md border-gray-300"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm text-gray-700">
//                 Pays ou région
//               </label>
//               <Select defaultValue="FR">
//                 <SelectTrigger className="w-full rounded-md border-gray-300">
//                   <SelectValue>France</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="FR">France</SelectItem>
//                   <SelectItem value="BE">Belgique</SelectItem>
//                   <SelectItem value="CH">Suisse</SelectItem>
//                   <SelectItem value="LU">Luxembourg</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-[#1a2e44] hover:bg-[#15243a] text-white py-6 rounded-md"
//             >
//               Payer 55,00 €
//             </Button>
//           </form>
//         </DialogContent>
//       </Dialog>

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

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";
import { Button } from "@/components/ui/button";

// Schéma de validation Zod
const annonceSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  images: z.array(z.instanceof(File)).optional(),
  category: z.string().min(1, "La catégorie d'activité est requis."),
  localisation: z.string().min(1, "La localisation est requise."),
  adresse: z.string().min(1, "L'adresse est requise."),
});

const AddAnnonce = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState({});
  const [images, setImages] = useState([]);
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [step, setStep] = useState(1); // Suivi de l'étape du formulaire

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleLocalisationChange = (e) => {
    const value = e.target.value;
    setLocalisation(value);
    const regex = /https:\/\/www\.google\.com\/maps\/embed\?pb=([^&]+)/;
    const match = value.match(regex);

    if (match) {
      setIframeSrc(value);
    } else {
      setIframeSrc("");
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

    if (step === 1) {
      if (!title || !description || !category) {
        toast.error("Tous les champs de l'étape 1 doivent être remplis.");
        return;
      }
      setStep(2); // Passer à l'étape 2
    } else if (step === 2) {
      if (!localisation || !adresse) {
        toast.error("Tous les champs de l'étape 2 doivent être remplis.");
        return;
      }
      setStep(3); // Passer à l'étape 3 (photos)
    } else if (step === 3) {
      if (images.length === 0) {
        toast.error("Il faut ajouter au moins une image.");
        return;
      }

      const statut = "PUBLIEE";
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", JSON.stringify(description));
      formData.append("category", category);
      formData.append("adresse", adresse);
      formData.append("localisation", localisation);
      formData.append("statut", statut);
      formData.append("userId", session?.user.id);

      images.forEach((image) => {
        formData.append("images", image);
      });

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
        router.push(`/admin/annonces/`);
      } catch (error) {
        console.error("Erreur :", error);
        toast.error("Une erreur est survenue lors de l'ajout de l'annonce.");
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="font-bold text-3xl">Ajouter une Annonce</h1>
      <div className="flex flex-col space-y-4 w-full">
        {/* Étape 1: Titre et Description */}
        {step === 1 && (
          <>
            <div className="space-y-3">
              <Label htmlFor="title">Titre:</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="description">Description:</Label>
              <RichTextEditor
                content={description}
                onChange={(json) => setDescription(json)} // L'éditeur retourne maintenant un objet JSON
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category">Catégorie:</Label>
              <Select
                className="w-full"
                onValueChange={(value) => setCategory(value)}
              >
                <SelectTrigger className="w-full px-4">
                  <SelectValue placeholder="Sélectionner une catégorie" />
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
            </div>

            <Button onClick={handleSubmit}>
              Passer à l&apos;étape suivante
            </Button>
          </>
        )}

        {/* Étape 2: Localisation et Adresse */}
        {step === 2 && (
          <>
            <div className="space-y-3">
              <Label htmlFor="adresse">Adresse exacte:</Label>
              <Input
                type="text"
                id="adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="localisation">
                Localisation (iframe Google Maps):
              </Label>
              <Input
                type="text"
                id="localisation"
                value={localisation}
                onChange={handleLocalisationChange}
                required
              />
              {iframeSrc && (
                <iframe
                  src={iframeSrc}
                  width="1200"
                  height="500"
                  style={{ border: "0", marginTop: "10px" }}
                  allowFullScreen
                  loading="lazy"
                  title="Localisation"
                />
              )}
            </div>

            <Button onClick={handleSubmit}>
              Passer à l&apos;étape suivante
            </Button>
          </>
        )}

        {/* Étape 3: Sélection des images et paiement si nécessaire */}
        {step === 3 && (
          <>
            <div className="space-y-3">
              <Label htmlFor="images">Images:</Label>
              <Input
                type="file"
                id="images"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
              <div className="flex space-x-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`preview-${index}`}
                      width={200}
                      height={200}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {images.length > 10 && (
              <div className="mt-4">
                <p>
                  Vous avez ajouté plus de 10 images. Un paiement est nécessaire
                  pour publier cette annonce.
                </p>
                {/* Formulaire de paiement ici */}
              </div>
            )}

            <Button onClick={handleSubmit}>Soumettre l&apos;annonce</Button>
          </>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default AddAnnonce;
