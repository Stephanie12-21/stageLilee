"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const [searchFilter, setSearchFilter] = useState("");

  // Fonction pour récupérer les articles
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
    fetchArticles(); // Appel à l'API lors du chargement du composant
  }, []);

  const filteredArticles = articles.filter((article) => {
    const searchLower = searchFilter.toLowerCase();
    return (
      article.titre.toLowerCase().includes(searchLower) ||
      article.categorieArticle.toLowerCase().includes(searchLower)
    );
  });

  const handleDeleteArticle = async (id) => {
    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'article avec l'ID : ${id}?`
    );

    if (confirmed) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setArticles((prevArticles) =>
            prevArticles.filter((article) => article.id !== id)
          );
          alert(`L'article avec l'ID : ${id} a été supprimé.`);
        } else {
          throw new Error("Erreur lors de la suppression de l'article.");
        }
      } catch (error) {
        alert("Erreur lors de la suppression de l'article.");
        console.error("Erreur lors de la suppression de l'article :", error);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pt-4 mx-10">
        <Input
          type="text"
          placeholder="Rechercher par titre ou catégorie"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="border border-gray-300 text-[18px] rounded-md p-6 w-[700px]"
        />
        <Link href="/admin/blog/addBlog">
          <Button className="p-6 text-[18px] rounded-[10px]">
            Créer un nouvel article
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap pt-10 mx-10 justify-center items-center gap-10">
        {error && <p className="text-red-500">{error}</p>}
        {filteredArticles.length === 0 ? (
          <p className="text-gray-500">
            Aucun article disponible pour le moment.
          </p>
        ) : (
          filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="shadow-lg rounded-[20px] bg-[#ffffff] w-fit h-fit"
            >
              <CardContent className="space-y-2">
                <div className="flex flex-col items-start">
                  <div className="flex justify-between pt-8">
                    <div className="flex space-x-8">
                      <div className="w-fit h-fit flex border-[2px] rounded-[10px] border-gray-900">
                        {/* Affichage de l'image de l'article */}
                        {article.images.length > 0 ? (
                          <Image
                            src={article.images[0].path} // Utilisation de la première image associée
                            width={400}
                            height={400}
                            alt="image blog"
                            className="rounded-[7px]"
                          />
                        ) : (
                          <div className="w-[400px] h-[400px] bg-gray-200 flex items-center justify-center rounded-[7px]">
                            <p>Aucune image disponible</p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <p className="text-[#15213D] font-bold text-[22px]">
                          {article.titre}
                        </p>

                        <div className="flex space-x-5">
                          <p id="time" className="text-[#777E90] text-[14px]">
                            {article.createdAt === article.updatedAt ? (
                              <>
                                Publié le{" "}
                                {new Date(article.createdAt).toLocaleString(
                                  "fr-FR",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </>
                            ) : (
                              <>
                                Modifié le{" "}
                                {new Date(article.updatedAt).toLocaleString(
                                  "fr-FR",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </>
                            )}
                          </p>
                        </div>

                        <p className="text-[#353945] font-medium text-[16px] pt-4">
                          {article.contenu.substring(0, 100)}...
                        </p>
                        <div className="flex justify-between items-end pt-[235px] space-x-7">
                          <Link href={`/admin/blog/${article.id}`}>
                            <Button className="px-5 py-2 text-[14px] rounded-[10px] space-x-3">
                              Visualiser l&apos;article
                            </Button>
                          </Link>

                          <Button
                            className="px-5 py-2 text-[14px] rounded-[10px] space-x-3"
                            onClick={() => handleDeleteArticle(article.id)}
                          >
                            Supprimer l&apos;article
                          </Button>

                          <Link href={`/admin/blog/editBlog/${article.id}`}>
                            <Button className="px-5 py-2 text-[14px] rounded-[10px] space-x-3">
                              Modifier l&apos;article
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="align-text-top">
                      <Label
                        htmlFor="categorie"
                        className="border-[2px] border-[#15213D] bg-transparent text-[15px] text-[#15213D] font-bold p-3 rounded-[8px]"
                      >
                        {article.categorieArticle}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Blog;
