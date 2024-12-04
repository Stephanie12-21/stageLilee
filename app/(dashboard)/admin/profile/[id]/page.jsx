"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

const UserProfilePreview = () => {
  const router = useRouter();
  const { id: userId } = useParams();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [showVerifInfo, setShowVerifInfo] = useState(false);
  const [editedUser, setEditedUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  });

  const [verificationCodes, setVerificationCodes] = useState({
    email: "",
    phone: "",
  });
  console.log("usesession hook session object", session);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data.user);
      setProfileImage(
        data.user.profileImages[0]?.path || "aucune image relative à ce compte"
      );
      setEditedUser({
        nom: data.user.nom,
        prenom: data.user.prenom,
        email: data.user.email,
        phone: data.user.phone,
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  const handleEditClick = async () => {
    if (isEditing) {
      const generatedCodes = generateVerificationCodes();
      setVerificationCodes(generatedCodes);

      // Send email verification
      try {
        const response = await fetch("/api/user/emailVerif/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: editedUser.email,
            prenom: editedUser.prenom,
            verificationCode: generatedCodes.email,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi de l'e-mail");
        }
        console.log("E-mail envoyé avec succès");
        setShowVerifInfo(true);
      } catch (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      // Send SMS verification
      const phone = `+${editedUser.phone}`;
      try {
        const response = await fetch("/api/user/verifPhone/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Phone: phone,
            prenom: editedUser.prenom,
            verificationCode: generatedCodes.phone,
          }),
        });

        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du SMS");
        }
        console.log("SMS envoyé avec succès");
        console.log(
          "Code de vérification envoyé par SMS:",
          generatedCodes.phone
        );
        setShowVerifInfo(true);
      } catch (error) {
        console.error(error);
        alert(error.message);
        return;
      }
    } else {
      setIsEditing(true);
    }
  };

  const generateVerificationCodes = () => {
    const emailVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    console.log(emailVerificationCode);
    const phoneVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    return { email: emailVerificationCode, phone: phoneVerificationCode };
    // return { email: emailVerificationCode };
  };

  const handleVerifyCodes = (enteredEmailCode, enteredPhoneCode) => {
    if (
      enteredEmailCode === verificationCodes.email &&
      enteredPhoneCode === verificationCodes.phone
    ) {
      handleConfirmEdit(); // Appel à la fonction de mise à jour des données
    } else {
      alert(
        "Les codes de vérification ne correspondent pas. Veuillez réessayer."
      );
    }
    setShowVerifInfo(false); // Fermer le dialogue
  };

  const handleConfirmEdit = async () => {
    const formData = new FormData();
    formData.append("nom", editedUser.nom);
    formData.append("prenom", editedUser.prenom);
    formData.append("email", editedUser.email);
    formData.append("phone", editedUser.phone);

    if (imageDetails) {
      formData.append("image", imageDetails);
    }

    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Échec de la mise à jour du profil utilisateur");
      }

      await fetchUserData();
      setIsEditing(false);
      alert("Profil mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
    }
  };

  // pour gérer les valeurs des champs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //abandonner les modifications
  const handleCancelEdit = () => {
    setShowVerifInfo(false); // Fermer le dialogue sans enregistrer
  };

  //pour les images
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageDetails(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <p>Chargement des informations...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!user) {
    return <p>Aucune information utilisateur disponible.</p>;
  }
  if (!userId) {
    return <p>Utilisateur introuvable</p>;
  }

  //pour la suppression des données
  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'article avec l'ID : ${userId}?`
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/user/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert(`L'user avec l'ID : ${userId} a été supprimé.`);
        } else {
          throw new Error("Erreur lors de la suppression de l'user.");
        }
      } catch (error) {
        alert("Erreur lors de la suppression de l'user.");
        console.error("Erreur lors de la suppression de l'user :", error);
      }
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto bg-white shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 border flex items-center justify-center p-8">
                <Avatar className="w-52 h-52">
                  <AvatarImage
                    src={profileImage}
                    alt={`${user.nom} ${user.prenom}`}
                    className="object-cover rounded-full"
                  />
                  <AvatarFallback className="bg-blue-200 text-blue-700 text-6xl w-full h-full">
                    {user.nom[0]}
                    {user.prenom[0]}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <ImagePlus className="text-8xl text-blue-500" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="md:w-1/2 p-8 space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Profil Utilisateur
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="prenom"
                        className="text-sm font-medium text-gray-600"
                      >
                        Prénom
                      </Label>
                      <Input
                        id="prenom"
                        value={isEditing ? editedUser.prenom : user.prenom}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        className={`bg-gray-50 ${
                          isEditing ? "" : "cursor-not-allowed"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="nom"
                        className="text-sm font-medium text-gray-600"
                      >
                        Nom
                      </Label>
                      <Input
                        id="nom"
                        value={isEditing ? editedUser.nom : user.nom}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        className={`bg-gray-50 ${
                          isEditing ? "" : "cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-600"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedUser.email : user.email}
                      readOnly={!isEditing}
                      onChange={handleInputChange}
                      className={`bg-gray-50 ${
                        isEditing ? "" : "cursor-not-allowed"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-600"
                    >
                      Numéro de téléphone
                    </Label>
                    <PhoneInput
                      country={"fr"}
                      value={isEditing ? editedUser.phone : user.phone}
                      onChange={(phone) => {
                        setEditedUser((prevState) => ({
                          ...prevState,
                          phone: `+${phone}`,
                        }));
                      }}
                      readOnly={!isEditing}
                      inputClass={`bg-gray-50 ${
                        isEditing ? "" : "cursor-not-allowed"
                      }`}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleEditClick}
                    className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {isEditing
                      ? "Enregistrer les modifications"
                      : "Modifier le profil"}
                  </button>
                  {!isEditing && (
                    <button
                      onClick={handleDeleteClick}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Supprimer le profil
                    </button>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {showVerifInfo && (
        <CodeVerificationDialog
          onVerify={handleVerifyCodes}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
};

export default UserProfilePreview;
const CodeVerificationDialog = ({ onVerify, onCancel }) => {
  const [emailCodeInput, setEmailCodeInput] = useState("");
  const [phoneCodeInput, setPhoneCodeInput] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold">Vérification des codes</h2>
        <div className="mt-4">
          <Label htmlFor="emailCode" className="text-sm font-medium">
            Code email
          </Label>
          <Input
            id="emailCode"
            value={emailCodeInput}
            onChange={(e) => setEmailCodeInput(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="phoneCode" className="text-sm font-medium">
            Code téléphone
          </Label>
          <Input
            id="phoneCode"
            value={phoneCodeInput}
            onChange={(e) => setPhoneCodeInput(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => {
              onVerify(emailCodeInput, phoneCodeInput);
              setEmailCodeInput("");
              setPhoneCodeInput("");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Vérifier
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};
