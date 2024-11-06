"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const cardVariants = {
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
    },
  }),
  hidden: (i) => ({
    opacity: 0,
    y: 50,
    transition: {
      delay: i * 0.01,
      duration: 0.3,
    },
  }),
};

export default function Annonces() {
  const [annonces, setAnnonces] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [likedAnnonces, setLikedAnnonces] = useState([]);
  const { data: session } = useSession();

  const fetchAnnonces = async () => {
    try {
      const response = await fetch("/api/annonce/getAll/");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des annonces");
      }
      const data = await response.json();
      setAnnonces(data);
      console.log("les données sont les suivantes :", data);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces :", error);
    }
  };

  useEffect(() => {
    fetchAnnonces();
  }, []);

  const [isFavorited, setIsFavorited] = useState(false);

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

          // Vérifier si l'annonce est déjà dans les favoris
          setIsFavorited(favorisIds.includes(annonces.id));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
        toast.error("Erreur lors de la récupération des favoris.");
      }
    };

    fetchFavorites();
  }, [annonces.id, session?.user?.id]); // On retire 'annonce.id' et on garde 'session?.user?.id' comme dépendance

  // Fonction pour ajouter ou retirer un favori
  const toggleHeart = async (id) => {
    let userId = session?.user?.id;

    if (!userId) {
      toast.error("Vous devez être connecté pour ajouter aux favoris.");
      return;
    }

    if (likedAnnonces.includes(id)) {
      // Annonce déjà dans les favoris
      toast.info("Vous avez déjà ajouté cette annonce dans les favoris.");
    } else {
      // Ajouter à la liste des favoris
      const updatedFavorites = [...likedAnnonces, id];
      setLikedAnnonces(updatedFavorites);

      try {
        await addToFavorites(userId, id);
        toast.success("Annonce ajoutée aux favoris.");
      } catch (error) {
        toast.error("Erreur lors de l'ajout aux favoris.");
      }
    }
  };

  // Fonction pour ajouter aux favoris via l'API Next.js
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

  // Fonction pour retirer des favoris via l'API Next.js
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

  const filteredAnnonces = annonces.filter((annonce) => {
    const searchLower = searchText.toLowerCase();
    return (
      annonce.titre.toLowerCase().includes(searchLower) ||
      annonce.adresse.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="w-full py-9 px-6">
      <div className="mb-6 container mx-auto flex justify-between items-center space-x-3">
        <input
          type="text"
          placeholder="Rechercher ici..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-lg"
        />
        <Button className="flex items-center justify-center p-2 w-12 h-12 text-lg">
          <FaSearch className="text-2xl" />
        </Button>
      </div>

      <Tabs defaultValue="logement" className="container mx-auto">
        <TabsList className="grid w-full grid-cols-8 space-x-10 h-[70px] text-black">
          <TabsTrigger value="logement" className="text-[16px] font-semibold">
            Logement
          </TabsTrigger>
          <TabsTrigger value="emploi" className="text-[16px] font-semibold">
            Emploi
          </TabsTrigger>
          <TabsTrigger value="voiture" className="text-[16px] font-semibold">
            Voiture
          </TabsTrigger>
          <TabsTrigger value="loisir" className="text-[16px] font-semibold">
            Loisir
          </TabsTrigger>
          <TabsTrigger value="materiel" className="text-[16px] font-semibold">
            Matériel
          </TabsTrigger>
          <TabsTrigger value="don" className="text-[16px] font-semibold">
            Donations
          </TabsTrigger>
          <TabsTrigger value="vetement" className="text-[16px] font-semibold">
            Vêtement
          </TabsTrigger>
          <TabsTrigger value="mobilier" className="text-[16px] font-semibold">
            Mobilier
          </TabsTrigger>
        </TabsList>

        <TabsContent value="logement" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <Label>Aucune annonce disponible.</Label>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}

                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)} // Appeler la fonction toggleHeart
                        >
                          {likedAnnonces.includes(annonce.id) ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="loisir" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "LOISIR")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}

                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {likedAnnonces.includes(annonce.id) ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}
                        <div
                          className="relative mx-auto p-2 left-40 top-[-110px] rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {isLiked ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="mobilier" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "MOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}
                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {likedAnnonces.includes(annonce.id) ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="don" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "DONS")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}

                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {isLiked ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="emploi" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter(
                  (annonce) =>
                    annonce.categorieAnnonce === "EMPLOI" ||
                    annonce.categorieAnnonce === "SERVICE"
                )
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}

                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {isLiked ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="vetement" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "VETEMENT")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}

                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {isLiked ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="voiture" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "VOITURE")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="relative w-[390px] h-[300px] rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}

                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {isLiked ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="materiel" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {filteredAnnonces.length === 0 && annonces.length === 0 ? (
              <p>Aucune annonce disponible.</p>
            ) : filteredAnnonces.length > 0 ? (
              filteredAnnonces
                .filter((annonce) => annonce.categorieAnnonce === "MATERIEL")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
                          />
                        )}
                        <div
                          className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
                          onClick={() => toggleHeart(annonce.id)}
                        >
                          {likedAnnonces.includes(annonce.id) ? (
                            <AiFillHeart size={28} color="#FC1111" />
                          ) : (
                            <AiOutlineHeart size={28} color="#FC1111" />
                          )}
                        </div>
                      </CardContent>
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "IMMOBILIER")
                .map((annonce, index) => (
                  <motion.div
                    key={annonce.id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                  >
                    <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                      <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
                        {annonce.imageAnnonces.length > 0 && (
                          <Image
                            src={annonce.imageAnnonces[0].path}
                            alt={annonce.titre}
                            width={900}
                            height={900}
                            className="w-full h-full object-cover rounded-[16px]"
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
                            htmlFor="adresse"
                            className="text-xl items-center justify-center"
                          >
                            {annonce.adresse}
                          </Label>
                          <Label
                            htmlFor="statut"
                            className="bg-slate-300 p-2 rounded-[4px]"
                          >
                            {annonce.statut} le :{" "}
                            {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                            {new Date(annonce.createdAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </Label>

                          {annonce.updatedAt &&
                            annonce.updatedAt !== annonce.createdAt && (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
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

                        <div className="flex flex-col items-end ">
                          <Link href={`/Annonces/id=${annonce.id}`}>
                            <AiOutlineEye
                              className="text-[#15213D] cursor-pointer text-[30px]"
                              title="Voir"
                            />
                          </Link>
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="gold"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="none"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
        <Link href="/Annonces">
          <Button className="py-4 px-5 text-[20px]">
            <FaArrowRight className="mr-2" />
            Voir plus d&apos;annonces
          </Button>
        </Link>
      </div>
    </div>
  );
}
