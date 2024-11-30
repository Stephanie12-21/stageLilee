"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

const Description = () => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const handleContactAdmin = () => {
    router.push("/Contact");
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -100 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-10 py-10"
    >
      <div className="w-full md:w-3/5">
        <h1 className="text-3xl md:text-5xl font-semibold">
          Comment ça marche?
        </h1>
        <p className="mt-4 text-base md:text-lg">
          Vous trouverez ci-jointes les questions et les réponses qui vous
          aideront à mieux utiliser la plateforme. <br />
          Si vous avez d&apos;autres questions, vous êtes invité à contacter
          l&apos;administrateur.
        </p>
      </div>
      <Button
        onClick={handleContactAdmin}
        className="w-full md:w-auto text-base font-semibold"
      >
        Contacter l&apos;administrateur
      </Button>
    </motion.div>
  );
};

export default Description;
