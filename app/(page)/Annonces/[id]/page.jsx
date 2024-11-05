// "use client";
// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { DeleteIcon, EditIcon, MoreHorizontal, StarIcon } from "lucide-react";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuPortal,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Textarea } from "@/components/ui/textarea";
// import ConfirmDeleteModal from "@/app/(dialog)/delete/page";
// import StarRatingDialog from "@/app/(dialog)/note/page";

// const InfoAnnonces = ({ params }) => {
//   const { id } = params;
//   const { data: session } = useSession();
//   const [annonceId, setAnnonceId] = useState("");
//   const [userId, setUserId] = useState("");
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [localisation, setLocalisation] = useState("");
//   const [adresse, setAdresse] = useState("");
//   const [iframeSrc, setIframeSrc] = useState("");
//   const [comment, setComment] = useState("");
//   const [commentId, setCommentId] = useState("");
//   const [comments, setComments] = useState([]);
//   const [editCommentId, setEditCommentId] = useState(null);
//   const [editCommentText, setEditCommentText] = useState("");
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [selectedCommentId, setSelectedCommentId] = useState(null);
//   const [showModalRating, setShowModalRating] = useState(false);
//   const [note, setNote] = useState("");

//   useEffect(() => {
//     async function fetchAnnonce() {
//       try {
//         const response = await fetch(`/api/annonce/${id}`);
//         if (response.ok) {
//           const data = await response.json();
//           setAnnonceId(data.id);
//           setTitle(data.titre);
//           setCategory(data.categorieAnnonce);
//           setDescription(data.description);
//           setAdresse(data.adresse);
//           setLocalisation(data.localisation);
//           setImages(data.imageAnnonces);
//           if (data.localisation) setIframeSrc(data.localisation);
//         } else {
//           console.error("Annonce non trouvée");
//         }
//       } catch (error) {
//         console.error("Erreur lors de la récupération de l'annonce :", error);
//       }
//     }

//     fetchAnnonce();
//   }, [id]);

//   useEffect(() => {
//     if (annonceId) {
//       async function fetchComments() {
//         try {
//           const response = await fetch(
//             `/api/comments?annoncesId=${encodeURIComponent(annonceId)}`
//           );
//           if (response.ok) {
//             const data = await response.json();
//             const sortedComments = data.commentaires.sort(
//               (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//             );
//             setComments(sortedComments);
//           } else {
//             console.error("Erreur lors de la récupération des commentaires");
//           }
//         } catch (error) {
//           console.error(
//             "Erreur lors de la récupération des commentaires :",
//             error
//           );
//         }
//       }

//       fetchComments();
//     }
//   }, [annonceId]);

//   const handlePublish = async (e) => {
//     e.preventDefault();
//     if (!comment) {
//       alert("Vous n'avez écrit aucun commentaire");
//       return;
//     } else if (!session) {
//       alert(
//         "Vous devez vous connecter à votre compte pour pouvoir publier des commentaires"
//       );
//       return;
//     }

//     const formData = new FormData();
//     formData.append("IdAnnonce", annonceId);
//     formData.append("IdUser", session.user.id);
//     formData.append("Commentaire", comment);

//     try {
//       const response = await fetch("/api/comments/", {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         const currentTime = new Date().toISOString();
//         setComment("");
//         setComments((prevComments) => [
//           {
//             user: session.user,
//             commentaire: comment,
//             createdAt: currentTime,
//           },
//           ...prevComments,
//         ]);
//       } else {
//         console.log("Erreur lors de la publication du commentaire.");
//       }
//     } catch (error) {
//       console.error("Erreur:", error);
//     }
//   };

//   const handleEditComment = (commentItem) => {
//     setEditCommentId(commentItem.id);
//     setEditCommentText(commentItem.commentaire);
//     console.log("commentaire à mettre à jour :", editCommentText);
//   };

//   const handleUpdateComment = async () => {
//     if (!editCommentText) {
//       alert("Vous devez entrer un commentaire.");
//       return;
//     }

//     if (!editCommentId) {
//       alert("ID du commentaire manquant.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("IdCommentaire", editCommentId);
//     formData.append("Commentaire", editCommentText);

