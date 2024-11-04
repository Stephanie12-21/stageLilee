

"use client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Blog = () => {
  const cardVariants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2, // Increase delay for a more pronounced effect
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
    <div className='container mx-auto py-10 space-y-5'>
      <h1 className='text-center text-[36px] text-[#15213D] font-bold pt-10'>Blog & Presse</h1>
      <div className='container mx-auto flex flex-col justify-center items-center gap-y-9'>
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Card className="shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl rounded-[20px] bg-[#ffffff]">
              <CardContent className="space-y-2">
                <div className="flex flex-col items-start">
                  <div className="flex justify-between pt-8">
                    <div className="flex space-x-8">
                      <div className='w-full h-full flex'>
                        <Image src="/blog/BLOG1.svg" width={400} height={400} alt='image blog1' />
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[#15213D] font-bold text-[20px]">Titre de l'article</p>
                        
                        <div className="flex space-x-5">
                          <p id="time" className="text-[#777E90] text-[14px]">Date de publication</p>
                        </div>
                        
                        <p className="text-[#353945] font-medium text-[16px] pt-4">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatum beatae alias eveniet, culpa doloremque debitis nesciunt quo aspernatur laboriosam?Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Quam quisquam illo eius id, distinctio laboriosam accusantium laudantium qui officia dolore recusandae ipsum? Dolorum voluptatibus in mollitia tenetur quos, tempore nobis!
                        </p>
                        <div  className='pt-3'>
                          <Link href="/Blog/InfoBlog">
                            <Button className='px-5 py-2 text-[14px] rounded-[10px] space-x-3'> 
                              Continuer à lire l'article 
                              <FaArrowRight className="ml-2"/>
                            </Button>
                          </Link>
                        </div>
                        
                      </div>

                    </div>

                    <div className="align-text-top">
                      <Label 
                      htmlFor="categorie" 
                      className=" border-[2px] border-[#15213D] bg-transparent text-[15px] text-[#15213D] font-bold p-3 rounded-[8px] ">
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
      <div className='container mx-auto flex items-center w-full pt-10 place-content-center'>
        <Link href="/Blog">
          <Button className='py-4 px-5 text-[17px] rounded-[10px]'>
            Charger d'autres articles
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
