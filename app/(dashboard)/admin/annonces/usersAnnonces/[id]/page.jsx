"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InfoAnnonces = ({ params }) => {
  const { id } = params;
  const [annonceId, setAnnonceId] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [localisation, setLocalisation] = useState("");
  const [adresse, setAdresse] = useState("");
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    async function fetchAnnonce() {
      try {
        const response = await fetch(`/api/annonce/${id}`);
        if (response.ok) {
          const data = await response.json();
          //console.log("les données reçues sont : ", data);

          // On vérifie si 'user' est disponible avant d'afficher le nom
          const userName = data.user
            ? `${data.user.prenom} ${data.user.nom}`
            : "Utilisateur non trouvé";
          const userId = data.user ? `${data.user.id}` : "ID user non trouvé";
          // console.log("l'user qui a publié est :", userName);
          // console.log("l'ID user qui a publié est :", userId);

          // Mise à jour des états avec les données reçues
          setAnnonceId(data.id);
          setTitle(data.titre);
          setCategory(data.categorieAnnonce);
          setDescription(data.description);
          setAdresse(data.adresse);
          setLocalisation(data.localisation);
          setImages(data.imageAnnonces);
          setUserName(userName);
          setUserId(userId);
          if (data.localisation) setIframeSrc(data.localisation); // Mise à jour de l'iframe
        } else {
          console.error("Annonce non trouvée, avec l'id annonce :", id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    }

    fetchAnnonce();
  }, [id]);
  return (
    <div className="container mx-auto justify-center items-center">
      <div className="flex flex-col space-y-5">
        <p>Titre : {title}</p>
        <p>Description : {description}</p>
        <p>Catégorie : {category}</p>
        <p>Adresse : {adresse}</p>
        <p>Publié par :{userName}</p>
        <p>
          Localisation :{" "}
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
        </p>
        <p>
          Photos :
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
        </p>
      </div>
    </div>
  );
};

export default InfoAnnonces;
