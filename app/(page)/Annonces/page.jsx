// "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { FaArrowRight, FaSearch } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { CardAnnonce } from "@/components/MainComponent/Sections/Annonce/CardAnnonce";

// const cardVariants = {
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.3,
//     },
//   }),
//   hidden: (i) => ({
//     opacity: 0,
//     y: 50,
//     transition: {
//       delay: i * 0.01,
//       duration: 0.3,
//     },
//   }),
// };

// const CardItem = ({ index }) => {
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);

//   return (
//     <motion.div
//       ref={ref}
//       custom={index}
//       initial="hidden"
//       animate={controls}
//       variants={cardVariants}
//     >
//       <CardAnnonce />
//     </motion.div>
//   );
// };

// export function Annonces() {
//   return (
//     <div className="w-full py-9 px-6">
//       <div className="mb-6 container mx-auto flex justify-between items-center space-x-3">
//         <input
//           type="text"
//           placeholder="Rechercher ici..."
//           className="border border-gray-300 p-2 w-full rounded-lg"
//         />

//         <Button className="flex items-center justify-center p-2 w-12 h-12 text-lg">
//           <FaSearch className="text-2xl" />
//         </Button>
//       </div>

//       <Tabs defaultValue="logement" className="container mx-auto">
// <TabsList className="grid w-full grid-cols-8 space-x-10 h-[70px] text-black">
//   <TabsTrigger value="logement" className="text-[16px] font-semibold">
//     Logement
//   </TabsTrigger>
//   <TabsTrigger value="emploi" className="text-[16px] font-semibold">
//     Emploi
//   </TabsTrigger>
//   <TabsTrigger value="voiture" className="text-[16px] font-semibold">
//     Voiture
//   </TabsTrigger>
//   <TabsTrigger value="loisir" className="text-[16px] font-semibold">
//     Loisir
//   </TabsTrigger>
//   <TabsTrigger value="materiel" className="text-[16px] font-semibold">
//     Matériel
//   </TabsTrigger>
//   <TabsTrigger value="don" className="text-[16px] font-semibold">
//     Donations
//   </TabsTrigger>
//   <TabsTrigger value="vetement" className="text-[16px] font-semibold">
//     Vêtement
//   </TabsTrigger>
//   <TabsTrigger value="mobilier" className="text-[16px] font-semibold">
//     Mobilier
//   </TabsTrigger>
// </TabsList>

//         <TabsContent value="mobilier" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="vetement" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="don" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="materiel" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="logement" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="loisir" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="voiture" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="emploi" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
//         <Link href="/Annonces">
//           <Button className="py-4 px-5 text-[17px] rounded-[10px]">
//             Voir plus
//             <FaArrowRight className="ml-2" />
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Annonces;

// "use client";

// import { motion, useAnimation } from "framer-motion";
// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { FaArrowRight, FaSearch } from "react-icons/fa";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// const cardVariants = {
//   visible: (i) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.05,
//       duration: 0.3,
//     },
//   }),
//   hidden: (i) => ({
//     opacity: 0,
//     y: 50,
//     transition: {
//       delay: i * 0.01,
//       duration: 0.3,
//     },
//   }),
// };

// const CardItem = ({ index }) => {
//   const [isLiked, setIsLiked] = useState(false);

//   const toggleHeart = () => {
//     setIsLiked(!isLiked);
//   };
//   const { ref, inView } = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     } else {
//       controls.start("hidden");
//     }
//   }, [controls, inView]);

