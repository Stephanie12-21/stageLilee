"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UserProfilePreview = () => {
  const { id: userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  // Fetch user data from the server
  const fetchUserData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/userInfo/${userId}`);
      if (!response.ok) {
        throw new Error(
          "Erreur lors de la récupération des données utilisateur."
        );
      }
      const data = await response.json();
      if (!data.user) {
        throw new Error("Aucune donnée utilisateur trouvée.");
      }

      setUser(data.user);
      setProfileImage(
        data.user.profileImages[0]?.path || "Aucune image relative à ce compte"
      );
    } catch (error) {
      setError(
        error.message ||
          "Une erreur est survenue lors du chargement des données."
      );
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

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

  // Check if user role is "PERSO"
  const isPersonalUser = user.role === "PERSO";

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto bg-white shadow-lg">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              {/* Avatar */}
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
              </div>

              <Tabs defaultValue="adminCompte" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="adminCompte">
                    Administrateur du compte
                  </TabsTrigger>
                  {/* Only show "Informations de la société" tab if user is not "PERSO" */}
                  {!isPersonalUser && (
                    <TabsTrigger value="companyInfo">
                      Informations de la société
                    </TabsTrigger>
                  )}
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
                            Prénom :{user.prenom}
                          </Label>
                        </div>

                        {/* nom */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="nom"
                            className="text-sm font-medium text-gray-600"
                          >
                            Nom :{user.nom}
                          </Label>
                        </div>
                      </div>

                      {/* email */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-600"
                        >
                          Email :{user.email}
                        </Label>
                      </div>

                      {/* phone */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-600"
                        >
                          Numéro de téléphone :{user.phone}
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                {/* Render the company info tab only if user is not "PERSO" */}
                {!isPersonalUser && (
                  <TabsContent value="companyInfo">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-3xl font-bold text-gray-800 mb-6">
                          Profil de la société
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {/* Display company details */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* SIRET */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="siret"
                              className="text-sm font-medium text-gray-600"
                            >
                              SIRET :{user.company.siret}
                            </Label>
                          </div>

                          {/* Nom de la société */}
                          <div className="space-y-2">
                            <Label
                              htmlFor="nomSociete"
                              className="text-sm font-medium text-gray-600"
                            >
                              Nom de la société :{user.company.nomSociete}
                            </Label>
                          </div>
                        </div>
                        {/* Additional company info fields */}
                        <div className="space-y-2">
                          <Label
                            htmlFor="adresse"
                            className="text-sm font-medium text-gray-600"
                          >
                            Adresse :{user.company.adresse}
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="adresse"
                            className="text-sm font-medium text-gray-600"
                          >
                            Ville :{user.company.ville}
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="adresse"
                            className="text-sm font-medium text-gray-600"
                          >
                            Type de société :{user.company.typeSociete}
                          </Label>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="adresse"
                            className="text-sm font-medium text-gray-600"
                          >
                            Secteur :{user.company.secteurActivite}
                          </Label>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                )}
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfilePreview;
