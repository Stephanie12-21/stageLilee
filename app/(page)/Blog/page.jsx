"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.5 },
    },
  };

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/blog");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des articles.");
      }
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
      setError("Erreur lors de la récupération des articles.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto py-10 space-y-5">
      <h1 className="text-center text-[36px] text-[#15213D] font-bold pt-10">
        Blog & Presse
      </h1>
      <div className="container mx-auto flex flex-col justify-center items-center gap-y-9">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="shadow rounded-[20px] bg-[#ffffff]">
              <CardContent className="space-y-2">
                <div className="flex flex-col items-start">
                  <div className="flex justify-between pt-8">
                    <div className="flex space-x-8">
                      <div className="w-full h-full flex">
                        {article.images && article.images.length > 0 ? (
                          <Image
                            src={article.images[0].path}
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
                        <p className="text-[#15213D] font-bold text-[20px]">
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
                          {article.contenu.substring(0, 300)}...
                        </p>
                        <div className="pt-3">
                          <Link href={`/Blog/InfoBlog/${article.id}`}>
                            <Button className="px-5 py-2 text-[14px] rounded-[10px] space-x-3">
                              Continuer à lire l&apos;article
                              <FaArrowRight className="ml-2" />
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
          </motion.div>
        ))}
      </div>
      <div className="container mx-auto flex items-center w-full pt-10 place-content-center">
        <Link href="/Blog">
          <Button className="py-4 px-5 text-[17px] rounded-[10px]">
            Charger d&apos;autres articles
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
