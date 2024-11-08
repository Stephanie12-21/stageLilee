"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfilePreview = () => {
  const [siret, setSiret] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Pour stocker les messages d'erreur
  const [siretValid, setSiretValid] = useState(null); // Pour stocker l'état de la validation
  const router = useRouter();
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [companyInfo, setCompanyInfo] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [secteurActivite, setSecteurActivite] = useState(null);
  const [typeSociete, setTypeSociete] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [showVerifInfo, setShowVerifInfo] = useState(false);
  const [editedUser, setEditedUser] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
  });
  const [editedCompany, setEditedCompany] = useState({
    companyId: "",
    nomSociete: "",
    siret: "",
    codePostal: "",
    ville: "",
    secteurActivite: "", // Valeur par défaut
    typeSociete: "", // Valeur par défaut
  });

  //récupérer les données depuis le server
  const fetchUserData = useCallback(async () => {
    setLoading(true); // Démarrer le chargement au début de la fonction
    try {
      const response = await fetch(`/api/userPro/${userId}`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des données utilisateur."
        );
      }
      const data = await response.json();

      // Afficher les données dans la console pour vérification
      console.log("Données récupérées de l'API :", data);

      // Vérification que 'data.user' existe avant d'accéder à ses propriétés
      if (!data.user) {
        throw new Error("Aucune donnée utilisateur trouvée.");
      }

      setUser(data.user);
      setProfileImage(
        data.user.profileImages[0]?.path || "Aucune image relative à ce compte"
      );

      // Assurez-vous que tous les champs existent avant de les utiliser
      setEditedUser({
        nom: data.user.nom || "",
        prenom: data.user.prenom || "",
        email: data.user.email || "",
        phone: data.user.phone || "",
        nomSociete: data.user.company?.nomSociete || "", // Accès aux données de la société
        ville: data.user.company?.ville || "", // Accès aux données de la société
        siret: data.user.company?.siret || "", // Accès aux données de la société
        typeSociete: data.user.company?.typeSociete || "", // Accès aux données de la société
        codePostal: data.user.company?.codePostal || "", // Accès aux données de la société
        companyId: data.user.company?.id || "",
        secteurActivite: data.user.company?.secteurActivite || "", // Accès aux données de la société
      });
    } catch (error) {
      setError(
        error.message ||
          "Une erreur est survenue lors du chargement des données."
      );
    } finally {
      setLoading(false); // Assurez-vous que le chargement est désactivé à la fin
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  ////////////////////////////FONCTION POUR LES MODIFICATIONS DE L'ADMIN DU COMPTE////////////////////
  //fonction pour modifier les données de l'admin du compte
  const handleEditClick = async () => {
    if (isEditing) {
      const generatedCodes = generateVerificationCodes();
      setVerificationCodes(generatedCodes);

      // Send email verification
      try {
        const response = await fetch("/api/user/verifEmail/", {
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
      //   const phone = `+${editedUser.phone}`;
      //   try {
      //     const response = await fetch("/api/user/verifPhone/", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         Phone: phone,
      //         prenom: editedUser.prenom,
      //         verificationCode: generatedCodes.phone,
      //       }),
      //     });

      //     if (!response.ok) {
      //       throw new Error("Erreur lors de l'envoi du SMS");
      //     }
      //     console.log("SMS envoyé avec succès");
      //     console.log(
      //       "Code de vérification envoyé par SMS:",
      //       generatedCodes.phone
      //     );
      //     setShowVerifInfo(true);
      //   } catch (error) {
      //     console.error(error);
      //     alert(error.message);
      //     return;
      //   }
    } else {
      setIsEditing(true);
    }
  };

  const [verificationCodes, setVerificationCodes] = useState({
    email: "",
    phone: "",
  });

  //générer les codes de vérification
  const generateVerificationCodes = () => {
    const emailVerificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // const phoneVerificationCode = Math.floor(
    //   100000 + Math.random() * 900000
    // ).toString();
    // return { email: emailVerificationCode, phone: phoneVerificationCode };
    return { email: emailVerificationCode };
  };

  //vérifier les codes saisis et envoyés
  const handleVerifyCodes = (enteredEmailCode, enteredPhoneCode) => {
    if (
      enteredEmailCode === verificationCodes.email
      //&&
      //enteredPhoneCode === verificationCodes.phone
    ) {
      handleConfirmEdit(); // Appel à la fonction de mise à jour des données
    } else {
      alert(
        "Les codes de vérification ne correspondent pas. Veuillez réessayer."
      );
    }
    setShowVerifInfo(false); // Fermer le dialogue
  };

  //confirmer les modifications
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
      const response = await fetch(`/api/userPro/${userId}`, {
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

  //pour gérer les valeurs des champs
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setEditedCompany((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  //abandonner les modifications
  const handleCancelEdit = () => {
    setShowVerifInfo(false); // Fermer le dialogue sans enregistrer
  };

  //pour la suppression des données
  const handleDeleteClick = async () => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'article avec l'ID : ${userId}?`
    );
    if (confirmed) {
      try {
        const response = await fetch(`/api/userPro/${userId}`, {
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
  ////////////////////////////FONCTION POUR LES MODIFICATIONS DE L'ADMIN DU COMPTE////////////////////

  ////////////////////////////FONCTION POUR LES MODIFICATIONS DE LA SOCIETE////////////////////
  //fonction pour la vérification du siret
  const verifySiret = async () => {
    const sanitizedSiret = editedCompany.siret.replace(/\s/g, "");

    if (!/^\d{14}$/.test(sanitizedSiret)) {
      console.error(
        "Erreur : Le numéro de SIRET doit contenir exactement 14 chiffres."
      );
      setErrorMessage(
        "Le numéro de SIRET doit contenir exactement 14 chiffres."
      );
      setSiretValid(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.insee.fr/entreprises/sirene/V3.11/siret/${sanitizedSiret}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer e16f36fb-f659-327f-bad1-7554578ceff5`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 404) {
        console.error("Erreur : Le numéro de SIRET n'existe pas.");
        setErrorMessage("Le numéro de SIRET n'existe pas.");
        setSiretValid(false);
      } else if (!response.ok) {
        const errorText = await response.json();
        console.error(
          "Erreur lors de la vérification du numéro de SIRET :",
          errorText
        );
        setErrorMessage(
          errorText.message ||
            "Erreur lors de la vérification du numéro de SIRET."
        );
        setSiretValid(false);
      } else {
        const data = await response.json();
        if (data && data.etablissement) {
          console.log("Le numéro de SIRET est valide :", data.etablissement);
          setErrorMessage("");
          setCompanyInfo(data.etablissement);
          setSiretValid(true);

          // Appeler la fonction de comparaison
          compareFormValues(data.etablissement);
        } else {
          console.error(
            "Erreur : Le SIRET a été trouvé, mais la propriété attendue n'est pas présente."
          );
          setErrorMessage(
            "Le numéro de SIRET est valide, mais des informations sont manquantes."
          );
          setSiretValid(true);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du SIRET :", error);
      setErrorMessage("Erreur lors de la vérification du SIRET.");
      setSiretValid(false);
    }
  };

  //comparer les données reçues et les données saisies
  const compareFormValues = (companyInfo) => {
    const Adresse =
      `${companyInfo.adresseEtablissement.numeroVoieEtablissement} ${companyInfo.adresseEtablissement.typeVoieEtablissement} ${companyInfo.adresseEtablissement.libelleVoieEtablissement}`.trim();
    const Ville =
      companyInfo.adresseEtablissement.libelleCommuneEtablissement.trim();
    const NomSociete = companyInfo.uniteLegale.denominationUniteLegale.trim();
    const CodePostal =
      companyInfo.adresseEtablissement.codePostalEtablissement.trim();

    console.log("Données récupérées pour comparaison :", {
      Adresse,
      Ville,
      CodePostal,
      NomSociete,
    });
    console.log("Données saisies dans le formulaire :", {
      adresse: editedCompany.adresse,
      ville: editedCompany.ville,
      nomSociete: editedCompany.nomSociete,
      codePostal: editedCompany.codePostal,
    });

    let mismatchMessages = [];

    // Comparer chaque champ individuellement et ajouter un message si non correspondant
    if (Adresse !== editedCompany.adresse) {
      mismatchMessages.push(
        `Adresse ne correspond pas : attendu "${Adresse}", reçu "${editedCompany.adresse}"`
      );
    }
    if (Ville !== editedCompany.ville) {
      mismatchMessages.push(
        `Ville ne correspond pas : attendu "${Ville}", reçu "${editedCompany.ville}"`
      );
    }
    if (NomSociete !== editedCompany.nomSociete) {
      mismatchMessages.push(
        `Nom de la société ne correspond pas : attendu "${NomSociete}", reçu "${editedCompany.nomSociete}"`
      );
    }
    if (CodePostal !== editedCompany.codePostal) {
      mismatchMessages.push(
        `Code postal ne correspond pas : attendu "${CodePostal}", reçu "${editedCompany.codePostal}"`
      );
    }

    if (mismatchMessages.length === 0) {
      console.log("La modification a réussi : les informations correspondent.");
      setErrorMessage("Modification réussie !");
    } else {
      console.error(
        "Échec de la modification : les informations ne correspondent pas."
      );
      mismatchMessages.forEach((msg) => console.error(msg));
      setErrorMessage(
        "Échec de la modification : certaines informations ne correspondent pas."
      );
    }
  };

  //modifier les données
  const handleEditCompanyClick = async () => {
    if (isEditingCompany) {
      verifySiret();
      const formData = new FormData();
      formData.append("nomSociete", editedCompany.nomSociete);
      formData.append("siret", editedCompany.siret);
      formData.append("codePostal", editedCompany.codePostal);
      formData.append("ville", editedCompany.ville);
      formData.append("adresse", editedCompany.adresse);
      formData.append("secteurActivite", editedCompany.secteurActivite);
      formData.append("typeSociete", editedCompany.typeSociete);

      if (imageDetails) {
        formData.append("image", imageDetails);
      }

      try {
        const response = await fetch(
          `/api/userPro/company/${user.company.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Échec de la mise à jour du profil utilisateur");
        }

        await fetchUserData();
        setIsEditingCompany(false);
        alert("Profil mis à jour avec succès !");
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil :", error);
        alert("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
      }
    } else {
      setEditedCompany({
        siret: "",
        adresse: "",
        codePostal: "",
        nomSociete: "",
        ville: "",
        secteurActivite: "",
        typeSociete: "",
      });
      setIsEditingCompany(true);
    }
  };

  //pour la suppression des données de la société
  const handleDeleteCompanyClick = async () => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer la société avec l'ID : ${user.company.id}`
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `/api/userPro/company/${user.company.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert(`L'user avec l'ID : ${userId} a été supprimé.`);
          router.push("/userPro");
        } else {
          throw new Error("Erreur lors de la suppression de l'user.");
        }
      } catch (error) {
        alert("Erreur lors de la suppression de l'user.");
        console.error("Erreur lors de la suppression de l'user :", error);
      }
    }
  };

  ////////////////////////////FONCTION POUR LES MODIFICATIONS DE LA SOCIETE////////////////////

  ////////////////////////////FONCTION POUR LA MODIFICATION DE L'IMAGE////////////////////
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
  ////////////////////////////FONCTION POUR LA MODIFICATION DE L'IMAGE////////////////////

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

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto bg-white shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* image */}
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

              <Tabs defaultValue="adminCompte" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="adminCompte">
                    Administrateur du compte
                  </TabsTrigger>
                  <TabsTrigger value="companyInfo">
                    Informations de la société
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="adminCompte">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-gray-800 mb-6">
                        Profil de l&apos;administrateur du compte
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="grid grid-cols-2 gap-4">
                        {/* prénom */}
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

                        {/* nom */}
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

                      {/* email */}
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

                      {/* phone */}
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
                    </CardContent>
                    <CardFooter>
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
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="companyInfo">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-3xl font-bold text-gray-800 mb-6">
                        Profil de la société{" "}
                        {/* <input type="text" value={user.company.id} readOnly /> */}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          {/* SIRET */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="siret"
                              className="text-sm font-medium text-gray-600"
                            >
                              SIRET
                            </Label>
                            <Input
                              id="siret"
                              value={
                                isEditingCompany
                                  ? editedCompany.siret
                                  : user.company.siret
                              }
                              readOnly={!isEditingCompany}
                              onChange={handleInputChange}
                              className={`bg-gray-50 ${
                                isEditingCompany ? "" : "cursor-not-allowed"
                              }`}
                            />
                          </div>

                          {/* NOM DE LA SOCIETE */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="nomSociete"
                              className="text-sm font-medium text-gray-600"
                            >
                              Nom de la société
                            </Label>
                            <Input
                              id="nomSociete"
                              value={
                                isEditingCompany
                                  ? editedCompany.nomSociete
                                  : user.company.nomSociete
                              }
                              readOnly={!isEditingCompany}
                              onChange={handleInputChange}
                              className={`bg-gray-50 ${
                                isEditingCompany ? "" : "cursor-not-allowed"
                              }`}
                            />
                          </div>
                        </div>

                        {/* ADRESSE */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="adresse"
                            className="text-sm font-medium text-gray-600"
                          >
                            Adresse
                          </Label>
                          <Input
                            id="adresse"
                            value={
                              isEditingCompany
                                ? editedCompany.adresse
                                : user.company.adresse
                            }
                            readOnly={!isEditingCompany}
                            onChange={handleInputChange}
                            className={`bg-gray-50 ${
                              isEditingCompany ? "" : "cursor-not-allowed"
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* CODE POSTAL */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="codePostal"
                              className="text-sm font-medium text-gray-600"
                            >
                              Code postal
                            </Label>
                            <Input
                              id="codePostal"
                              value={
                                isEditingCompany
                                  ? editedCompany.codePostal
                                  : user.company.codePostal
                              }
                              readOnly={!isEditingCompany}
                              onChange={handleInputChange}
                              className={`bg-gray-50 ${
                                isEditingCompany ? "" : "cursor-not-allowed"
                              }`}
                            />
                          </div>

                          {/* VILLE */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="ville"
                              className="text-sm font-medium text-gray-600"
                            >
                              Ville
                            </Label>
                            <Input
                              id="ville"
                              value={
                                isEditingCompany
                                  ? editedCompany.ville
                                  : user.company.ville
                              }
                              readOnly={!isEditingCompany}
                              onChange={handleInputChange}
                              className={`bg-gray-50 ${
                                isEditingCompany ? "" : "cursor-not-allowed"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* SECTEUR */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="secteur"
                              className="text-sm font-medium text-gray-600"
                            >
                              Secteur d&apos;activité
                            </Label>
                            <Select
                              className="w-full"
                              value={
                                isEditingCompany
                                  ? editedCompany.secteurActivite
                                  : user.company.secteurActivite || ""
                              }
                              onValueChange={(value) => {
                                if (isEditingCompany) {
                                  setEditedCompany((prevState) => ({
                                    ...prevState,
                                    secteurActivite: value || "",
                                  }));
                                }
                              }}
                              disabled={!isEditingCompany}
                            >
                              <SelectTrigger className="w-full px-4">
                                <SelectValue
                                  placeholder="Sélectionner le secteur"
                                  className="flex items-start"
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="IMMOBILIER">
                                    Immobilier
                                  </SelectItem>
                                  <SelectItem value="VETEMENT">
                                    Vêtements
                                  </SelectItem>
                                  <SelectItem value="EMPLOI">
                                    Emplois / Recrutement
                                  </SelectItem>
                                  <SelectItem value="SERVICE">
                                    Services
                                  </SelectItem>
                                  <SelectItem value="VOITURE">
                                    Voitures
                                  </SelectItem>
                                  <SelectItem value="LOISIR">Loisir</SelectItem>
                                  <SelectItem value="MATERIEL">
                                    Matériels / Equipements
                                  </SelectItem>
                                  <SelectItem value="MOBILIER">
                                    Mobilier
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* TYPE */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="type"
                              className="text-sm font-medium text-gray-600"
                            >
                              Type de société
                            </Label>
                            <Select
                              className="w-full"
                              value={
                                isEditingCompany
                                  ? editedCompany.typeSociete || ""
                                  : user.company.typeSociete || ""
                              }
                              onValueChange={(value) => {
                                if (isEditingCompany) {
                                  setEditedCompany((prevState) => ({
                                    ...prevState,
                                    typeSociete: value || "",
                                  }));
                                }
                              }}
                              disabled={!isEditingCompany}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionner le type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="ENTREPRISE_INDIVIDUELLE">
                                    Entreprise individuelle
                                  </SelectItem>
                                  <SelectItem value="SOCIETE_PRIVEE">
                                    Société privée
                                  </SelectItem>
                                  <SelectItem value="SOCIETE_PUBLIQUE">
                                    Société publique
                                  </SelectItem>
                                  <SelectItem value="COOPERATIVE">
                                    Coopérative
                                  </SelectItem>
                                  <SelectItem value="ASSOCIATION">
                                    Association
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <div className="mt-4">
                        <button
                          onClick={handleEditCompanyClick}
                          className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          {isEditingCompany
                            ? "Enregistrer les modifications"
                            : "Modifier le profil"}
                        </button>
                        {!isEditingCompany && (
                          <button
                            onClick={handleDeleteCompanyClick}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Supprimer le profil
                          </button>
                        )}
                        {isEditingCompany && (
                          <button
                            onClick={() => setIsEditingCompany(false)}
                            className="ml-4 bg-gray-400 text-white px-4 py-2 rounded"
                          >
                            Annuler
                          </button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
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
        {/* <div className="mt-4">
          <Label htmlFor="phoneCode" className="text-sm font-medium">
            Code téléphone
          </Label>
          <Input
            id="phoneCode"
            value={phoneCodeInput}
            onChange={(e) => setPhoneCodeInput(e.target.value)}
          />
        </div> */}
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
