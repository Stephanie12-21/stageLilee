"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  StarIcon,
  MapPinIcon,
  TagIcon,
  ImageIcon,
  MapPinned,
  X,
  BadgeEuro,
} from "lucide-react";
import ConfirmDeleteModal from "@/app/(dialog)/delete/page";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { typeTarif } from "@prisma/client";

const InfoAnnonces = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const router = useRouter();
  const [annonceId, setAnnonceId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [typeTarif, setTypeTarif] = useState("");
  const [images, setImages] = useState([]);
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [comments, setComments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  const remainingImages = images.slice(1);
  const remainingCount = remainingImages.length;

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

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
          setPrix(data.prix);
          setTypeTarif(data.typeTarif);
          setImages(data.imageAnnonces);
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
      handleCloseModal();
    }
  };

  const calculateAverageRating = (comments) => {
    if (comments.length === 0) return 0;
    const totalRating = comments.reduce((sum, comment) => {
      return sum + (comment.note || 0);
    }, 0);
    return totalRating / comments.length;
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
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-5 w-5">
            <StarIcon
              className="absolute h-full w-full fill-yellow-400 text-yellow-400"
              style={{ clipPath: "inset(0 0.5em 0 0)" }}
            />
            <StarIcon
              className="absolute h-full w-full fill-gray-400  text-gray-400"
              style={{ clipPath: "inset(0 0 0 0.5em)" }}
            />
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-400" />);
      }
    }
    return stars;
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-primary p-6">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <div className="flex items-center space-x-4">
            {renderStars(averageRating)}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <TagIcon className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Catégorie:</strong> {category}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <TagIcon className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Sous-catégorie:</strong> {subcategory}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <BadgeEuro className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Tarification:</strong> {prix} euros
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <BadgeEuro className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Type de tarif:</strong> {typeTarif}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <MapPinIcon className="text-green-500 h-6 w-6" />
                <p className="text-gray-700">
                  <strong>Adresse:</strong> {adresse}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <div
                  className="text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html:
                      description.replace(/^"|"$/g, "") ||
                      "<p>Contenu non disponible.</p>",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ImageIcon className="text-purple-500 h-6 w-6" />
                <h3 className="text-xl font-semibold">Images</h3>
              </div>
              {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {images[0]?.path && (
                    <div onClick={() => openLightbox(0)}>
                      <Image
                        src={images[0].path}
                        alt="First Image"
                        width={800}
                        height={600}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "400px",
                          objectFit: "cover",
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                  )}

                  {remainingCount > 0 && (
                    <div
                      className="flex items-center justify-center p-4 bg-gray-200 cursor-pointer rounded-lg"
                      onClick={() => openLightbox(0)}
                    >
                      <p className="text-gray-700">
                        +{remainingCount}{" "}
                        {remainingCount > 1 ? "autres photos" : "autre photo"}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Aucune image disponible</p>
              )}
            </div>

            {isLightboxOpen && (
              <div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                style={{
                  backdropFilter: "blur(10px)",
                  margin: 0,
                  padding: 0,
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  boxSizing: "border-box",
                }}
              >
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  className="w-full max-w-3xl"
                  initialSlide={currentIndex}
                  onSlideChange={(swiper) =>
                    setCurrentIndex(swiper.activeIndex)
                  }
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={image.path}
                        alt={`Image ${index + 1}`}
                        width={1200}
                        height={900}
                        style={{
                          maxWidth: "90%",
                          maxHeight: "90vh",
                          objectFit: "contain",
                          borderRadius: "10px",
                          margin: "auto",
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  className="absolute top-4 right-4 hover:bg-[#9B9B9B] text-white p-2 rounded-full"
                  onClick={() => setLightboxOpen(false)}
                >
                  <X />
                </button>
              </div>
            )}
            {localisation && (
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MapPinned className="text-green-500 h-6 w-6" />
                  <h3 className="text-xl font-semibold">Itinéraire à suivre</h3>
                </div>
                <iframe
                  src={localisation}
                  width="100%"
                  height="300"
                  className="rounded-lg shadow-md"
                  style={{ border: "0" }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default InfoAnnonces;
