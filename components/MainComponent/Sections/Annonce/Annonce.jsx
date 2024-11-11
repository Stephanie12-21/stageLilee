// "use client";

// import { Button } from "@/components/ui/button";
// import React, { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { motion, useAnimation } from "framer-motion";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import Link from "next/link";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import Image from "next/image";
// import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Label } from "@/components/ui/label";
// import { useSession } from "next-auth/react";

// const Annonce = () => {
//   const [annonces, setAnnonces] = useState([]);
//   const [isLiked, setIsLiked] = useState(false);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [likedAnnonces, setLikedAnnonces] = useState([]);
//   const { data: session } = useSession();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchAnnonces = async () => {
//     try {
//       const response = await fetch("/api/annonce/getAll");
//       const data = await response.json();

//       // Filtrer les annonces pour exclure celles qui ont un statut "DESACTIVEE"
//       const filteredData = data
//         .filter((annonce) => annonce.statut !== "DESACTIVEE")
//         .map((annonce) => {
//           console.log("Annonce:", annonce);
//           console.log(
//             "Utilisateur associé:",
//             `${annonce.user.nom} ${annonce.user.prenom}`
//           );

//           // Récupérer toutes les notes associées à cette annonce
//           const notes = annonce.commentaire
//             .map((c) => c.note)
//             .filter((note) => note !== null); // Exclure les notes nulles

//           console.log("Notes associées :", notes);

//           if (notes.length > 0) {
//             // Calculer la moyenne des notes
//             const total = notes.reduce((acc, note) => acc + note, 0);
//             const average = total / notes.length;
//             console.log("Moyenne des notes :", average.toFixed(2));

//             // Ajouter la moyenne à l'annonce sans la formater à l'avance
//             annonce.averageNote = average;
//           } else {
//             console.log("Aucune note trouvée pour cette annonce.");
//             annonce.averageNote = 0;
//           }

//           return annonce; // Retourner l'annonce avec la moyenne mise à jour
//         });

//       setAnnonces(filteredData); // Mettre à jour les annonces filtrées
//     } catch (error) {
//       console.error("Erreur lors de la récupération des utilisateurs :", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnnonces();
//   }, []);

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const userId = session?.user?.id;
//         if (userId) {
//           const response = await fetch("/api/favorites", {
//             method: "GET",
//             headers: {
//               userId: userId,
//             },
//           });

//           if (!response.ok) {
//             throw new Error("Erreur lors de la récupération des favoris");
//           }

//           const favorisIds = await response.json();
//           setLikedAnnonces(favorisIds);

//           // Vérifier si l'annonce est déjà dans les favoris
//           setIsFavorited(favorisIds.includes(annonces.id));
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération des favoris :", error);
//         toast.error("Erreur lors de la récupération des favoris.");
//       }
//     };

//     fetchFavorites();
//   }, [annonces.id, session?.user?.id]);

//   const toggleHeart = async (id) => {
//     const userId = session?.user?.id;

//     if (!userId) {
//       toast.error("Vous devez être connecté pour ajouter aux favoris.");
//       return;
//     }

//     try {
//       if (likedAnnonces.includes(id)) {
//         // Si l'annonce est déjà dans les favoris, on la retire
//         const updatedFavorites = likedAnnonces.filter((favId) => favId !== id);
//         setLikedAnnonces(updatedFavorites);
//         setIsFavorited(false);

//         await removeFromFavorites(userId, id);
//         toast.info("Annonce retirée des favoris.");
//       } else {
//         // Si l'annonce n'est pas dans les favoris, on l'ajoute
//         const updatedFavorites = [...likedAnnonces, id];
//         setLikedAnnonces(updatedFavorites);
//         setIsFavorited(true);

//         await addToFavorites(userId, id);
//         toast.success("Annonce ajoutée aux favoris.");
//       }
//     } catch (error) {
//       toast.error("Erreur lors de la mise à jour des favoris.");
//     }
//   };

//   const addToFavorites = async (userId, annonceId) => {
//     try {
//       const response = await fetch("/api/favorites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, annonceId }),
//       });

//       if (!response.ok) throw new Error("Erreur lors de l'ajout aux favoris");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout aux favoris:", error);
//       throw error;
//     }
//   };

//   // Fonction pour retirer des favoris via l'API Next.js
//   const removeFromFavorites = async (userId, annonceId) => {
//     try {
//       const response = await fetch("/api/favorites", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, annonceId }),
//       });

//       if (!response.ok) throw new Error("Erreur lors du retrait des favoris");
//     } catch (error) {
//       console.error("Erreur lors du retrait des favoris:", error);
//       throw error;
//     }
//   };

//   const controls = useAnimation();
//   const [ref, inView] = useInView({
//     threshold: 0.5,
//   });

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);

