"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Fonction asynchrone pour récupérer les détails d'un article par son ID

const ArticleDetailPage = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
        .then((data) => setArticle(data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const nextImage = () => {
    if (article && article.images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === article.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (article && article.images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? article.images.length - 1 : prevIndex - 1
      );
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!article) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="container mx-auto py-10 flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center space-y-5 max-w-4xl">
        <h1 className="text-center text-[36px] text-[#15213D] font-bold pt-5">
          {article.titre}
        </h1>
        <p id="time" className="text-[#2e2f33] text-[20px]">
          {new Date(article.createdAt).toLocaleString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="w-fit h-fit border-[2px] border-blue-950 rounded-[10px] relative overflow-hidden">
          {article.images && article.images.length > 0 ? (
            <>
              <AnimatePresence>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-[800px] h-[400px]"
                >
                  <Image
                    src={article.images[currentIndex].path}
                    width={800}
                    height={400}
                    alt={`Image ${currentIndex + 1} de l'article`}
                    className="rounded-[7px]"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              >
                ▶
              </button>
            </>
          ) : (
            <div className="w-[800px] h-[400px] bg-gray-200 flex items-center justify-center rounded-lg">
              <p>Aucune image disponible</p>
            </div>
          )}
        </div>
        <p className="text-[#353945] font-medium text-[18px] pt-4">
          {article.contenu}
        </p>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
