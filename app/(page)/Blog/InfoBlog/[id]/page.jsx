"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const InfoBlog = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchArticle = async (articleId) => {
      try {
        const response = await fetch(`/api/blog/${articleId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de l'article.");
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    if (id) {
      fetchArticle(id);
    }
  }, [id]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!article || !article.images || article.images.length === 0) return;

      if (event.key === "Escape") {
        setLightboxOpen(false);
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % article.images.length);
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? article.images.length - 1 : prevIndex - 1
        );
      }
    };

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, article]);

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-8 lg:px-16">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <p className="text-red-500 text-center">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-10 px-4 sm:px-8 lg:px-16">
        <Card>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <Skeleton className="h-96 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const images = article.images || [];

  return (
    <div className="container mx-auto py-10 px-4 sm:px-8 lg:px-16">
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-10 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-primary font-bold text-center">
              {article.titre}
            </h1>
            <div className="flex justify-center items-center space-x-4">
              <Badge variant="secondary" className="text-sm">
                {article.categorieArticle}
              </Badge>
              <p className="text-muted-foreground text-sm">
                {new Date(article.createdAt).toLocaleString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="relative">
            {images[0]?.path && (
              <div className="flex justify-center items-center">
                <Image
                  src={images[0].path}
                  alt="Image principale"
                  width={800}
                  height={600}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "cover",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                  onClick={() => openLightbox(0)}
                />
              </div>
            )}

            {isLightboxOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                style={{
                  backdropFilter: "blur(10px)",
                }}
              >
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  className="w-full max-w-3xl"
                  initialSlide={currentIndex}
                  onSlideChange={(swiper) =>
                    setCurrentIndex(swiper.activeIndex)
                  }
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image.path}
                        alt={`Image ${index + 1}`}
                        width={1200}
                        height={900}
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90vh",
                          objectFit: "contain",
                          borderRadius: "10px",
                          margin: "auto",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  className="absolute top-4 right-4 hover:bg-[#9B9B9B] text-white p-2 rounded-full"
                  onClick={() => setLightboxOpen(false)}
                >
                  <X />
                </button>
              </div>
            )}
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: article.contenu.replace(/^"|"$/g, ""),
            }}
          />

          <div className="pt-10 flex justify-center">
            <Link href="/Blog" passHref>
              <Button size="lg">
                Voir d&apos;autres articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBlog;
