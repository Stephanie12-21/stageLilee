"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MapPinIcon,
  TagIcon,
  ImageIcon,
  X,
  BadgeEuro,
  Globe,
  AtSign,
  PhoneCall,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const InfoAnnonces = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const router = useRouter();
  const [pubId, setPubId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setLightboxOpen] = useState(false);
  const [phoneMarque, setPhoneMarque] = useState("");
  const [nomMarque, setNomMarque] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [emailMarque, setEmailMarque] = useState("");
  const [adresseMarque, setAdresseMarque] = useState("");
  const [DebutPub, setDebutPub] = useState("");
  const [FinPub, setFinPub] = useState("");
  const [errors, setErrors] = useState({});
  const [contenuPub, setContenuPub] = useState([]);
  const remainingImages = contenuPub.slice(1);
  const remainingCount = remainingImages.length;

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  useEffect(() => {
    async function fetchPubs() {
      try {
        const response = await fetch(`/api/pub/${id}`);
        if (response.ok) {
          const data = await response.json();

          setPubId(data.id);
          setNomMarque(data.nomMarque);
          setEmailMarque(data.emailMarque);
          setAdresseMarque(data.adresseMarque);
          setPhoneMarque(data.phoneMarque);
          setSiteWeb(data.siteWeb);
          setDebutPub(data.DebutPub);
          setFinPub(data.FinPub);
          setContenuPub(data.contenuPub);
        } else {
          console.error("Publicite non trouvée, avec l'id Publicite :", id);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la Publicite :",
          error
        );
      }
    }
    fetchPubs();
  }, [id]);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="flex justify-between items-center bg-primary p-6">
          <h1 className="text-3xl font-bold text-white">{nomMarque}</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <AtSign className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Email:</strong> {emailMarque}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneCall className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Numero de telephone:</strong> {phoneMarque}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="text-blue-500 h-6 w-6" />
                <p className="font-semibold text-gray-700">
                  <strong>Site web:</strong> {siteWeb}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <MapPinIcon className="text-green-500 h-6 w-6" />
                <p className="text-gray-700">
                  <strong>Adresse:</strong> {adresseMarque}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ImageIcon className="text-purple-500 h-6 w-6" />
                <h3 className="text-xl font-semibold">Images</h3>
              </div>
              {contenuPub.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {contenuPub[0]?.path && (
                    <div onClick={() => openLightbox(0)}>
                      <Image
                        src={contenuPub[0].path}
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
                  {contenuPub.map((image, index) => (
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoAnnonces;
