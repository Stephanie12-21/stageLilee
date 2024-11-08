"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InfoBlog = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchArticle = async (articleId) => {
      try {
        const response = await fetch(`/api/blog/${articleId}`);
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError("Erreur lors de la récupération de l'article.");
        console.error(err);
      }
    };

    if (id) {
      fetchArticle(id);
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
    <div className="container mx-auto py-10 px-4 sm:px-8 lg:px-16">
      <div className="flex flex-col items-center justify-center space-y-5">
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

        {article.images && article.images.length > 0 ? (
          <div className="relative w-full max-w-3xl">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full h-auto"
              >
                <Image
                  src={article.images[currentIndex].path}
                  layout="responsive"
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
          </div>
        ) : (
          <div className="w-full max-w-3xl bg-gray-200 flex items-center justify-center rounded-lg">
            <p>Aucune image disponible</p>
          </div>
        )}

        <div className="max-w-3xl w-full mx-auto pt-20 px-2 sm:px-8 space-y-4">
          {article.contenu}
        </div>

        <div className="pt-20">
          <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
            <Link href="/Blog">
              <Button className="py-4 px-5 text-[17px] rounded-[10px]">
                Charger d&apos;autres articles
                <FaArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBlog;
