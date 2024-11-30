"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function CardCarrousel() {
  const [testimonies, setTestimonies] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchTestimonies = async () => {
      try {
        const response = await fetch("/api/testimony/getAll/");
        const data = await response.json();
        setTestimonies(data.testimonies);
      } catch (error) {
        console.error("Erreur lors de la récupération des témoignages:", error);
      }
    };
    fetchTestimonies();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 1 }
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <div ref={sectionRef}>
      <Carousel className="justify-between flex items-center">
        <CarouselContent>
          {testimonies.map((testimony, index) => (
            <CarouselItem
              key={testimony.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <motion.div
                className="p-1 h-full"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                exit="exit"
                variants={cardVariants}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                }}
              >
                <Card className="h-[300px] relative rounded-[16px]">
                  <CardContent className="h-full flex flex-col p-6">
                    <div className="flex-grow overflow-y-auto pr-2 mb-4 scrollbar-testimony">
                      <p className="font-medium text-[#3B5266] whitespace-pre-wrap">
                        {testimony.temoignage}
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
                      <div className="pt-2 space-y-4 bg-white">
                        <div className="flex space-x-1">
                          {[...Array(testimony.noteLilee)].map((_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#FCA311"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="none"
                              className="w-6 h-6 flex-shrink-0"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
                              />
                            </svg>
                          ))}
                        </div>

                        <div className="flex items-center">
                          <Avatar className="flex-shrink-0 w-16 h-16">
                            <AvatarImage
                              src={
                                testimony.user.profileImages?.[0]?.path ||
                                "https://example.com/default-image.png"
                              }
                              alt={`${testimony.user.nom}`}
                            />
                            <AvatarFallback>
                              {testimony.user.nom?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex pl-5 flex-col  min-w-[200px]">
                            {/* <p className="text-[#304659] truncate font-semibold text-base">
                              {testimony.user.nom} {testimony.user.prenom}
                            </p> */}
                            <p className="text-[#304659] truncate font-semibold text-[17px]">
                              {testimony.user.prenom}
                            </p>
                            <p className="text-[#304659] truncate">
                              {/* {testimony.user.email} */}
                              De Ville, Pays
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <style jsx global>{`
        .scrollbar-testimony::-webkit-scrollbar {
          width: 4px;
        }

        .scrollbar-testimony::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 2px;
        }

        .scrollbar-testimony::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 2px;
        }

        .scrollbar-testimony::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .scrollbar-testimony {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
      `}</style>
    </div>
  );
}