//   return (
//     <motion.div
//       ref={ref}
//       custom={index}
//       initial="hidden"
//       animate={controls}
//       variants={cardVariants}
//     >
//       <Card className="w-[400px] h-[500px] rounded-[24px]  shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl">
//         <CardContent className="w-[390px] h-[300px] flex items-center mt-1 mx-auto  rounded-[16px] border-[1px] border-[#e39a2d] bg-[#15213d]">
//           <div
//             className="relative mx-auto p-2 left-40 top-[-110px] rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer"
//             onClick={toggleHeart}
//           >
//             {isLiked ? (
//               <AiFillHeart size={28} color="#FC1111" />
//             ) : (
//               <AiOutlineHeart size={28} color="#FC1111" />
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="flex-col items-start p-2 gap-y-4 mt-2">
//           <div className="flex items-center space-x-52">
//             <Label
//               htmlFor="categorie"
//               className="bg-slate-300 p-2 rounded-[4px]"
//             >
//               Catégorie
//             </Label>
//             <Link href="/Annonces/InfoAnnonces">
//               <Button className=" text-[#15213D] text-[16px] font-semibold bg-transparent hover:underline hover:bg-transparent px-4 py-2 rounded-[10px]">
//                 Découvrir
//               </Button>
//             </Link>
//           </div>

//           <Label htmlFor="type" className="text-xl">
//             Type
//           </Label>
//           <Label htmlFor="localisation">Localisation </Label>

//           <div className="flex gap-x-52">
//             <div className="flex">
//               <p className="text-[#FCA311] font-normal text-[18px]">Prix</p>
//             </div>

//             <div className="flex items-center">
//               <div className="flex space-x-1">
//                 {[...Array(5)].map((_, index) => (
//                   <svg
//                     key={index}
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="gold"
//                     viewBox="0 0 24 24"
//                     strokeWidth="1.5"
//                     stroke="none"
//                     className="w-6 h-6"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
//                     />
//                   </svg>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// };

// export function Annonces() {
//   return (
//     <div className="w-full py-9 px-6">
//       {/* Champ de recherche */}
//       <div className="mb-6 container mx-auto flex justify-between items-center space-x-3">
//         <input
//           type="text"
//           placeholder="Rechercher ici..."
//           className="border border-gray-300 p-2 w-full rounded-lg"
//         />

//         <Button className="flex items-center justify-center p-2 w-12 h-12 text-lg">
//           <FaSearch className="text-2xl" />
//         </Button>
//       </div>

//       <Tabs defaultValue="logement" className="container mx-auto">
//         <TabsList className="grid w-full grid-cols-8 space-x-10 h-[70px] text-black">
//           <TabsTrigger value="logement" className="text-[16px] font-semibold">
//             Logement
//           </TabsTrigger>
//           <TabsTrigger value="mobilier" className="text-[16px] font-semibold">
//             Mobilier
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="mobilier" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>

//         <TabsContent value="logement" className="mx-auto">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             {[...Array(9)].map((_, index) => (
//               <CardItem key={index} index={index} />
//             ))}
//           </div>
//         </TabsContent>
//       </Tabs>

//       <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
//         <Link href="/Annonces">
//           <Button className="py-4 px-5 text-[17px] rounded-[10px]">
//             Voir plus
//             <FaArrowRight className="ml-2" />
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Annonces;
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
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineHeart,
} from "react-icons/ai";
import Image from "next/image";

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

  const toggleHeart = () => setIsLiked(!isLiked);

  return (
    <div className="w-full py-9 px-6">
      {/* Champ de recherche */}
      <div className="mb-6 container mx-auto flex justify-between items-center space-x-3">
        <input
          type="text"
          placeholder="Rechercher ici..."
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

        {/* Contenu pour Logement */}
        <TabsContent value="logement" className="mx-auto">
          <div className="grid grid-cols-3 gap-2 pt-10 mx-10">
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "LOISIR") // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "MOBILIER") // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "DONS") // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter(
                  (annonce) =>
                    annonce.categorieAnnonce === "EMPLOI" ||
                    annonce.categorieAnnonce === "SERVICE"
                ) // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "VETEMENT") // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "VOITURE") // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
            {annonces.length === 0 ? (
              <p>Aucune annonce trouvée.</p>
            ) : (
              annonces
                .filter((annonce) => annonce.categorieAnnonce === "MATERIEL") // Filtrer les annonces
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
                          <Link href={`/personnel/annonces/id=${annonce.id}`}>
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
