"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Fonction pour récupérer les détails d'un article
const fetchArticle = async (id) => {
  try {
    const response = await fetch(`/api/blog/${id}`);
    if (!response.ok) {
      throw new Error("Article non trouvé");
    }
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération de l'article:", error);
    throw error;
  }
};

const ArticleDetailPage = ({ params }) => {
  const { id } = params || {}; // Sécurisation en cas d'absence de `params`
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchArticle(id)
        .then((data) => setArticle(data))
        .catch((err) => setError(err.message));
    } else {
      setError("Identifiant de l'article manquant.");
    }
  }, [id]);

  const nextImage = () => {
    if (article?.images?.length) {
      setCurrentIndex((prevIndex) =>
        prevIndex === article.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (article?.images?.length) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? article.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!article) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-screen">
      <div className="space-y-5 max-w-4xl">
        <h1 className="text-center text-3xl font-bold pt-5">{article.titre}</h1>
        <p className="text-gray-500">
          {new Date(article.createdAt).toLocaleString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <div className="relative border rounded-lg overflow-hidden">
          {article.images?.length > 0 ? (
            <>
              <AnimatePresence>
                <motion.div
                  key={article.images[currentIndex]?.path} // Clé stable pour éviter les bugs
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-[400px]"
                >
                  <Image
                    src={article.images[currentIndex]?.path}
                    width={800}
                    height={400}
                    alt={`Image ${currentIndex + 1}`}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={prevImage}
                aria-label="Image précédente"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                aria-label="Image suivante"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                ▶
              </button>
            </>
          ) : (
            <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center">
              <p>Aucune image disponible</p>
            </div>
          )}
        </div>

        <div
          className="text-[#353945] font-medium text-[18px] pt-4"
          dangerouslySetInnerHTML={{
            __html:
              article.contenu.replace(/^"|"$/g, "") ||
              "<p>Contenu non disponible.</p>",
          }}
        />
      </div>
    </div>
  );
};

export default ArticleDetailPage;
