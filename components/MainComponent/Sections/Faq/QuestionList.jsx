"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "item-1",
    question: "Comment faire pour déposer une annonce ?",
    answer: (
      <ul className="list-none pl-4 space-y-2">
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Si vous n&apos;avez pas encore de compte, commencez par vous inscrire
          en fournissant vos informations personnelles (nom, email, etc.).
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Si vous avez déjà un compte, connectez-vous à l&apos;aide de vos
          identifiants. Une fois connecté, allez dans votre espace utilisateur
          et accédez à la page &quot;Annonces&quot;. Ensuite, cliquez sur le
          bouton &quot;Créer une annonce&quot;. Remplissez le formulaire avec
          les détails de votre annonce et appuyez sur &quot;Publier
          l&apos;annonce&quot;. Vous recevrez généralement une confirmation que
          votre annonce a bien été publiée.
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Après la publication, vous pourrez suivre l'évolution de votre
          annonce, la modifier si nécessaire, ou la supprimer une fois que votre
          objectif est atteint.
        </li>
      </ul>
    ),
  },
  {
    id: "item-2",
    question: "Comment faire pour trouver les annonces souhaitées ?",
    answer:
      "Notez les caractéristiques importantes (ex : localisation, catégorie, etc.). Plus les critères sont précis, plus les résultats seront pertinents. De plus, Lilee offre la possibilité de créer des alertes qui envoient des notifications par email lorsqu&apos;une nouvelle annonce pouvant correspondre à vos critères est publiée. Pensez donc à vous abonner à la newsletter. 🙂",
  },
  {
    id: "item-3",
    question: "Que faire si on est intéressé par une annonce particulière ?",
    answer:
      "Assurez-vous de bien comprendre toutes les informations (description, état, localisation, conditions, etc.) pour éviter les surprises. Vous pourrez aussi contacter le propriétaire de l&apos;annonce. Dans ce cas, des options s&apos;offrent à vous dont le téléphone, l&apos;email ou encore la messagerie de la plateforme pour exprimer votre intérêt et poser des questions supplémentaires si besoin. 🙂",
  },
  {
    id: "item-4",
    question: "Quelles sont les règles à suivre ?",
    answer: (
      <ul className="list-none pl-4 space-y-2">
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Utilisez un langage respectueux et bienveillant dans les descriptions
          et les échanges avec les autres utilisateurs.
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Signalez tout problème ou comportement inapproprié à
          l&apos;administrateur afin qu&apos;il prenne les mesures nécessaires.
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Ne partagez que les informations nécessaires et évitez de divulguer
          des données sensibles. D&apos;autre part, respectez la confidentialité
          des autres utilisateurs.
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Détaillez clairement et sans fausses informations les annonces,
          services ou aides proposés afin que chacun puisse bien comprendre
          l&apos;offre et éviter les malentendus.
        </li>
      </ul>
    ),
  },
  {
    id: "item-5",
    question: "Comment procéder pour faire un don à LILEE ?",
    answer: (
      <>
        Pour ce faire, vous avez un lien à votre disposition pour{" "}
        <a
          href="https://www.helloasso.com/associations/lilee/formulaires/1"
          className="text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          faire le don à LILEE
        </a>
        . Nous vous remercions d&apos;avance pour l&apos;initiative. 🙂
      </>
    ),
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function QuestionList() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [openItems, setOpenItems] = useState([]);

  const handleToggle = (value) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
      className="w-full"
    >
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {faqItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 px-4 shadow w-full"
          >
            <AccordionItem value={item.id}>
              <AccordionTrigger onClick={() => handleToggle(item.id)}>
                {item.question}
              </AccordionTrigger>
              <AnimatePresence>
                {openItems.includes(item.id) && (
                  <AccordionContent forceMount>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.answer}
                    </motion.div>
                  </AccordionContent>
                )}
              </AnimatePresence>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
}
