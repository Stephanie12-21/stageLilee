"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Euro, Search } from "lucide-react";
import { fr } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
  const [date, setDate] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState("IMMOBILIER");
  const [isFavorited, setIsFavorited] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [likedAnnonces, setLikedAnnonces] = useState([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchAnnonces = async () => {
    try {
      const response = await fetch("/api/annonce/getAll");
      const data = await response.json();
      console.log("données reçues:", data);

      const filteredData = data
        .filter((annonce) => annonce.statut !== "DESACTIVEE")
        .map((annonce) => {
          const notes = annonce.commentaire
            .map((c) => c.note)
            .filter((note) => note !== null);

          if (notes.length > 0) {
            const total = notes.reduce((acc, note) => acc + note, 0);
            const average = total / notes.length;

            annonce.averageNote = average;
          } else {
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

  const filteredAnnonces = annonces.filter((annonce) => {
    const searchLower = searchText.toLowerCase();
    return (
      annonce.titre.toLowerCase().includes(searchLower) ||
      annonce.adresse.toLowerCase().includes(searchLower)
    );
  });

  const tabItems = [
    { value: "IMMOBILIER", label: "Logement" },
    { value: "EMPLOI_SERVICE", label: "Emploi & Service" },
    { value: "VOITURE", label: "Voiture" },
    { value: "LOISIR", label: "Loisir" },
    { value: "MATERIEL", label: "Matériel" },
    { value: "DONS", label: "Donations" },
    { value: "VETEMENT", label: "Vêtement" },
    { value: "MOBILIER", label: "Mobilier" },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const starOptions = [
    { value: "5", label: "5 étoiles" },
    { value: "4", label: "4 étoiles" },
    { value: "3", label: "3 étoiles" },
    { value: "2", label: "2 étoiles" },
    { value: "1", label: "1 étoile" },
  ];

  const renderStars = (count) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const isFilled = index < count;
          return (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              fill={isFilled ? "gold" : "none"}
              stroke={isFilled ? "none" : "gold"}
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
              />
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full py-9 px-6">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between pt-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-full mx-auto">
          <div className="relative w-full md:w-2/4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher ici ..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-primary/20 transition-colors bg-white"
            />
          </div>
          <div className="relative flex flex-wrap items-center gap-4 w-full md:w-2/4">
            <div className="flex-1 w-full">
              <Select
              //value={statusFilter}
              //onValueChange={(value) => setStatusFilter(value)}
              >
                <SelectTrigger className="w-full pr-2">
                  <SelectValue placeholder="Choisir le type de tarification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tout</SelectItem>
                    <SelectItem value="journalier">Journalier</SelectItem>
                    <SelectItem value="nuitee">Nuitée</SelectItem>
                    <SelectItem value="fixe">Fixe</SelectItem>
                    <SelectItem value="mensuel">Mensuel</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 w-full">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choisir une note" />
                </SelectTrigger>
                <SelectContent>
                  {starOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {renderStars(Number(option.value))}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-2/5">
            <div className="flex-1 relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="default"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-white"
                    )}
                  >
                    <CalendarIcon />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "dd MMM yyyy", { locale: fr })} -{" "}
                          {format(date.to, "dd MMM yyyy", { locale: fr })}
                        </>
                      ) : (
                        format(date.from, "dd MMM yyyy", { locale: fr })
                      )
                    ) : (
                      <span>Sélectionner la date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="IMMOBILIER" className="container mx-auto">
        {isMobile ? (
          <select
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
            className="w-full p-3 mb-4 border rounded-lg"
          >
            {tabItems.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        ) : (
          <TabsList className="grid w-full grid-cols-8 space-x-10 h-[70px] text-black">
            {tabItems.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="text-[16px] font-semibold"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {tabItems.map((item) => (
          <TabsContent key={item.value} value={item.value} className="mx-auto">
            <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
              {filteredAnnonces.length === 0 && annonces.length === 0 ? (
                <Label>Aucune annonce disponible.</Label>
              ) : (
                filteredAnnonces
                  .filter((annonce) => annonce.categorieAnnonce === item.value)
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
                              htmlFor="titre"
                              className="text-xl items-center justify-center"
                            >
                              {annonce.titre}
                            </Label>
                            <Label
                              htmlFor="prix"
                              className="text-xl text-[gold] flex items-center "
                            >
                              <span>{annonce.prix} €</span>
                              <span className="ml-1">
                                {annonce.typeTarif === "NUITEE"
                                  ? "par nuit"
                                  : annonce.typeTarif === "JOURNALIER"
                                  ? "par jour"
                                  : annonce.typeTarif === "MENSUEL"
                                  ? "par mois"
                                  : "fixe"}
                              </span>
                            </Label>

                            <Label
                              htmlFor="adresse"
                              className="text-xl items-center justify-center"
                            >
                              {annonce.adresse}
                            </Label>
                            {annonce.updatedAt !== annonce.createdAt ? (
                              <Label
                                htmlFor="updatedAt"
                                className="bg-slate-300 p-[4px] rounded-[4px]"
                              >
                                Modifiée le :{" "}
                                {new Date(
                                  annonce.updatedAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
                                {new Date(annonce.updatedAt).toLocaleTimeString(
                                  undefined,
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </Label>
                            ) : (
                              <Label
                                htmlFor="statut"
                                className="bg-slate-300 p-2 rounded-[4px]"
                              >
                                Créée le :{" "}
                                {new Date(
                                  annonce.createdAt
                                ).toLocaleDateString()}{" "}
                                à{" "}
                                {new Date(annonce.createdAt).toLocaleTimeString(
                                  undefined,
                                  { hour: "2-digit", minute: "2-digit" }
                                )}
                              </Label>
                            )}
                          </div>

                          <div className="flex flex-col items-end gap-24">
                            <Link href={`/Annonces/id=${annonce.id}`}>
                              <AiOutlineEye
                                className="text-[#15213D] cursor-pointer text-[30px]"
                                title="Voir"
                              />
                            </Link>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, index) => {
                                const isFilled =
                                  index < Math.round(annonce.averageNote);
                                return (
                                  <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill={isFilled ? "gold" : "none"}
                                    stroke={isFilled ? "none" : "gold"}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                                    />
                                  </svg>
                                );
                              })}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))
              )}
            </div>
          </TabsContent>
        ))}
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
