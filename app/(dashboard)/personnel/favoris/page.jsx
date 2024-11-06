"use client";
import Link from "next/link"; // Correctement importé par défaut
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai"; // Correctement importé
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div>
      <h1>Liste des favoris</h1>
      {loading ? (
        <p>Chargement des favoris...</p>
      ) : (
        <ul>
          {favoris.map((favori) => (
            <li key={favori.annonce.id}>
              <h2>{favori.annonce.titre}</h2>
              <p>{favori.annonce.description}</p>
              <p>
                <strong>Adresse:</strong> {favori.annonce.adresse}
              </p>
              <p>
                Date enregistrée :{" "}
                {new Date(favori.saveDate).toLocaleDateString()}{" "}
                {new Date(favori.saveDate).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div>
                <strong>Catégorie:</strong> {favori.annonce.categorieAnnonce}
              </div>
              <div>
                <strong>Images:</strong>
                {favori.annonce.imageAnnonces.length > 0 ? (
                  <ul>
                    {favori.annonce.imageAnnonces.map((image) => (
                      <li key={image.id} className="space-y-6">
                        <Image
                          src={image.path}
                          alt="Annonce image"
                          width={300}
                          height={300}
                        />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Aucune image pour cette annonce</p>
                )}
              </div>
              {/* Lien "Voir plus en détails" */}
              <Link href={`/Annonces/id=${favori.annonce.id}`} passHref>
                <button className="flex items-center text-blue-600 hover:underline mt-4">
                  <AiOutlineEye className="mr-2" />
                  Voir plus en détails
                </button>
              </Link>
            </li>
          ))}
        </ul>
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
