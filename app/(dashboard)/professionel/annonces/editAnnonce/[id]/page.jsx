"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";

const ArticleDetailPageModif = ({ params }) => {
  const { id } = params;
  const { data: session, status } = useSession();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    category: "",
    localisation: "",
    adresse: "",
    files: [],
  });
  const [contenu, setContenu] = useState({});
  const [iframeSrc, setIframeSrc] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const fetchArticle = async (id) => {
    try {
      const response = await fetch(`/api/annonce/${id}`);
      if (!response.ok) {
        throw new Error("Annonce non trouvée");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'annonce:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle(id)
        .then((data) => {
          setArticle(data);
          setFormData({
            titre: data.titre,
            description: data.description ? JSON.parse(data.description) : {},
            category: data.categorieAnnonce,
            localisation: data.localisation,
            adresse: data.adresse,
            files: [],
          });
          setContenu(data.description ? JSON.parse(data.description) : {});
          setIframeSrc(data.localisation || ""); // Charger l'iframe si localisation existante
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handleLocalisationChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, localisation: value }));
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    const statut = "DESACTIVEE";
    formDataToSend.append("titre", formData.titre);
    formDataToSend.append("description", JSON.stringify(contenu));
    formDataToSend.append("categorieAnnonce", formData.category);
    formDataToSend.append("localisation", formData.localisation);
    formDataToSend.append("statut", statut);
    formDataToSend.append("userId", session.user.id);
    formDataToSend.append("adresse", formData.adresse);
    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const response = await fetch(`/api/annonce/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'annonce");
      }
      alert("Annonce mise à jour !");
      router.push(`/professionel/annonces/${id}`);
    } catch (error) {
      console.error("Erreur de mise à jour:", error);
      alert("Erreur lors de la mise à jour.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!article) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-5">Modifier l&apos;annonce</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4">
          <label
            htmlFor="titre"
            className="block text-lg font-medium text-gray-700"
          >
            Titre de l&apos;annonce
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="category">Catégorie:</Label>
          <Select
            className="w-full"
            value={formData.category}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, category: value }))
            }
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
                  Matériels / Équipements
                </SelectItem>
                <SelectItem value="MOBILIER">Mobilier</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Description de l&apos;annonce
          </label>
          <RichTextEditor
            content={contenu}
            onChange={(json) => setContenu(json)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="localisation"
            className="block text-lg font-medium text-gray-700"
          >
            Localisation de l&apos;annonce (URL iframe)
          </label>
          <input
            type="text"
            id="localisation"
            name="localisation"
            value={formData.localisation}
            onChange={handleLocalisationChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.localisation && (
            <p className="text-red-500 text-sm mt-1">{errors.localisation}</p>
          )}
        </div>

        {iframeSrc && (
          <div className="mt-4">
            <iframe
              src={iframeSrc}
              width="1200"
              height="500"
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              title="Localisation"
              className="w-full"
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="adresse"
            className="block text-lg font-medium text-gray-700"
          >
            Adresse de l&apos;annonce
          </label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            value={formData.adresse}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="files"
            className="block text-lg font-medium text-gray-700"
          >
            Images de l&apos;annonce
          </label>
          <input
            type="file"
            id="files"
            name="files"
            multiple
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex space-x-2 mt-4">
          {formData.files.map((file, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(file)}
                width={200}
                height={200}
                alt={`Prévisualisation de l'image ${index + 1}`}
                className="h-20 w-20 object-cover border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-700 rounded-full p-1"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
        </div>

        <div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Mettre à jour l&apos;annonce
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleDetailPageModif;