//     console.log("commentaire à mettre à jour :", editCommentText);
//     console.log("ID commentaire à mettre à jour :", editCommentId);

//     try {
//       const response = await fetch(`/api/comments/${editCommentId}/`, {
//         method: "PUT",
//         body: formData,
//       });

//       if (response.ok) {
//         setComments((prevComments) =>
//           prevComments.map((comment) =>
//             comment.id === parseInt(editCommentId, 10)
//               ? {
//                   ...comment,
//                   commentaire: editCommentText,
//                   updatedAt: new Date().toISOString(),
//                 }
//               : comment
//           )
//         );
//         setEditCommentId(null);
//         setEditCommentText("");
//         alert("Commentaire mis à jour avec succès.");
//       } else {
//         const errorData = await response.json();
//         alert(
//           `Erreur lors de la mise à jour du commentaire: ${errorData.message}`
//         );
//       }
//     } catch (error) {
//       alert("Erreur:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditCommentId(null);
//     setEditCommentText("");
//   };

//   const handleDeleteClick = (commentItem) => {
//     setSelectedCommentId(commentItem.id);
//     setShowDeleteModal(true);
//     console.log(`ID du commentaire sélectionné : ${commentItem.id}`);
//   };

//   const handleCloseModal = () => {
//     setShowDeleteModal(false);
//     setSelectedCommentId(null);
//   };

//   const handleConfirmDelete = async () => {
//     if (!selectedCommentId) {
//       console.log("ID de commentaire manquant");
//       return;
//     }
//     try {
//       const response = await fetch(`/api/comments/${selectedCommentId}/`, {
//         method: "DELETE",
//       });

//       if (response.ok) {
//         setComments((prevComments) =>
//           prevComments.filter((comment) => comment.id !== selectedCommentId)
//         );
//         alert("Commentaire supprimé avec succès.");
//       } else {
//         const errorData = await response.json();
//         alert(
//           `Erreur lors de la suppression du commentaire: ${errorData.message}`
//         );
//       }
//     } catch (error) {
//       alert("Erreur:", error);
//     } finally {
//       handleCloseModal(); // Close the modal after the operation
//     }
//   };

//   const handleRating = (commentItem) => {
//     setShowModalRating(true);
//     setNote(commentItem.note);
//     const note = commentItem.note || 0;
//     setSelectedCommentId(commentItem.id);
//     const commentId = `${commentItem.id}`;
//     console.log("commentaire sélectionné:", commentId);
//     console.log("note enregistrée à ce commentaire:", note);
//   };

//   const handleCloseRatingModal = () => {
//     setShowModalRating(false);
//   };

//   const calculateAverageRating = (comments) => {
//     if (comments.length === 0) return 0;
//     const totalRating = comments.reduce((sum, comment) => {
//       return sum + (comment.note || 0); // Prendre en compte les notes ou 0 si pas de note
//     }, 0);
//     return totalRating / comments.length; // Retourne la moyenne
//   };

