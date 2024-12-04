"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ImagePlus, Loader2, Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    const phoneVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    return { email: emailVerificationCode, phone: phoneVerificationCode };
    return { email: emailVerificationCode };
  };

  const handleVerifyCodes = (enteredEmailCode, enteredPhoneCode) => {
    if (
      enteredEmailCode === verificationCodes.email &&
      enteredPhoneCode === verificationCodes.phone
    ) {
      handleConfirmEdit();
    } else {
      alert(
        "Les codes de vérification ne correspondent pas. Veuillez réessayer."
      );
    }
    setShowVerifInfo(false);
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

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleCancelEdit = () => {
    setShowVerifInfo(false);
  };

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
              <div className="w-full md:w-2/3 bg-primary flex flex-col items-center justify-center p-8 relative">
                <div className="relative group">
                  <Avatar className="w-52 h-52 border-4 border-white shadow-lg transition-all duration-300 ease-in-out group-hover:scale-105">
                    <AvatarImage
                      src={profileImage}
                      alt={`${user.nom} ${user.prenom}`}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-blue-200 text-blue-700 text-4xl">
                      {user.nom[0]}
                      {user.prenom[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-100">
                      <ImagePlus className="w-6 h-6 text-blue-500" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <h2 className="mt-6 text-2xl font-bold text-white text-center">
                  {user.prenom} {user.nom}
                </h2>
                <p className="mt-2 text-blue-100 text-center">{user.email}</p>
              </div>

              <div className="md:w-1/2 lg:w-full p-8 space-y-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Profil Utilisateur
                </h2>

                <div className="space-y-4 mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-0">
                    <div className="space-y-2">
                      <Label
                        htmlFor="prenom"
                        className="text-base font-semibold text-gray-600"
                      >
                        Prénoms
                      </Label>
                      <Input
                        id="prenom"
                        value={isEditing ? editedUser.prenom : user.prenom}
                        readOnly={!isEditing}
                        onChange={handleInputChange}
                        className={`bg-gray-50 text-base ${
                          isEditing ? "" : "cursor-not-allowed"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="nom"
                        className="text-base font-semibold text-gray-600"
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
                </div>

                <div className="space-y-4 mb-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-0">
                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-base font-semibold text-gray-600"
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
                        className="text-base font-semibold text-gray-600"
                      >
                        Numéro de téléphone
                      </Label>
                      <div className="relative w-full">
                        <PhoneInput
                          country={"fr"}
                          value={isEditing ? editedUser.phone : user.phone}
                          onChange={(phone) => {
                            setEditedUser((prevState) => ({
                              ...prevState,
                              phone: `+${phone}`,
                            }));
                          }}
                          inputProps={{
                            id: "phone",
                            readOnly: !isEditing,
                          }}
                          inputClass={`!w-full bg-gray-50 ${
                            isEditing ? "" : "cursor-not-allowed"
                          }`}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 space-y-2">
                  <button
                    onClick={handleEditClick}
                    className="mr-4 bg-primary w-full text-white px-4 py-2 rounded"
                  >
                    {isEditing
                      ? "Enregistrer les modifications"
                      : "Modifier le profil"}
                  </button>
                  {!isEditing && (
                    <button
                      onClick={handleDeleteClick}
                      className="bg-red-500 text-white text-base font-semibold w-full px-4 py-2 rounded"
                    >
                      Supprimer le profil
                    </button>
                  )}
                  {isEditing && (
                    <button
                      onClick={() => setIsEditing(false)}
                      className=" bg-gray-400 text-white text-base font-semibold w-full px-4 py-2 rounded"
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

  const handleVerify = () => {
    onVerify(emailCodeInput, phoneCodeInput);
    setEmailCodeInput("");
    setPhoneCodeInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md px-4"
      >
        <Card className="relative p-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Vérification des codes
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={onCancel}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer</span>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="emailCode">Code email</Label>
              <Input
                id="emailCode"
                value={emailCodeInput}
                onChange={(e) => setEmailCodeInput(e.target.value)}
                placeholder="Entrez le code reçu par email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneCode">Code téléphone</Label>
              <Input
                id="phoneCode"
                value={phoneCodeInput}
                onChange={(e) => setPhoneCodeInput(e.target.value)}
                placeholder="Entrez le code reçu par SMS"
              />
            </div>
          </CardContent>
          <CardFooter className=" w-full flex flex-col justify-between space-y-4">
            <Button className="w-full" onClick={handleVerify}>
              Vérifier
            </Button>
            <Button variant="secondary" className="w-full" onClick={onCancel}>
              Annuler
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};
