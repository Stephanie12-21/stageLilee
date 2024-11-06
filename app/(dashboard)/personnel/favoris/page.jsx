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

    if (session && session.user && session.user.id) {
      const userId = session.user.id;
      fetchFavoris(userId);
    } else {
      setLoading(false);
      toast.info("Erreur : Impossible de récupérer l'ID de l'utilisateur.");
    }
  }, [session]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Liste des favoris</h1>
      {loading ? (
        <p>Chargement des favoris...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {favoris.map((favori) => (
            <Card
              key={favori.annonce.id}
              className="max-w-sm rounded-[16px] shadow-lg bg-white"
            >
              <CardHeader>
                {favori.annonce.imageAnnonces.length > 0 ? (
                  <Image
                    src={favori.annonce.imageAnnonces[0].path}
                    alt="Annonce image"
                    width={400}
                    height={250}
                    className="object-cover w-full h-48 rounded-lg"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-white rounded-[24px]">
                    Aucune image disponible
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-2">
                <h2 className="text-2xl font-semibold mb-2">
                  {favori.annonce.titre}
                </h2>
                <p className="text-gray-700 text-sm mb-4">
                  {favori.annonce.description.substring(0, 100)}...
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Adresse:</strong> {favori.annonce.adresse}
                </p>
                <div className="text-sm text-gray-600 mb-2">
                  <strong>Catégorie:</strong> {favori.annonce.categorieAnnonce}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Date d&apos;enregistrement: </strong>
                  {new Date(favori.saveDate).toLocaleDateString()}{" "}
                  {new Date(favori.saveDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>

              <CardFooter className="pb-2 pl-5">
                <Link href={`/Annonces/id=${favori.annonce.id}`} passHref>
                  <button className="flex items-center text-blue-600 hover:underline">
                    Voir plus en détails
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

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

export default FavorisPage;