//   const averageRating = calculateAverageRating(comments);

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(
//           <StarIcon
//             key={i}
//             className="h-5 w-5 fill-yellow-400 text-yellow-400" // Étoile pleine en jaune
//           />
//         );
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-5 w-5">
//             <StarIcon
//               className="absolute h-full w-full fill-yellow-400 text-yellow-400"
//               style={{ clipPath: "inset(0 0.5em 0 0)" }} // Partie jaune
//             />
//             <StarIcon
//               className="absolute h-full w-full fill-gray-400  text-gray-400" // Partie grise
//               style={{ clipPath: "inset(0 0 0 0.5em)" }} // Partie grise
//             />
//           </div>
//         );
//       } else {
//         stars.push(
//           <StarIcon
//             key={i}
//             className="h-5 w-5 text-gray-400" // Étoile vide en gris
//           />
//         );
//       }
//     }
//     return stars;
//   };

//   return (
//     <div className="container mx-auto flex">
//       <div className="w-1/2 p-4">
//         <h1 className="text-3xl">
//           <strong>Titre:</strong> {title}
//         </h1>
//         <p>
//           <strong>Catégorie:</strong> {category}
//         </p>
//         <p>
//           <strong>Description:</strong> {description}
//         </p>
//         <p>
//           <strong>Adresse:</strong> {adresse}
//         </p>
//         <p>
//           <strong>ID de l&apos;annonce:</strong> {annonceId}
//         </p>
//         <div>
//           <h3 className="text-xl">
//             <strong>Moyenne des notes:</strong> {averageRating.toFixed(1)}/5
//           </h3>
//           <div className="flex space-x-1">{renderStars(averageRating)}</div>
//         </div>
//         <div>
//           <h3>
//             <strong>Images :</strong>
//           </h3>
//           {images.length > 0 ? (
//             images.map((imageAnnonces, index) => (
//               <Image
//                 key={index}
//                 src={imageAnnonces.path}
//                 alt={`Image ${index + 1}`}
//                 width={500}
//                 height={500}
//                 priority="true"
//                 style={{ width: "500px", margin: "10px" }}
//               />
//             ))
//           ) : (
//             <p>Aucune image disponible</p>
//           )}
//         </div>

//         <div>
//           <h3>Localisation</h3>
//           {iframeSrc ? (
//             <iframe
//               src={iframeSrc}
//               width="600"
//               height="450"
//               style={{ border: "0" }}
//               allowFullScreen={true}
//               loading="lazy"
//             ></iframe>
//           ) : (
//             <p>Localisation non disponible</p>
//           )}
//         </div>
//       </div>

//       <div className="w-1/2 p-4">
//         <h3 className="text-3xl underline">Commentaires</h3>
//         <div className="mb-6 pt-5 pr-7 flex justify-between items-center space-x-3">
//           <input
//             type="text"
//             placeholder="Exprimez-vous..."
//             className="border border-gray-300 p-2 w-full rounded-lg"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//           />
//           <Button
//             className="py-4 px-5 text-[17px] rounded-[10px]"
//             onClick={handlePublish}
//           >
//             Publier
//           </Button>
//         </div>

//         {comments.map((commentItem, index) => (
//           <div key={index} className="flex justify-between pt-8 pr-7">
//             <div className="flex space-x-5 border border-grey w-full p-2 rounded-lg">
//               <div>
//                 <Avatar>
//                   <AvatarImage
//                     src={
//                       commentItem.user.profileImage ||
//                       "https://github.com/shadcn.png"
//                     }
//                     alt={commentItem.user.nom}
//                   />
//                   <AvatarFallback>Photo</AvatarFallback>
//                 </Avatar>
//               </div>
//               <div className="space-y-3 flex-grow">
//                 <div className="flex justify-between items-center">
//                   {" "}
//                   {/* Conteneur flex pour le nom/prénom et le dropdown */}
//                   <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
//                     {commentItem.user.nom} {commentItem.user.prenom}
//                   </p>
//                   <DropdownMenu>
//                     <DropdownMenuTrigger>
//                       <Button variant="link" className="text-xs">
//                         <MoreHorizontal className="w-4 h-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuPortal>
//                       <DropdownMenuContent>
//                         <DropdownMenuGroup>
//                           <DropdownMenuItem>
//                             <Button
//                               variant="link"
//                               className="flex items-center"
//                               onClick={() => handleEditComment(commentItem)}
//                             >
//                               <EditIcon className="mr-2 h-4 w-4" />
//                               Modifier
//                             </Button>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Button
//                               variant="link"
//                               className="flex items-center"
//                               onClick={() => handleDeleteClick(commentItem)}
//                             >
//                               <DeleteIcon className="mr-2 h-4 w-4" />
//                               Supprimer
//                             </Button>
//                           </DropdownMenuItem>
//                           <DropdownMenuItem>
//                             <Button
//                               variant="link"
//                               className="flex items-center"
//                               // onClick={handleRating}
//                               onClick={() => handleRating(commentItem)}
//                             >
//                               <StarIcon className="mr-2 h-4 w-4" />
//                               Notes
//                             </Button>
//                           </DropdownMenuItem>
//                         </DropdownMenuGroup>
//                       </DropdownMenuContent>
//                     </DropdownMenuPortal>
//                   </DropdownMenu>
//                 </div>
//                 {editCommentId === commentItem.id ? (
//                   <Textarea
//                     type="text"
//                     value={editCommentText}
//                     onChange={(e) => setEditCommentText(e.target.value)}
//                     className="border border-gray-300 p-2 w-full rounded-lg"
//                   />
//                 ) : (
//                   <p>{commentItem.commentaire}</p>
//                 )}

//                 <div className="flex justify-between items-center pt-4">
//                   {!editCommentId && (
//                     <>
//                       {commentItem.updatedAt &&
//                       commentItem.updatedAt === commentItem.createdAt ? (
//                         <span className="text-sm text-gray-500">
//                           Publié le :{" "}
//                           {new Date(commentItem.createdAt).toLocaleDateString()}{" "}
//                           à{" "}
//                           {new Date(commentItem.createdAt).toLocaleTimeString(
//                             undefined,
//                             {
//                               hour: "2-digit",
//                               minute: "2-digit",
//                             }
//                           )}
//                         </span>
//                       ) : (
//                         commentItem.updatedAt && (
//                           <span className="text-sm text-gray-500">
//                             Modifié le :{" "}
//                             {new Date(
//                               commentItem.updatedAt
//                             ).toLocaleDateString()}{" "}
//                             à{" "}
//                             {new Date(commentItem.updatedAt).toLocaleTimeString(
//                               undefined,
//                               {
//                                 hour: "2-digit",
//                                 minute: "2-digit",
//                               }
//                             )}
//                           </span>
//                         )
//                       )}
//                     </>
//                   )}
//                   <div>
//                     {commentItem.note ? (
//                       <div className="flex space-x-1">
//                         {renderStars(commentItem.note)}
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>

//                 {editCommentId === commentItem.id && (
//                   <div className="flex space-x-4">
//                     <Button onClick={handleUpdateComment}>Mettre à jour</Button>
//                     <Button variant="outline" onClick={handleCancelEdit}>
//                       Annuler
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <ConfirmDeleteModal
//         isOpen={showDeleteModal}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//       />

//       <StarRatingDialog
//         isOpen={showModalRating}
//         annonceId={annonceId} // Pass the annonceId
//         // userId={userId} // Pass the userId
//         onClose={handleCloseRatingModal}
//         commentId={selectedCommentId}
//         currentRating={note}
//       />
//     </div>
//   );
// };

// export default InfoAnnonces;

"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, EditIcon, MoreHorizontal, StarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import StarRatingDialog from "@/app/(dialog)/note/page";
import ConfirmDeleteModal from "@/app/(dialog)/delete/page";

const InfoAnnonces = ({ params }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { id } = params;
  const { data: session, status } = useSession();
  const [annonceId, setAnnonceId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState([]);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [showModalRating, setShowModalRating] = useState(false);
  const [note, setNote] = useState("");
  const toggleHeart = () => {
    setIsLiked(!isLiked);
  };
  const router = useRouter();

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!comment) {
      alert("Vous n'avez écrit aucun commentaire");
      return;
    } else if (!session) {
      alert(
        "Vous devez vous connecter à votre compte pour pouvoir publier des commentaires"
      );
      return;
    }

    const formData = new FormData();
    formData.append("IdAnnonce", annonceId);
    formData.append("IdUser", session.user.id);
    formData.append("Commentaire", comment);

    try {
      const response = await fetch("/api/comments/", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const currentTime = new Date().toISOString();
        setComment("");
        setComments((prevComments) => [
          {
            user: session.user,
            commentaire: comment,
            createdAt: currentTime,
          },
          ...prevComments,
        ]);
      } else {
        console.log("Erreur lors de la publication du commentaire.");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleEditComment = (commentItem) => {
    setEditCommentId(commentItem.id);
    setEditCommentText(commentItem.commentaire);
    console.log("commentaire à mettre à jour :", editCommentText);
  };

  const handleUpdateComment = async () => {
    if (!editCommentText) {
      alert("Vous devez entrer un commentaire.");
      return;
    }

    if (!editCommentId) {
      alert("ID du commentaire manquant.");
      return;
    }

    const formData = new FormData();
    formData.append("IdCommentaire", editCommentId);
    formData.append("Commentaire", editCommentText);

    console.log("commentaire à mettre à jour :", editCommentText);
    console.log("ID commentaire à mettre à jour :", editCommentId);

    try {
      const response = await fetch(`/api/comments/${editCommentId}/`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === parseInt(editCommentId, 10)
              ? {
                  ...comment,
                  commentaire: editCommentText,
                  updatedAt: new Date().toISOString(),
                }
              : comment
          )
        );
        setEditCommentId(null);
        setEditCommentText("");
        alert("Commentaire mis à jour avec succès.");
      } else {
        const errorData = await response.json();
        alert(
          `Erreur lors de la mise à jour du commentaire: ${errorData.message}`
        );
      }
    } catch (error) {
      alert("Erreur:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentText("");
  };

  const handleDeleteClick = (commentItem) => {
    setSelectedCommentId(commentItem.id);
    setShowDeleteModal(true);
    console.log(`ID du commentaire sélectionné : ${commentItem.id}`);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedCommentId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCommentId) {
      console.log("ID de commentaire manquant");
      return;
    }
    try {
      const response = await fetch(`/api/comments/${selectedCommentId}/`, {
        method: "DELETE",
      });

      if (response.ok) {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== selectedCommentId)
        );
        alert("Commentaire supprimé avec succès.");
      } else {
        const errorData = await response.json();
        alert(
          `Erreur lors de la suppression du commentaire: ${errorData.message}`
        );
      }
    } catch (error) {
      alert("Erreur:", error);
    } finally {
      handleCloseModal(); // Close the modal after the operation
    }
  };

  const handleRating = (commentItem) => {
    setShowModalRating(true);
    setNote(commentItem.note);
    const note = commentItem.note || 0;
    setSelectedCommentId(commentItem.id);
    const commentId = `${commentItem.id}`;
    console.log("commentaire sélectionné:", commentId);
    console.log("note enregistrée à ce commentaire:", note);
  };

  const handleCloseRatingModal = () => {
    setShowModalRating(false);
  };

  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, comment) => {
      return sum + (comment.note || 0); // Prendre en compte les notes ou 0 si pas de note
    }, 0);
    return totalRating / comments.note.length;
  };

  const averageRating = calculateAverageRating(comments);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400" // Étoile pleine en jaune
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-5 w-5">
            <StarIcon
              className="absolute h-full w-full fill-yellow-400 text-yellow-400"
              style={{ clipPath: "inset(0 0.5em 0 0)" }} // Partie jaune
            />
            <StarIcon
              className="absolute h-full w-full fill-gray-400  text-gray-400" // Partie grise
              style={{ clipPath: "inset(0 0 0 0.5em)" }} // Partie grise
            />
          </div>
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            className="h-5 w-5 text-gray-400" // Étoile vide en gris
          />
        );
      }
    }
    return stars;
  };

  useEffect(() => {
    if (annonceId) {
      async function fetchComments() {
        try {
          const response = await fetch(
            `/api/comments?annoncesId=${encodeURIComponent(annonceId)}`
          );
          if (response.ok) {
            const data = await response.json();
            const sortedComments = data.commentaires.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setComments(sortedComments);
          } else {
            console.error("Erreur lors de la récupération des commentaires");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des commentaires :",
            error
          );
        }
      }

      fetchComments();
    }
  }, [annonceId]);

  useEffect(() => {
    async function fetchAnnonce() {
      try {
        const response = await fetch(`/api/annonce/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("les données reçues sont : ", data);
          setAnnonceId(data.id);
          setTitle(data.titre);
          setCategory(data.categorieAnnonce);
          setDescription(data.description);
          setAdresse(data.adresse);
          setLocalisation(data.localisation);
          setImages(data.imageAnnonces);
          if (data.localisation) setIframeSrc(data.localisation);
        } else {
          console.error("Annonce non trouvée, avec l'id annonce :", id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    }

    fetchAnnonce();
  }, [id]);

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

  const getRolePath = () => {
    const role = session?.user?.role;
    if (role === "PERSO") return "/personnel";
    if (role === "PRO") return "/professionel";
    if (role === "ADMIN") return "/admin";
    return "";
  };

  const rolePath = getRolePath(); // Appelle la fonction sans vérifier 'session'
  const messageUrl = `${rolePath}/messages/`;
  console.log("Le messageUrl correspondant est :", messageUrl);

  const handleMessageRoot = () => {
    if (rolePath) {
      // Vérifie si le rolePath n'est pas vide
      router.push(messageUrl); // Utilise messageUrl directement
    } else {
      console.warn("Aucun chemin valide pour le rôle, redirection annulée.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Link href="/Annonces">
        <Button className="py-5 text-[18px] rounded-[10px] space-x-3">
          <FaArrowLeft className="ml-2 mr-4" />
          Retour
        </Button>
      </Link>

      <div className="pt-10 pb-10 flex items-center space-x-20">
        <div className="flex flex-col space-y-3 w-[50%]">
          {images.length > 0 ? (
            images.map((imageAnnonces, index) => (
              <Image
                key={index}
                src={imageAnnonces.path}
                alt={`Image ${index + 1}`}
                width={500}
                height={500}
                priority="true"
                style={{ width: "500px", margin: "10px" }}
              />
            ))
          ) : (
            <p>Aucune image disponible</p>
          )}
        </div>

        <div className="w-[50%]">
          <Card className="w-[700px] space-y-2 flex flex-col shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl gap-4">
            <CardHeader>
              <div className="flex items-center space-x-80">
                <CardTitle>Titre : {title}</CardTitle>
                <div
                  className="p-2 rounded-[20px] hover:bg-[#FFEBEC] cursor-pointer"
                  onClick={toggleHeart}
                >
                  {isLiked ? (
                    <AiFillHeart size={24} color="#FC1111" />
                  ) : (
                    <AiOutlineHeart size={24} color="#FC1111" />
                  )}
                </div>
              </div>
              <CardDescription>
                {description.substring(0, 300)}...
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-center">
              <Button onClick={handleMessageRoot} className="w-full">
                Contacter le propriétaire de l&apos;annonce
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="flex items-start w-full pt-10">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="flex space-x-4">
            <TabsTrigger
              value="description"
              className="relative py-2 px-4 text-md font-medium  hover:bg-transparent hover:text-[#15213D] active:bg-transparent active:"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="avis"
              className="relative py-2 px-4 text-md font-medium  hover:bg-transparent hover:text-[#15213D] active:bg-transparent active:"
            >
              Avis
            </TabsTrigger>
            <TabsTrigger
              value="localisation"
              className="relative py-2 px-4 text-md font-medium"
            >
              Localisation
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transform scale-x-0 transition-transform duration-300"></span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <Card className="border-none bg-inherit">
              <CardHeader>
                {/* description détaillée */}
                <CardTitle>Description détaillée</CardTitle>
              </CardHeader>
              <CardContent className="space-y-7">
                <div className="space-y-1">
                  la description est :{description}
                </div>
              </CardContent>

              <CardFooter></CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="avis">
            <Card className="border-none bg-inherit">
              <CardHeader className="space-y-4">
                <CardTitle className="text-[#23262F]">
                  Laissez un avis
                </CardTitle>
                <CardDescription className="text-[#303236] text-[16px] ">
                  Exprimez-vous, commentez et déposez un avis. Partagez vos
                  expériences avec les autres.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="mb-6  flex justify-between items-center space-x-3">
                  <input
                    type="text"
                    placeholder="Exprimez-vous..."
                    className="border border-gray-300 p-2 w-full rounded-lg"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <Button
                    className="py-4 px-5 text-[17px] rounded-[10px]"
                    onClick={handlePublish}
                  >
                    Publier
                    <FaArrowRight className="ml-2" />
                  </Button>
                </div>

                <div className="flex justify-between pt-7">
                  <p className="font-semibold">
                    {comments.length} commentaires
                  </p>
                  <div>
                    <h3 className="text-xl">
                      <strong>Moyenne des notes:</strong>{" "}
                      {averageRating.toFixed(1)}/5
                    </h3>
                    <div className="flex space-x-1">
                      {renderStars(averageRating)}
                    </div>
                  </div>
                  <Select>
                    <SelectTrigger className="w-fit px-4">
                      <SelectValue placeholder="Selectionner les commentaires" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">
                          Tous les commentaires
                        </SelectItem>
                        <SelectItem value="newest">Les plus récents</SelectItem>
                        <SelectItem value="latest">Les plus anciens</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {comments.map((commentItem, index) => (
                  <div key={index} className="flex justify-between pt-8 pr-7">
                    <div className="flex space-x-5 border border-grey w-full p-2 rounded-lg">
                      <div>
                        <Avatar>
                          <AvatarImage
                            src={
                              commentItem.user.profileImage ||
                              "https://github.com/shadcn.png"
                            }
                            alt={commentItem.user.nom}
                          />
                          <AvatarFallback>Photo</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="space-y-3 flex-grow">
                        <div className="flex justify-between items-center">
                          {" "}
                          {/* Conteneur flex pour le nom/prénom et le dropdown */}
                          <p className="text-[#182135] font-bold text-[18px] hover:underline hover:cursor-default">
                            {commentItem.user.nom} {commentItem.user.prenom}
                          </p>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button variant="link" className="text-xs">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuContent>
                                <DropdownMenuGroup>
                                  <DropdownMenuItem>
                                    <Button
                                      variant="link"
                                      className="flex items-center"
                                      onClick={() =>
                                        handleEditComment(commentItem)
                                      }
                                    >
                                      <EditIcon className="mr-2 h-4 w-4" />
                                      Modifier
                                    </Button>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Button
                                      variant="link"
                                      className="flex items-center"
                                      onClick={() =>
                                        handleDeleteClick(commentItem)
                                      }
                                    >
                                      <DeleteIcon className="mr-2 h-4 w-4" />
                                      Supprimer
                                    </Button>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Button
                                      variant="link"
                                      className="flex items-center"
                                      // onClick={handleRating}
                                      onClick={() => handleRating(commentItem)}
                                    >
                                      <StarIcon className="mr-2 h-4 w-4" />
                                      Notes
                                    </Button>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenuPortal>
                          </DropdownMenu>
                        </div>
                        {editCommentId === commentItem.id ? (
                          <Textarea
                            type="text"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            className="border border-gray-300 p-2 w-full rounded-lg"
                          />
                        ) : (
                          <p>{commentItem.commentaire}</p>
                        )}

                        <div className="flex justify-between items-center pt-4">
                          {!editCommentId && (
                            <>
                              {commentItem.updatedAt &&
                              commentItem.updatedAt ===
                                commentItem.createdAt ? (
                                <span className="text-sm text-gray-500">
                                  Publié le :{" "}
                                  {new Date(
                                    commentItem.createdAt
                                  ).toLocaleDateString()}{" "}
                                  à{" "}
                                  {new Date(
                                    commentItem.createdAt
                                  ).toLocaleTimeString(undefined, {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              ) : (
                                commentItem.updatedAt && (
                                  <span className="text-sm text-gray-500">
                                    Modifié le :{" "}
                                    {new Date(
                                      commentItem.updatedAt
                                    ).toLocaleDateString()}{" "}
                                    à{" "}
                                    {new Date(
                                      commentItem.updatedAt
                                    ).toLocaleTimeString(undefined, {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                )
                              )}
                            </>
                          )}
                          <div>
                            {commentItem.note ? (
                              <div className="flex space-x-1">
                                {renderStars(commentItem.note)}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        {editCommentId === commentItem.id && (
                          <div className="flex space-x-4">
                            <Button onClick={handleUpdateComment}>
                              Mettre à jour
                            </Button>
                            <Button
                              variant="outline"
                              onClick={handleCancelEdit}
                            >
                              Annuler
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="localisation">
            <div className="w-full h-[500px]">
              {iframeSrc ? (
                <iframe
                  src={iframeSrc}
                  fill
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="object-cover w-full h-[490px] rounded-lg"
                ></iframe>
              ) : (
                <p>L&apos; adresse est : {adresse}</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="pt-10 space-y-5">
        <h1 className="text-3xl text-[#23262F] font-semibold">
          Vous pourrez aussi aimer
        </h1>

        <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
          <Link href="/Annonces">
            <Button className="py-4 px-5 text-[17px] rounded-[10px]">
              Voir plus
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />

      <StarRatingDialog
        isOpen={showModalRating}
        annonceId={annonceId} // Pass the annonceId
        // userId={userId} // Pass the userId
        onClose={handleCloseRatingModal}
        commentId={selectedCommentId}
        currentRating={note}
      />
    </div>
  );
};

export default InfoAnnonces;
