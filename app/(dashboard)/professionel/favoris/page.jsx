"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon } from "lucide-react";

const FavorisPage = () => {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchFavoris = async (userId) => {
      try {
        const response = await fetch(`/api/favorites/${userId}`, {
          headers: { userId },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des favoris");
        }
        const data = await response.json();
        setFavoris(data);
      } catch (error) {
        toast.error("Erreur : " + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchFavoris(session.user.id);
    } else {
      setLoading(false);
      toast.info("Erreur : Impossible de récupérer l'ID de l'utilisateur.");
    }
  }, [session]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">Mes Favoris</h1>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardHeader>
              <CardContent className="mt-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoris.map((favori) => (
            <Card
              key={favori.annonce.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="p-0">
                {favori.annonce.imageAnnonces.length > 0 ? (
                  <div className="relative h-48">
                    <Image
                      src={favori.annonce.imageAnnonces[0].path}
                      alt="Annonce image"
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                    Aucune image disponible
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-semibold mb-2 line-clamp-1">
                    {favori.annonce.titre}
                  </h2>
                  <Badge
                    variant="secondary"
                    className="text-base text-muted-foreground mb-1"
                  >
                    {favori.annonce.categorieAnnonce}
                  </Badge>
                </div>

                <div className="flex items-center font-semibold text-base text-gray-800 mb-2">
                  <MapPinIcon className="w-5 h-5 font-bold mr-2 text-gray-800" />
                  {favori.annonce.adresse}
                </div>
                <div className="flex items-center text-base font-semibold text-gray-800">
                  <CalendarIcon className="w-5 h-5 mr-2 font-bold text-gray-800" />
                  Enregistré le {new Date(favori.saveDate).toLocaleDateString()}{" "}
                  à{" "}
                  {new Date(favori.saveDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/Annonces/id=${favori.annonce.id}`} passHref>
                  <Button variant="outline" className="w-full ">
                    Voir plus en détails
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <ToastContainer
        position="bottom-right"
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

export default FavorisPage;
