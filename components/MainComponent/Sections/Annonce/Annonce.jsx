"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSession } from "next-auth/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const ITEMS_TO_SHOW = 4;

const Annonce = () => {
  const [annonces, setAnnonces] = useState([]);
  const [likedAnnonces, setLikedAnnonces] = useState([]);
  const { data: session } = useSession();
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.5 });

  const fetchAnnonces = async () => {
    try {
      const response = await fetch("/api/annonce/getAll");
      const data = await response.json();

      const filteredData = data
        .filter(
          (annonce) =>
            annonce.statut !== "DESACTIVEE" &&
            annonce.statut !== "EN_ATTENTE_DE_VALIDATION"
        )

        .map((annonce) => {
          console.log("Annonce:", annonce);
          console.log(
            "Utilisateur associé:",
            `${annonce.user.nom} ${annonce.user.prenom}`
          );

          const notes = annonce.commentaire
            .map((c) => c.note)
            .filter((note) => note !== null);

          console.log("Notes associées :", notes);

          if (notes.length > 0) {
            const total = notes.reduce((acc, note) => acc + note, 0);
            const average = total / notes.length;
            console.log("Moyenne des notes :", average.toFixed(2));

            annonce.averageNote = average;
          } else {
            console.log("Aucune note trouvée pour cette annonce.");
            annonce.averageNote = 0;
          }

          return annonce;
        });

      setAnnonces(filteredData);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userId = session?.user?.id;
        if (userId) {
          const response = await fetch("/api/favorites", {
            method: "GET",
            headers: {
              userId: userId,
            },
          });

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des favoris");
          }

          const favorisIds = await response.json();
          setLikedAnnonces(favorisIds);

          setIsFavorited(favorisIds.includes(annonces.id));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
        toast.error("Erreur lors de la récupération des favoris.");
      }
    };

    fetchFavorites();
  }, [annonces.id, session?.user?.id]);

  const toggleHeart = async (id) => {
    const userId = session?.user?.id;

    if (!userId) {
      toast.error("Vous devez être connecté pour ajouter aux favoris.");
      return;
    }

    try {
      if (likedAnnonces.includes(id)) {
        const updatedFavorites = likedAnnonces.filter((favId) => favId !== id);
        setLikedAnnonces(updatedFavorites);
        setIsFavorited(false);

        await removeFromFavorites(userId, id);
        toast.info("Annonce retirée des favoris.");
      } else {
        const updatedFavorites = [...likedAnnonces, id];
        setLikedAnnonces(updatedFavorites);
        setIsFavorited(true);

        await addToFavorites(userId, id);
        toast.success("Annonce ajoutée aux favoris.");
      }
    } catch (error) {
      toast.error("Erreur lors de la mise à jour des favoris.");
    }
  };

  const addToFavorites = async (userId, annonceId) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, annonceId }),
      });

      if (!response.ok) throw new Error("Erreur lors de l'ajout aux favoris");
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris:", error);
      throw error;
    }
  };

  const removeFromFavorites = async (userId, annonceId) => {
    try {
      const response = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, annonceId }),
      });

      if (!response.ok) throw new Error("Erreur lors du retrait des favoris");
    } catch (error) {
      console.error("Erreur lors du retrait des favoris:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [controls, inView]);

  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.5 },
    }),
    hidden: { opacity: 0, y: 50, transition: { duration: 0.5 } },
  };
  const handleCardClick = (id) => {
    router.push(`/Annonces/id=${id}`);
  };
  return (
    <div className="container py-8 space-y-8">
      <div className="flex justify-between gap-8">
        <h1 className="text-[30px]">
          Trouvez des locations adaptées à vos besoins.
        </h1>
        <Button
          asChild
          className="h-[45px] w-[137px] text-[18px] rounded-[10px]"
        >
          <Link href="/Annonces">
            Voir plus <FaArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>

      <Carousel className="container w-full p-4 md:px-8">
        <CarouselContent>
          {loading ? (
            [...Array(ITEMS_TO_SHOW)].map((_, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card
                  className="w-full overflow-hidden cursor-pointer"
                  onClick={() => handleCardClick(annonce.id)}
                >
                  <div className="relative">
                    <Skeleton className="w-full h-48" />
                    <div className="absolute top-2 right-2">
                      <Skeleton className="w-7 h-7 rounded-full" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Skeleton className="h-4 w-1/4 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-2" />
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Skeleton className="h-10 w-24" />
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="w-4 h-4 mx-0.5" />
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))
          ) : annonces.length === 0 ? (
            <p>Aucune annonce trouvée.</p>
          ) : (
            annonces.slice(0, 4).map((annonce, i) => (
              <CarouselItem
                key={annonce.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Card className="w-full overflow-hidden">
                  <div className="relative">
                    {annonce.imageAnnonces.length > 0 && (
                      <Image
                        src={annonce.imageAnnonces[0].path}
                        alt={annonce.titre}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <button
                      onClick={() => toggleHeart(annonce.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-600"
                    >
                      {likedAnnonces.includes(annonce.id) ? (
                        <AiFillHeart size={28} color="#FC1111" />
                      ) : (
                        <AiOutlineHeart size={28} color="#FC1111" />
                      )}
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      variant="secondary"
                      className="text-base text-muted-foreground mb-1"
                    >
                      {annonce.categorieAnnonce}
                    </Badge>
                    <h2 className="text-lg font-semibold mb-1">
                      {annonce.titre}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-2">
                      {annonce.user.nom} {annonce.user.prenom}
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <Button asChild>
                      <Link href={`/Annonces/id=${annonce.id}`}>Details</Link>
                    </Button>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4"
                          fill={
                            i < Math.round(annonce.averageNote)
                              ? "gold"
                              : "none"
                          }
                          stroke="gold"
                          strokeWidth="1.5"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          />
                        </svg>
                      ))}
                    </div>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default Annonce;
