"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
      </ul>
    ),
  },
  {
    id: "item-2",
    question: "Comment faire pour trouver les annonces souhaitées ?",
    answer:
      "Notez les caractéristiques importantes (ex : localisation, catégorie, etc.). Plus les critères sont précis, plus les résultats seront pertinents. De plus, Lilee offre la possibilité d'être notifié par email lorsqu'une nouvelle annonce est publiée. Pensez donc à vous abonner à la newsletter. 🙂",
  },
  {
    id: "item-3",
    question: "Que faire si on est intéressé par une annonce particulière ?",
    answer:
      "Assurez-vous de bien comprendre toutes les informations (description, état, localisation, conditions, etc.) pour éviter les surprises. Vous pourrez aussi contacter le propriétaire de l'annonce. Dans ce cas, la messagerie de la plateforme vous permettra d'exprimer votre intérêt et poser des questions supplémentaires si besoin. 🙂",
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
        . Nous vous remercions d&apos;avance pour l&apos;initiative. &#128516;
      </>
    ),
  },
  {
    id: "item-6",
    question: "Comment faire pour devenir partenaire de Lilee?",
    answer: (
      <ul className="list-none pl-4 space-y-2">
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Téléchargez le contrat et les documents nécessaires en cliquant sur le
          bouton &quot;Devenir partenaire&quot;.
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Remplissez les documents avec les informations requises.
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Envoyez les documents complétés par email à contact@lilee.fr
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-xl">•</span>
          Profitez de votre visibilité accrue sur Lilee et constatez les
          retombées positives sur votre entreprise.
        </li>
      </ul>
    ),
  },
];

const QuestionList = () => {
  const [openItems, setOpenItems] = useState([]);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="w-full"
    >
      <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
        {faqItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-slate-50 border border-gray-200 rounded-lg shadow-md p-4 mb-4"
            variants={itemVariants}
            transition={{ duration: 0.5 }}
          >
            <AccordionItem value={item.id}>
              <AccordionTrigger className="font-medium text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  );
};

export default QuestionList;
