"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import ConfirmDeleteModal from "@/app/(dialog)/delete/page";
import Image from "next/image";

const Annonces = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAnnonceId, setSelectedAnnonceId] = useState(null);
  const { data: session, status } = useSession();
  const [annonces, setAnnonces] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirige vers la page de login si non authentifié
    }
  }, [status, router]);

  const fetchAnnonces = async (userId) => {
    try {
      const response = await fetch(`/api/annonce?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des annonces");
      }
      const data = await response.json();
      setAnnonces(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
      setError("Erreur lors de la récupération des annonces.");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchAnnonces(session.user.id);
    }
  }, [session]);

  const handleDeleteClick = (id) => {
    setSelectedAnnonceId(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedAnnonceId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAnnonceId) return;

    try {
      const response = await fetch(`/api/annonce/${selectedAnnonceId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'annonce");
      }

      setAnnonces((prevAnnonces) =>
        prevAnnonces.filter((annonce) => annonce.id !== selectedAnnonceId)
      );

      console.log("Données supprimées");
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedAnnonceId(null);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pt-4 mx-10">
        <Input
          type="text"
          placeholder="Rechercher une annonce"
          className="border border-gray-300 text-[18px] rounded-md p-6 w-[700px]"
        />
        <Link href="/professionel/annonces/addAnnonce">
          <Button variant="outline">Créer une annonce</Button>
        </Link>
      </div>
      {/* <div>
        <p>
          Bonjour, {session?.user.nom}, tu as l&apos;identifiant{" "}
          {session?.user.id}
        </p>
      </div> */}

      <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
        {annonces.length === 0 ? (
          <p>Aucune annonce trouvée.</p>
        ) : (
          annonces.map((annonce) => (
            <Card
              key={annonce.id}
              className="w-[350px] h-[380px] rounded-[24px] shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl "
            >
              <CardContent className="w-[340px] h-[200px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                {annonce.imageAnnonces.length > 0 && (
                  <Image
                    src={annonce.imageAnnonces[0].path}
                    alt={annonce.titre}
                    width={900}
                    height={900}
                    className="w-full h-full  object-cover rounded-[16px]"
                  />
                )}
              </CardContent>

              <CardFooter className="flex justify-between p-4">
                <div className="flex flex-col space-y-3">
                  <Label
                    htmlFor="categorie"
                    className="bg-slate-300 p-2 w-fit rounded-[4px]"
                  >
                    {annonce.categorieAnnonce}
                  </Label>
                  <Label
                    htmlFor="titre"
                    className="text-xl items-center justify-center"
                  >
                    {annonce.titre}
                  </Label>
                  <Label
                    htmlFor="statut"
                    className="bg-slate-300 p-2 rounded-[4px]"
                  >
                    {annonce.statut} le :{" "}
                    {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                    {new Date(annonce.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Label>

                  {annonce.updatedAt &&
                    annonce.updatedAt !== annonce.createdAt && (
                      <Label
                        htmlFor="updatedAt"
                        className="bg-slate-300 p-2 rounded-[4px]"
                      >
                        MODIFIEE le :{" "}
                        {new Date(annonce.updatedAt).toLocaleDateString()} à{" "}
                        {new Date(annonce.updatedAt).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Label>
                    )}
                </div>

                <div className="flex flex-col items-end space-y-8">
                  <Link href={`/professionel/annonces/id=${annonce.id}`}>
                    <AiOutlineEye
                      className="text-[#15213D] cursor-pointer text-[30px]"
                      title="Voir"
                    />
                  </Link>
                  <Link
                    href={`/professionel/annonces/editAnnonce/id=${annonce.id}`}
                  >
                    <AiOutlineEdit
                      className="text-[#15213D] cursor-pointer text-[30px]"
                      title="Éditer"
                    />
                  </Link>
                  <AiOutlineDelete
                    className="text-[#15213D] cursor-pointer text-[30px]"
                    title="Supprimer"
                    onClick={() => handleDeleteClick(annonce.id)}
                  />
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Annonces;
