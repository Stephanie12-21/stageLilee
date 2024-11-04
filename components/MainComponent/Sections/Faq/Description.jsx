"use client";
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FaArrowRight } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';


const Description = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,  
    threshold: 1, 
  });

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      exit="exit"
      variants={variants}
      transition={{ duration: 0.5 }}
      className="container mx-auto w-[450px] flex flex-col space-y-5"
    >
      <h1 className="text-[48px] font-semibold">Comment ça marche?</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae amet iure quidem minima quas nostrum illum in eaque provident. Excepturi?</p>
      <div>
        <Button className="h-[45px] w-[137px] font-semibold text-[18px] rounded-[10px] flex items-center">
          Cliquer ici
          <FaArrowRight className="ml-2"/>
        </Button>
      </div>
    </motion.div>
  );
};

export default Description;
