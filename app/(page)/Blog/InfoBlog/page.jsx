"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";

const InfoBlog = () => {
  const [inView, setInView] = useState(false); // État pour déterminer si les cards sont visibles
  const cardContainerRef = useRef(null); // Référence au conteneur des cards

  useEffect(() => {
    // Créer un observateur d'intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 } // La cards devient visible à 20% dans la vue
    );

    if (cardContainerRef.current) {
      observer.observe(cardContainerRef.current);
    }

    return () => {
      if (cardContainerRef.current) {
        observer.unobserve(cardContainerRef.current);
      }
    };
  }, []);

  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Délai pour chaque card
        duration: 0.5,
      },
    }),
    hidden: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="text-center text-[36px] text-[#15213D] font-bold pt-5">
          Titre de l'article
        </h1>
        <p id="time" className="text-[#2e2f33] text-[20px]">
          Date de publication
        </p>

        {/* Image de couverture */}
        <Image
          src="/blog/BLOG2.svg"
          width={700}
          height={600}
          className="flex items-center justify-center pt-3"
        />

        {/* Corps de l'article */}
        <div className="container mx-auto flex  flex-col pt-5 space-y-4">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
              repellendus possimus voluptates. Accusamus impedit at quia
              adipisci ullam aspernatur obcaecati sint voluptates recusandae
              temporibus dignissimos, molestias nostrum reprehenderit facere
              omnis nisi magnam tempore autem? Sunt sequi eos minus. Quisquam
              alias saepe praesentium ipsa nam nemo quo corporis, nobis earum
              architecto.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-start text-[20px] text-[#15213D] font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              quos.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              vitae reprehenderit eveniet recusandae ab, beatae, cumque aut
              repudiandae qui repellat nobis distinctio saepe odio quidem at
              aperiam! Ullam laudantium, unde optio repudiandae quam
              consequuntur quos, eum at alias odit quae! Libero deleniti iusto
              optio, voluptas unde similique? Labore sint voluptatem repellat
              illum aspernatur cupiditate, repellendus eius aliquid officiis
              inventore iusto consectetur exercitationem eligendi voluptates
              distinctio dolorum quam laboriosam facere fugiat non, debitis
              deserunt! Saepe, aspernatur! Quasi dignissimos sequi tempore velit
              sunt veniam libero, tempora id, vero facere nam nesciunt odio
              mollitia maiores illum quaerat eum dolor neque voluptas quam! Quos
              consequuntur aut soluta totam recusandae accusamus iste
              dignissimos ducimus doloribus maiores animi molestias esse
              incidunt perspiciatis voluptatem, cumque perferendis omnis
              assumenda! Laborum perspiciatis nobis voluptates voluptatum
              doloribus, nostrum quisquam in dolores ex eligendi, a quibusdam
              excepturi repudiandae provident quidem et? Nam nulla hic velit
              eius suscipit tempora iure at id.
            </p>
          </div>
          <div className="space-y-2">
            <h2 className="text-start text-[20px] text-[#15213D] font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
              quos.
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              vitae reprehenderit eveniet recusandae ab, beatae, cumque aut
              repudiandae qui repellat nobis distinctio saepe odio quidem at
              aperiam! Ullam laudantium, unde optio repudiandae quam
              consequuntur quos, eum at alias odit quae! Libero deleniti iusto
              optio, voluptas unde similique? Labore sint voluptatem repellat
              illum aspernatur cupiditate, repellendus eius aliquid officiis
              inventore iusto consectetur exercitationem eligendi voluptates
              distinctio dolorum quam laboriosam facere fugiat non, debitis
              deserunt! Saepe, aspernatur! Quasi dignissimos sequi tempore velit
              sunt veniam libero, tempora id, vero facere nam nesciunt odio
              mollitia maiores illum quaerat eum dolor neque voluptas quam! Quos
              consequuntur aut soluta totam recusandae accusamus iste
              dignissimos ducimus doloribus maiores animi molestias esse
              incidunt perspiciatis voluptatem, cumque perferendis omnis
              assumenda! Laborum perspiciatis nobis voluptates voluptatum
              doloribus, nostrum quisquam in dolores ex eligendi, a quibusdam
              excepturi repudiandae provident quidem et? Nam nulla hic velit
              eius suscipit tempora iure at id.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-20">
        <h1 className="text-3xl text-[#15213D] font-semibold">
          Vous pourrez aussi aimer
        </h1>
        <div
          ref={cardContainerRef}
          className="flex flex-col space-y-5 justify-center items-center pt-9"
        >
          {[...Array(2)].map((_, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={inView ? "visible" : "hidden"} // Animation en fonction de la visibilité
              variants={cardVariants}
            >
              <Card className="shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-[20px] bg-[#ffffff]">
                <CardContent className="space-y-2">
                  <div className="flex flex-col items-start">
                    <div className="flex justify-between pt-8">
                      <div className="flex space-x-8">
                        <div className="w-full h-full flex">
                          <Image
                            src="/blog/BLOG1.svg"
                            width={400}
                            height={400}
                            alt="image blog1"
                          />
                        </div>

                        <div className="space-y-3">
                          <p className="text-[#15213D] font-bold text-[20px]">
                            Titre de l'article
                          </p>

                          <div className="flex space-x-5">
                            <p id="time" className="text-[#777E90] text-[14px]">
                              Date de publication
                            </p>
                          </div>

                          <p className="text-[#353945] font-medium text-[16px] pt-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Tempora voluptatum beatae alias eveniet, culpa
                            doloremque debitis nesciunt quo aspernatur
                            laboriosam?Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Quam quisquam illo eius id,
                            distinctio laboriosam accusantium laudantium qui
                            officia dolore recusandae ipsum? Dolorum
                            voluptatibus in mollitia tenetur quos, tempore
                            nobis!
                          </p>
                          <div className="pt-3">
                            <Link href="/PAGES/InfoBlog">
                              <Button className="px-5 py-2 text-[14px] rounded-[10px] space-x-3">
                                Continuer à lire l'article
                                <FaArrowRight className="ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="align-text-top">
                        <Label
                          htmlFor="categorie"
                          className=" border-[2px] border-[#15213D] bg-transparent text-[15px] text-[#15213D] font-bold p-3 rounded-[8px] "
                        >
                          CATEGORIE
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
              Charger d'autres articles
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoBlog;
