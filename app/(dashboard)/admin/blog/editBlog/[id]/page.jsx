"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X } from "lucide-react"; // Importation de l'icône X
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";

const ArticleDetailPageModif = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "", // Utilisé uniquement pour affichage initial
    categorieArticle: "",
    files: [],
  });
  const [contenu, setContenu] = useState({}); // Stocker le contenu en JSON
  const router = useRouter();

  const fetchArticle = async (id) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        throw new Error("Article non trouvé");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article:", error);
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
            contenu: data.contenu, // Afficher le contenu initial
            categorieArticle: data.categorieArticle,
            files: [],
          });
          setContenu(data.contenu ? JSON.parse(data.contenu) : {}); // Charger le JSON si existant
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)], // Ajouter les nouveaux fichiers
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
    formDataToSend.append("titre", formData.titre);
    formDataToSend.append("contenu", JSON.stringify(contenu)); // Convertir en JSON
    formDataToSend.append("categorieArticle", formData.categorieArticle);
    formData.files.forEach((file) => {
      formDataToSend.append("files", file); // Ajouter chaque image au FormData
    });

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'article");
      }
      alert("Article mis à jour !");
      router.push(`/admin/blog/${id}`);
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
      <h1 className="text-3xl font-bold mb-5">Modifier l&apos;article</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mb-4">
          <label
            htmlFor="titre"
            className="block text-lg font-medium text-gray-700"
          >
            Titre de l&apos;article
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

        <div className="mb-4">
          <label
            htmlFor="categorieArticle"
            className="block text-lg font-medium text-gray-700"
          >
            Catégorie de l&apos;article
          </label>
          <input
            type="text"
            id="categorieArticle"
            name="categorieArticle"
            value={formData.categorieArticle}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="contenu"
            className="block text-lg font-medium text-gray-700"
          >
            Contenu de l&apos;article
          </label>
          <RichTextEditor
            content={contenu}
            onChange={(json) => setContenu(json)} // L'éditeur retourne un JSON
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="files"
            className="block text-lg font-medium text-gray-700"
          >
            Images de l&apos;article
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
            Mettre à jour l&apos;article
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArticleDetailPageModif;
