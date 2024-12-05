"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Eye,
  Edit,
  Trash2,
  Rocket,
  Loader,
  BadgeCheck,
  Search,
  ChevronDown,
} from "lucide-react";
import ConfirmDeleteModal from "@/app/(dialog)/delete/page";

const Annonces = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      setError("Erreur lors de la récupération des articles.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedArticleId(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedArticleId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticleId) return;

    try {
      const response = await fetch(`/api/blog/${selectedArticleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'annonce");
      }

      setArticles((prevAnnonces) =>
        prevAnnonces.filter((article) => article.id !== selectedArticleId)
      );

      console.log("Données supprimées");
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedArticleId(null);
    }
  };
  const filteredArticles = articles.filter((article) => {
    const searchLower = searchFilter.toLowerCase();
    return (
      article.titre.toLowerCase().includes(searchLower) ||
      article.categorieArticle.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full max-w-full mx-auto p-0">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher par titre ou catégorie"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <Link href="/admin/blog/addBlog">
          <Button className="w-full md:w-auto">Créer un nouvel article</Button>
        </Link>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Erreur!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            Aucune article trouvée.
          </p>
        ) : (
          filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
            >
              <CardContent
                className={`p-0 ${
                  article.images?.length > 0 ? "" : "bg-primary"
                }`}
              >
                {article.images?.length > 0 ? (
                  <div className="relative h-48">
                    <Image
                      src={article.images[0].path}
                      alt={article.titre}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-white font-semibold">
                    Aucune image
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col p-4 h-full">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="mb-2">
                      {article.categorieArticle}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {article.titre}
                  </h3>

                  <p className="text-base text-muted-foreground mb-1">
                    {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full pt-8 mt-auto">
                  <Link
                    href={`/admin/blog/${article.id}`}
                    className="text-green-500 hover:text-green-700 transition-colors"
                    title="Voir"
                  >
                    <Eye className="h-6 w-6" />
                  </Link>
                  <Link
                    href={`/admin/blog/editBlog/${article.id}`}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                    title="Éditer"
                  >
                    <Edit className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(article.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Annonces;
