
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { motion } from "framer-motion";

export function CardCarrousel() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
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
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className=" md:basis-1/2 lg:basis-1/3">
              <motion.div
                className="p-1"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                exit="exit"
                variants={cardVariants}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2, 
                }}
              >
                <Card className="w-[371px] h-[282px] justify-between items-center rounded-[16px]">
                  <CardContent className="flex flex-col items-start justify-center space-y-5 pt-5">
                    <div className="font-medium text-[#3B5266]">
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi dignissimos enim voluptatem? Doloribus, numquam autem?
                        Lorem ipsum dolor sit amet.Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FCA311"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="none"
                          className="w-6 h-6"
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
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex pl-10 flex-col gap-y-2">
                        <p className="text-[#304659]">Nom</p>
                        <p className="text-[#555555]">User role</p>
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
    </div>
  );
}

