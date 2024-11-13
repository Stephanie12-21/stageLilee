"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";

// Schéma de validation Zod
const annonceSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères"),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  images: z.array(z.instanceof(File)).optional(),
  category: z.string().min(1, "La catégorie d'activité est requise."),
  localisation: z.string().min(1, "La localisation est requise."),
  adresse: z.string().min(1, "L'adresse est requise."),
});

const EditAnnonce = ({ params }) => {
  const { id } = params;
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Appel API pour récupérer les données de l'annonce
    async function fetchAnnonce() {
      try {
        const response = await fetch(`/api/annonce/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Données reçues par l'API :", data);
          setTitle(data.titre);
          setCategory(data.categorieAnnonce); // Préremplit la catégorie
          setDescription(data.description);
          setAdresse(data.adresse);
          setLocalisation(data.localisation);
          //setImages(data.imageAnnonces);
          if (data.localisation) setIframeSrc(data.localisation);
        } else {
          console.error("Annonce non trouvée");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    }
    fetchAnnonce();
  }, [id]);

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
    console.log("Valeur de localisation:", value);
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

    if (
      !title ||
      !description ||
      !category ||
      !localisation ||
      !adresse ||
      images.length === 0
    ) {
      alert(
        "Tous les champs doivent être remplis et au moins une image doit être uploadée."
      );
      return;
    }
    const statut = "DESACTIVEE";
    const formData = new FormData();
    formData.append("titre", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("adresse", adresse);
    formData.append("localisation", localisation);
    formData.append("statut", statut);
    formData.append("userId", session.user.id);

    if (images.length > 0) {
      images.forEach((image) => {
        formData.append("images", image);
      });
    }

    console.log("Données valides :", {
      title,
      description,
      category,
      localisation,
      adresse,
      images,
    });

    try {
      const response = await fetch(`/api/annonce/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'annonce");
      }

      const result = await response.json();
      console.log("Réponse du serveur :", result);
      toast.success("Annonce mise à jout avec succès !");
      resetForm();
      router.push("/personnel/annonces/");
    } catch (error) {
      console.error("Erreur :", error);
      toast.error(
        "Une erreur est survenue lors de la mise à jour de l'annonce."
      );
    }
  };

  const handleCancel = () => {
    router.push("/personnel/annonces/");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="font-bold text-3xl">
        Modifier une Annonce par l&apos;utilisateur : {session?.user.nom} <br />
        avec l&apos;ID : {session?.user.id}
      </h1>
      <div className="flex flex-col space-y-4 w-full">
        {/* titre */}
        <div>
          <Label htmlFor="title">Titre:</Label>
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

        {/* catégorie */}
        <div>
          <Label htmlFor="category">Catégorie:</Label>
          <Select
            className="w-full"
            value={category} // Assurez-vous que la valeur est liée à l'état
            onValueChange={(value) => setCategory(value)}
          >
            <SelectTrigger className="w-full px-4">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="IMMOBILIER">Immobilier</SelectItem>
                <SelectItem value="VETEMENT">Vêtements</SelectItem>
                <SelectItem value="EMPLOI">Emplois / Recrutement</SelectItem>
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
          {errors.category && <Alert variant="error">{errors.category}</Alert>}
        </div>

        {/* description */}
        <div>
          <Label htmlFor="description">Description:</Label>
          <Textarea
            id="description"
            placeholder="Décrivez ici toutes les informations pertinentes concernant l'objet de votre annonce."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            error={errors.description}
          />
          {errors.description && (
            <Alert variant="error">{errors.description}</Alert>
          )}
        </div>

        {/* ADRESSE */}
        <div>
          <Label htmlFor="adresse">Adresse exacte:</Label>
          <Input
            type="text"
            id="adresse"
            value={adresse}
            onChange={(e) => setAdresse(e.target.value)}
            required
            error={errors.adresse}
          />
          {errors.adresse && <Alert variant="error">{errors.adresse}</Alert>}
        </div>

        {/* Localisation */}
        <div>
          <Label htmlFor="localisation">
            Localisation (prendre uniquement la source de l&apos;iframe Google
            Maps):
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
        </div>

        {/* Affichage de l'iframe Google Maps */}
        {iframeSrc && (
          <iframe
            src={iframeSrc}
            width="1200"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}

        <div>
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

        <Button onClick={handleSubmit}>Modifier l&apos;annonce</Button>
        <Button onClick={handleCancel}>Annuler les modifications</Button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default EditAnnonce;
