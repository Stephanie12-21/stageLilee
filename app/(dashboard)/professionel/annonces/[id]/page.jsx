"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DeleteIcon, EditIcon, MoreHorizontal, StarIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import ConfirmDeleteModal from "@/app/(dialog)/delete/page";
import StarRatingDialog from "@/app/(dialog)/note/page";

const InfoAnnonces = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [annonceId, setAnnonceId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
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

  useEffect(() => {
    async function fetchAnnonce() {
      try {
        const response = await fetch(`/api/annonce/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAnnonceId(data.id);
          setTitle(data.titre);
          setCategory(data.categorieAnnonce);
          setSubCategory(data.sousCategorie);
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
    return totalRating / comments.length; // Retourne la moyenne
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

  return (
    <div className="container mx-auto flex">
      <div className="w-1/2 p-4">
        <h1 className="text-3xl">
          <strong>Titre:</strong> {title}
        </h1>
        <p>
          <strong>Catégorie:</strong> {category}
        </p>
        <p>
          <strong>Sous catégorie:</strong> {subCategory}
        </p>
        <div
          className="text-[#353945] font-medium text-[18px] pt-4"
          dangerouslySetInnerHTML={{
            __html:
              description.replace(/^"|"$/g, "") ||
              "<p>Contenu non disponible.</p>",
          }}
        />
        <p>
          <strong>Adresse:</strong> {adresse}
        </p>
        <p>
          <strong>ID de l&apos;annonce:</strong> {annonceId}
        </p>
        <div>
          <h3 className="text-xl">
            <strong>Moyenne des notes:</strong> {averageRating.toFixed(1)}/5
          </h3>
          <div className="flex space-x-1">{renderStars(averageRating)}</div>
        </div>
        <div>
          <h3>
            <strong>Images :</strong>
          </h3>
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

        <div>
          <h3>Localisation</h3>
          {iframeSrc ? (
            <iframe
              src={iframeSrc}
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          ) : (
            <p>Localisation non disponible</p>
          )}
        </div>
      </div>

      <div className="w-1/2 p-4">
        <h3 className="text-3xl underline">Commentaires</h3>
        <div className="mb-6 pt-5 pr-7 flex justify-between items-center space-x-3">
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
          </Button>
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
                              onClick={() => handleEditComment(commentItem)}
                            >
                              <EditIcon className="mr-2 h-4 w-4" />
                              Modifier
                            </Button>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Button
                              variant="link"
                              className="flex items-center"
                              onClick={() => handleDeleteClick(commentItem)}
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
                      commentItem.updatedAt === commentItem.createdAt ? (
                        <span className="text-sm text-gray-500">
                          Publié le :{" "}
                          {new Date(commentItem.createdAt).toLocaleDateString()}{" "}
                          à{" "}
                          {new Date(commentItem.createdAt).toLocaleTimeString(
                            undefined,
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      ) : (
                        commentItem.updatedAt && (
                          <span className="text-sm text-gray-500">
                            Modifié le :{" "}
                            {new Date(
                              commentItem.updatedAt
                            ).toLocaleDateString()}{" "}
                            à{" "}
                            {new Date(commentItem.updatedAt).toLocaleTimeString(
                              undefined,
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
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
                    <Button onClick={handleUpdateComment}>Mettre à jour</Button>
                    <Button variant="outline" onClick={handleCancelEdit}>
                      Annuler
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
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
