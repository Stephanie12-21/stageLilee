"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

const Description = () => {
  const router = useRouter();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1,
  });

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  const handleConctactAdmin = () => {
    router.push("/Contact");
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
      <p>
        Vous trouverez ci-jointes les questions et les réponses qui vous
        aideront à mieux utiliser la plateforme.
        <br />
        <br />
        Si vous avez d&apos;autres questions, vous êtes invité à contacter
        l&apos;administrateur
      </p>{" "}
      <div>
        <Button
          onClick={handleConctactAdmin}
          className="h-fit w-fit p-3 font-semibold text-[18px] rounded-[10px] flex items-center"
        >
          Contacter l&apos;administrateur
        </Button>
      </div>
    </motion.div>
  );
};

export default Description;
