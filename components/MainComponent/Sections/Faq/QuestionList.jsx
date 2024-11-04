
"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function QuestionList() {
  const { ref, inView } = useInView({
    triggerOnce: false,  
    threshold: 0.1, 
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
      }}
      transition={{ duration: 0.5 }}
      className="w-[700px] space-y-1"
    >
      <Accordion type="single" collapsible className="space-y-1">
        
        <motion.div
          variants={variants}
          className='bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Comment faire pour déposer une annonce</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis ipsum quibusdam libero iste amet. Saepe quod cum ducimus deleniti quisquam porro harum itaque animi dolorem exercitationem! In, amet ducimus.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className='bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'
        >
          <AccordionItem value="item-2">
            <AccordionTrigger>Comment faire pour trouver des logements PMR</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis ipsum quibusdam libero iste amet. Saepe quod cum ducimus deleniti quisquam porro harum itaque animi dolorem exercitationem! In, amet ducimus.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className='bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'
        >
          <AccordionItem value="item-3">
            <AccordionTrigger>Que faire si on veut réserver un logement</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis ipsum quibusdam libero iste amet. Saepe quod cum ducimus deleniti quisquam porro harum itaque animi dolorem exercitationem! In, amet ducimus.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className='bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'
        >
          <AccordionItem value="item-4">
            <AccordionTrigger>Quelles sont les règles à suivre</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis ipsum quibusdam libero iste amet. Saepe quod cum ducimus deleniti quisquam porro harum itaque animi dolorem exercitationem! In, amet ducimus.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className='bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl'
        >
          <AccordionItem value="item-5">
            <AccordionTrigger>Comment faire pour payer</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident corporis ipsum quibusdam libero iste amet. Saepe quod cum ducimus deleniti quisquam porro harum itaque animi dolorem exercitationem! In, amet ducimus.
            </AccordionContent>
          </AccordionItem>
        </motion.div>
        
      </Accordion>
    </motion.div>
  );
}
