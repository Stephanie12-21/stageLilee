"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
          className="bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Comment faire pour déposer une annonce
            </AccordionTrigger>
            <AccordionContent>
              <ul class="list-none pl-4 space-y-2">
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Si vous n&apos;avez pas encore de compte, commencez par vous
                  inscrire en fournissant vos informations personnelles (nom,
                  email, etc.).
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Si vous avez déjà un compte, connectez-vous à l&apos;aide de
                  vos identifiants. Une fois connecté, allez dans votre espace
                  utilisateur et accédez à la page &quot;Annonces &quot;.
                  Ensuite, cliquez sur le bouton &quot;Créer une annonce&quot;.
                  Remplissez le formulaire avec les détails de votre annonce et
                  appuyez sur &quot;Publier l&apos;annonce&quot;. Vous recevrez
                  généralement une confirmation que votre annonce a bien été
                  publiée.
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Après la publication, vous pourrez suivre l’évolution de votre
                  annonce, la modifier si nécessaire, ou la supprimer une fois
                  que votre objectif est atteint.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className="bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl"
        >
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Comment faire pour trouver les annonces souhaitées?
            </AccordionTrigger>
            <AccordionContent>
              Notez les caractéristiques importantes (ex : localisation,
              catégorie, etc.). Plus les critères sont précis, plus les
              résultats seront pertinents. De plus, Lilee offre la possibilité
              de créer des alertes qui envoient des notifications par email
              lorsqu&apos;une nouvelle annonce pouvant correspondre à vos
              critères est publiée. Pensez donc à vous abonner à la newsletter.
              🙂
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className="bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl"
        >
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Que faire si on est intéressé par une annonce particulière?
            </AccordionTrigger>
            <AccordionContent>
              Assurez-vous de bien comprendre toutes les informations
              (description, état, localisation, conditions, etc.) pour éviter
              les surprises. Vous pourrez aussi contacter le propriétaire de
              l&apos;annonce. Dans ce cas, des options s&apos; offrent à vous
              dont le téléphone, l&apos;email ou encore la messagerie de la
              plateforme pour exprimer votre intérêt et poser des questions
              supplémentaires si besoin. 🙂
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className="bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl"
        >
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Quelles sont les règles à suivre?
            </AccordionTrigger>
            <AccordionContent>
              <ul class="list-none pl-4 space-y-2">
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Utilisez un langage respectueux et bienveillant dans les
                  descriptions et les échanges avec les autres utilisateurs.
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Signalez tout problème ou comportement inapproprié à
                  l&apos;administrateur afin qu&apos;il prenne les mesures
                  nécessaires.
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Ne partagez que les informations nécessaires et évitez de
                  divulguer des données sensibles. D&apos;autre part, respectez
                  la confidentialité des autres utilisateurs.
                </li>
                <li class="flex items-start">
                  <span class="mr-2 text-xl">•</span>
                  Détaillez clairement et sans fausses informations les
                  annonces, services ou aides proposés afin que chacun puisse
                  bien comprendre l&apos;offre et éviter les malentendus.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div
          variants={variants}
          className="bg-slate-50 rounded-[10px] p-4 shadow sm:shadow-md md:shadow-lg lg:shadow-xl xl:shadow-2xl"
        >
          <AccordionItem value="item-5">
            <AccordionTrigger>
              Comment procéder pour faire un don à LILEE?
            </AccordionTrigger>
            <AccordionContent>
              Pour ce faire, vous avez un lien à votre disposition pour{" "}
              <a
                href="https://www.helloasso.com/associations/lilee/formulaires/1"
                className="text-blue-600 hover:text-blue-800"
              >
                faire le don à LILEE
              </a>{" "}
              . Nous vous remercions d&apos;avance pour l&apos;initiative. 🙂
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      </Accordion>
    </motion.div>
  );
}
