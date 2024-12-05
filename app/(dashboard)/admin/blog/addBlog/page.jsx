"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import RichTextEditor from "@/components/MainComponent/TextEditor/RichEditor";
import { useRouter } from "next/navigation";

const ArticleForm = () => {
  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState({});
  const [categorieArticle, setCategorieArticle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const router = useRouter();
  const handleImageUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeImage = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre || !contenu || !categorieArticle) {
      alert("Tous les champs doivent être remplis ");
      return;
    }

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("contenu", JSON.stringify(contenu));
    formData.append("categorieArticle", categorieArticle);
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Article publié avec succès !");

        setTitre("");
        setContenu({});
        setCategorieArticle("");
        setImageFiles([]);
        router.push("/admin/blog");
      } else {
        alert(result.message || "Erreur lors de la publication de l'article.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Erreur interne du serveur.");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Créer un nouvel article</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="titre"
              className="block text-sm font-medium text-gray-700"
            >
              Titre
            </label>
            <Input
              type="text"
              id="titre"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="contenu"
              className="block text-sm font-medium text-gray-700"
            >
              Contenu
            </label>
            <RichTextEditor
              content={contenu}
              onChange={(json) => setContenu(json)}
            />
          </div>

          <div>
            <label
              htmlFor="categorieArticle"
              className="block text-sm font-medium text-gray-700"
            >
              Catégorie
            </label>
            <Input
              type="text"
              id="categorieArticle"
              value={categorieArticle}
              onChange={(e) => setCategorieArticle(e.target.value)}
              required
              className="mt-1"
            />
          </div>

          <div>
            <label
              htmlFor="imageFiles"
              className="block text-sm font-medium text-gray-700"
            >
              Choisir des images
            </label>
            <Input
              type="file"
              id="imageFiles"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="mt-1"
            />
          </div>

          {imageFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Images sélectionnées :
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {imageFiles.map((file, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-40 object-cover rounded"
                    />
                    <Button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full">
            Publier l&apos;article
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleForm;
