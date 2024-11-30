"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
        delay: i * 0.1,
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

  const removeQuotes = (content) => {
    return content.replace(/^"|"$/g, "");
  };

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl md:text-5xl text-primary font-bold text-center mb-12">
        Blog & Presse
      </h1>
      {error && <p className="text-red-500 text-center mb-8">{error}</p>}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <motion.div
            key={article.id}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative h-48 md:h-64">
                  {article.images && article.images.length > 0 ? (
                    <Image
                      src={article.images[0].path}
                      alt={article.titre}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Aucune image disponible</p>
                    </div>
                  )}
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {article.categorieArticle}
                  </Badge>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2 line-clamp-2">
                    {article.titre}
                  </h2>
                  <p className="text-base text-muted-foreground mb-4">
                    {article.createdAt === article.updatedAt
                      ? `Publié le ${new Date(article.createdAt).toLocaleString(
                          "fr-FR",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}`
                      : `Modifié le ${new Date(
                          article.updatedAt
                        ).toLocaleString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}`}
                  </p>
                  <div
                    className="text-base text-muted-foreground mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        removeQuotes(article.contenu.substring(0, 150)) + "...",
                    }}
                  />
                  <Link href={`/Blog/InfoBlog/${article.id}`} passHref>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-primary hover:text-white"
                    >
                      Lire l&apos;article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/Blog" passHref>
          <Button size="lg">
            Charger d&apos;autres articles
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