//   const cardVariants = {
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.3,
//         duration: 0.5,
//       },
//     }),
//     hidden: (i) => ({
//       opacity: 0,
//       y: 50,
//       transition: {
//         delay: i * 0.3,
//         duration: 0.5,
//       },
//     }),
//   };

//   const textVariants = {
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     hidden: {
//       opacity: 0,
//       x: -50,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   const buttonVariants = {
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     hidden: {
//       opacity: 0,
//       x: 50,
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <div className="container mx-auto py-10 h-[680px]">
//       <div className="flex justify-between">
//         <motion.h1
//           className="text-[30px]"
//           initial="hidden"
//           animate={controls}
//           variants={textVariants}
//         >
//           Trouvez des locations adaptées à vos besoins.
//         </motion.h1>
//         <motion.div
//           initial="hidden"
//           animate={controls}
//           variants={buttonVariants}
//         >
//           <Link href="/Annonces">
//             <Button className="h-[45px] w-[137px] text-[18px] rounded-[10px]">
//               Voir plus
//               <FaArrowRight className="ml-2" />
//             </Button>
//           </Link>
//         </motion.div>
//       </div>

//       <motion.div
//         ref={ref}
//         className="mt-8 flex justify-between items-center"
//         initial="hidden"
//         animate={controls}
//       >
//         <motion.div key={i} custom={i} variants={cardVariants}>
//         {annonces.length === 0 ? (
//           <p>Aucune annonce trouvée.</p>
//         ) : (
//           annonces.map((annonce) => (
//              <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
//               <CardContent className="w-[390px] h-[300px] flex flex-col items-center justify-center mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
//                 {annonce.imageAnnonces.length > 0 && (
//                   <Image
//                     src={annonce.imageAnnonces[0].path}
//                     alt={annonce.titre}
//                     width={900}
//                     height={900}
//                     className="w-full h-full object-cover rounded-[16px]"
//                   />
//                 )}
//                 <div
//                   className="absolute top-2 right-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer p-1"
//                   onClick={() => toggleHeart(annonce.id)}
//                 >
//                   {likedAnnonces.includes(annonce.id) ? (
//                     <AiFillHeart size={28} color="#FC1111" />
//                   ) : (
//                     <AiOutlineHeart size={28} color="#FC1111" />
//                   )}
//                 </div>
//               </CardContent>
//               <ToastContainer
//                 position="top-right"
//                 autoClose={5000}
//                 hideProgressBar={false}
//                 closeOnClick
//                 pauseOnHover
//                 draggable
//                 pauseOnFocusLoss
//                 theme="light"
//               />

//               <CardFooter className="flex justify-between p-4">
//                 <div className="flex flex-col space-y-3">
//                   <Label
//                     htmlFor="categorie"
//                     className="bg-slate-300 p-2 w-fit rounded-[4px]"
//                   >
//                     {annonce.categorieAnnonce}
//                   </Label>
//                   <Label
//                     htmlFor="titre"
//                     className="text-xl items-center justify-center"
//                   >
//                     {annonce.titre}
//                   </Label>
//                   <Label
//                     htmlFor="adresse"
//                     className="text-xl items-center justify-center"
//                   >
//                     {annonce.adresse}
//                   </Label>
//                   <Label
//                     htmlFor="statut"
//                     className="bg-slate-300 p-2 rounded-[4px]"
//                   >
//                     {annonce.statut} le :{" "}
//                     {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
//                     {new Date(annonce.createdAt).toLocaleTimeString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </Label>

//                   {annonce.updatedAt &&
//                     annonce.updatedAt !== annonce.createdAt && (
//                       <Label
//                         htmlFor="updatedAt"
//                         className="bg-slate-300 p-2 rounded-[4px]"
//                       >
//                         Modifiée le :{" "}
//                         {new Date(annonce.updatedAt).toLocaleDateString()} à{" "}
//                         {new Date(annonce.updatedAt).toLocaleTimeString(
//                           undefined,
//                           {
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           }
//                         )}
//                       </Label>
//                     )}
//                 </div>

//                 <div className="flex flex-col items-end ">
//                   <Link href={`/Annonces/id=${annonce.id}`}>
//                     <AiOutlineEye
//                       className="text-[#15213D] cursor-pointer text-[30px]"
//                       title="Voir"
//                     />
//                   </Link>
//                   <div className="flex space-x-1">
//                     {[...Array(5)].map((_, index) => {
//                       // Calculer si l'étoile doit être pleine ou vide
//                       const isFilled = index < Math.round(annonce.averageNote); // Arrondir la moyenne à l'entier le plus proche

//                       return (
//                         <svg
//                           key={index}
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill={isFilled ? "gold" : "none"} // Remplir l'étoile en or si elle est pleine, sinon vide
//                           stroke={isFilled ? "none" : "gold"} // Afficher une bordure en or si l'étoile est vide
//                           viewBox="0 0 24 24"
//                           strokeWidth="1.5"
//                           className="w-6 h-6"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
//                           />
//                         </svg>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </CardFooter>
//             </Card>);

//           </motion.div>
//         ))}
//       </motion.div>
//     </div>
//   );
// };

// export default Annonce;

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
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

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

      // Filtrer les annonces pour exclure celles qui ont un statut "DESACTIVEE"
      const filteredData = data
        .filter((annonce) => annonce.statut !== "DESACTIVEE")
        .map((annonce) => {
          console.log("Annonce:", annonce);
          console.log(
            "Utilisateur associé:",
            `${annonce.user.nom} ${annonce.user.prenom}`
          );

          // Récupérer toutes les notes associées à cette annonce
          const notes = annonce.commentaire
            .map((c) => c.note)
            .filter((note) => note !== null); // Exclure les notes nulles

          console.log("Notes associées :", notes);

          if (notes.length > 0) {
            // Calculer la moyenne des notes
            const total = notes.reduce((acc, note) => acc + note, 0);
            const average = total / notes.length;
            console.log("Moyenne des notes :", average.toFixed(2));

            // Ajouter la moyenne à l'annonce sans la formater à l'avance
            annonce.averageNote = average;
          } else {
            console.log("Aucune note trouvée pour cette annonce.");
            annonce.averageNote = 0;
          }

          return annonce; // Retourner l'annonce avec la moyenne mise à jour
        });

      setAnnonces(filteredData); // Mettre à jour les annonces filtrées
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

          // Vérifier si l'annonce est déjà dans les favoris
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
        // Si l'annonce est déjà dans les favoris, on la retire
        const updatedFavorites = likedAnnonces.filter((favId) => favId !== id);
        setLikedAnnonces(updatedFavorites);
        setIsFavorited(false);

        await removeFromFavorites(userId, id);
        toast.info("Annonce retirée des favoris.");
      } else {
        // Si l'annonce n'est pas dans les favoris, on l'ajoute
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

  return (
    <div className="container mx-auto py-10 h-[680px]">
      <div className="flex justify-between">
        <motion.h1
          className="text-[30px]"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            hidden: { opacity: 0, x: -50, transition: { duration: 0.5 } },
          }}
        >
          Trouvez des locations adaptées à vos besoins.
        </motion.h1>
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            hidden: { opacity: 0, x: 50, transition: { duration: 0.5 } },
          }}
        >
          <Link href="/Annonces">
            <Button className="h-[45px] w-[137px] text-[18px] rounded-[10px]">
              Voir plus
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div ref={ref} className="mt-8 flex flex-wrap  justify-between ">
        {annonces.length === 0 ? (
          <p>Aucune annonce trouvée.</p>
        ) : (
          annonces.map((annonce, i) => (
            <motion.div
              key={annonce.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
            >
              <Card className="w-[400px] h-[500px] rounded-[24px] shadow-md">
                <CardContent className="w-[390px] h-[300px] mt-1 mx-auto rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d] relative">
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
                    className="absolute top-2 right-2 rounded-[20px] p-1 cursor-pointer"
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
                    <Label htmlFor="titre" className="text-lg">
                      {annonce.titre}
                    </Label>
                    <Label htmlFor="nom" className="text-lg">
                      {annonce.user.nom} {annonce.user.prenom}
                    </Label>

                    {annonce.updatedAt !== annonce.createdAt ? (
                      <Label
                        htmlFor="updatedAt"
                        className="bg-slate-300 p-[4px] rounded-[4px]"
                      >
                        Modifiée le :{" "}
                        {new Date(annonce.updatedAt).toLocaleDateString()} à{" "}
                        {new Date(annonce.updatedAt).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Label>
                    ) : (
                      <Label
                        htmlFor="statut"
                        className="bg-slate-300 p-2 rounded-[4px]"
                      >
                        Créée le :
                        {new Date(annonce.createdAt).toLocaleDateString()} à{" "}
                        {new Date(annonce.createdAt).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </Label>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-24">
                    <Link href={`/Annonces/id=${annonce.id}`}>
                      <AiOutlineEye
                        className="text-[#15213D] cursor-pointer text-[26px]"
                        title="Voir"
                      />
                    </Link>
                    <div className="flex space-x-1 mt-2">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            index < Math.round(annonce.averageNote)
                              ? "gold"
                              : "none"
                          }
                          stroke="gold"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 17.25l-5.154 2.709 1.354-5.663-4.4-3.796 5.78-.504L12 4.5l2.42 5.496 5.78.504-4.4 3.796 1.354 5.663L12 17.25z"
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
      </motion.div>
    </div>
  );
};

export default Annonce;
