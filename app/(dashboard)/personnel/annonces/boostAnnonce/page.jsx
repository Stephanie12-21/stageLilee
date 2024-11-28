// "use client";
// import PricingCard from "@/components/MainComponent/Pricing/PricingCard";
// import { useEffect, useState } from "react";

// const SubscriptionPage = ({ params }) => {
//   const { id } = params;
//   const [prices, setPrices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPrices();
//   }, []);

//   const fetchPrices = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/getProduct");
//       if (!response.ok) {
//         throw new Error("Erreur lors de la récupération des prix");
//       }
//       const data = await response.json();
//       setPrices(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full">
//       <div className="mx-auto max-w-4xl text-center mt-10 items-center">
//         <h2 className="text-5xl font-semibold leading-7 text-orange-500">
//           Abonnement de l&apos;annonce avec l&apos;identifiant {id}
//         </h2>
//         <p className="mt-2 text-4xl tracking-tight text-gray-900 sm:text-3xl">
//           Optez pour l&apos;abonnement qui vous convient
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 max-w-[1040px] items-center mx-auto">
//         {loading && <p>Chargement des abonnements...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && prices.length === 0 && (
//           <p>Aucun abonnement disponible pour le moment.</p>
//         )}
//         {!loading &&
//           !error &&
//           prices.map((price) => <PricingCard key={price.id} price={price} />)}
//       </div>
//     </section>
//   );
// };

// export default SubscriptionPage;

// "use client";
// import PricingCard from "@/components/MainComponent/Pricing/PricingCard";
// import { useEffect, useState } from "react";

// const SubscriptionPage = ({ params }) => {
//   // Décoder l'ID pour s'assurer qu'il est dans un format entier lisible
//   const id = decodeURIComponent(params.id);
//   const [prices, setPrices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchPrices();
//   }, []);

//   const fetchPrices = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/getProduct");
//       if (!response.ok) {
//         throw new Error("Erreur lors de la récupération des prix");
//       }
//       const data = await response.json();
//       setPrices(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="w-full">
//       <div className="mx-auto max-w-4xl text-center mt-10 items-center">
//         <h2 className="text-5xl font-semibold leading-7 text-orange-500">
//           Abonnement de l&apos;annonce avec l&apos;identifiant {id}
//         </h2>
//         <p className="mt-2 text-4xl tracking-tight text-gray-900 sm:text-3xl">
//           Optez pour l&apos;abonnement qui vous convient
//         </p>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 max-w-[1040px] items-center mx-auto">
//         {loading && <p>Chargement des abonnements...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && prices.length === 0 && (
//           <p>Aucun abonnement disponible pour le moment.</p>
//         )}
//         {!loading &&
//           !error &&
//           prices.map((price) => <PricingCard key={price.id} price={price} />)}
//       </div>
//     </section>
//   );
// };

// export default SubscriptionPage;

// import PricingCards from "@/components/MainComponent/BoostAnnonce/BoostPage";
// import React from "react";

// const BoostAnnonce = () => {
//   return (
//     <div>
//       <PricingCards />
//     </div>
//   );
// };

// export default BoostAnnonce;
"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const colorClasses = {
  purple: {
    border: "border-purple-500",
    bg: "bg-purple-50",
    header: "bg-purple-500",
    description: "text-purple-100",
    price: "text-purple-700",
    button: "bg-purple-500 hover:bg-purple-600",
  },
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-50",
    header: "bg-blue-500",
    description: "text-blue-100",
    price: "text-blue-700",
    button: "bg-blue-500 hover:bg-blue-600",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-50",
    header: "bg-green-500",
    description: "text-green-100",
    price: "text-green-700",
    button: "bg-green-500 hover:bg-green-600",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-50",
    header: "bg-red-500",
    description: "text-red-100",
    price: "text-red-700",
    button: "bg-red-500 hover:bg-red-600",
  },
  orange: {
    border: "border-orange-500",
    bg: "bg-orange-50",
    header: "bg-orange-500",
    description: "text-orange-100",
    price: "text-orange-700",
    button: "bg-orange-500 hover:bg-orange-600",
  },
  teal: {
    border: "border-teal-500",
    bg: "bg-teal-50",
    header: "bg-teal-500",
    description: "text-teal-100",
    price: "text-teal-700",
    button: "bg-teal-500 hover:bg-teal-600",
  },
};

const pricingPlans = [
  {
    title: "Badge URGENT",
    description: "Durant la durée de votre annonce",
    price: "4,99 euros",
    duration: "semaine",
    details:
      "Pour attirer l'attention rapidement. Votre annonce sera marquée comme urgente, attirant l'œil des acheteurs pressés.",
    color: "red",
    link: process.env.STRIPE_BADGE_URGENT,
  },
  {
    title: "Badge à la UNE MEDIUM",
    description: "Pendant 7 jours ",
    price: "15,99 euros",
    duration: "semaine",
    details:
      "Idéal pour une visibilité immédiate et de courte durée. Votre annonce sera mise en avant dans la catégorie à la UNE.",
    color: "purple",
    link: process.env.STRIPE_BADGE_UNE_MEDIUM,
  },
  {
    title: "Badge à la UNE PREMIUM",
    description: "Pendant 1 mois",
    price: "40,99 euros",
    duration: "mois",
    details:
      "Visibilité maximale sur une longue période. Votre annonce sera en tête de liste pendant un mois complet.",
    color: "teal",
    link: process.env.STRIPE_BADGE_UNE_PREMIUM,
  },
  {
    title: "Boost PREMIUM",
    description: "Pendant 2 mois",
    price: "10,99 euros",
    duration: "semaine",
    details:
      "Pour une visibilité prolongée. Votre annonce restera en tête des résultats de recherche pendant deux mois.",
    color: "blue",
    link: process.env.STRIPE_BOOST_PREMIUM,
  },
  {
    title: "Boost MEDIUM",
    description: "Pendant un mois",
    price: "40 euros",
    duration: "mois",
    details:
      "Pour une visibilité soutenue. Votre annonce restera en évidence pendant un mois entier.",
    color: "orange",
    link: process.env.STRIPE_BOOST_MEDIUM,
  },
  {
    title: "Boost STANDARD",
    description: "Pendant une semaine",
    price: "10,99 euros",
    duration: "semaine",
    details:
      "Un bon compromis entre visibilité et coût. Votre annonce sera mise en avant pendant une semaine.",
    color: "green",
    link: process.env.STRIPE_BOOST_STANDARD,
  },
];

const PricingCards = () => {
  const { id } = useParams();
  const [annonce, setAnnonce] = useState(null);

  useEffect(() => {
    async function fetchAnnonce() {
      try {
        const response = await fetch(`/api/annonce/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAnnonce(data);
        } else {
          console.error("Annonce non trouvée, avec l'id annonce :", id);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'annonce :", error);
      }
    }

    fetchAnnonce();
  }, [id]);

  const handleBoost = async (priceId) => {
    try {
      const res = await fetch("/api/boost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ annonceId: id, priceId }),
      });

      if (res.ok) {
        alert("Votre annonce a été boostée !");
        router.push("/personnel/annonces");
      } else {
        const error = await res.text();
        alert(`Erreur : ${error}`);
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  if (!annonce) return <p>Chargement...AUCUN ID RECU</p>;
  return (
    <div className="container mx-auto p-6">
      <h1>Booster votre annonce</h1>
      <p>ID de l&apos;annonce : {id}</p>
      <h2>{annonce.titre}</h2>
      <p>{annonce.description}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan, index) => {
          const colors = colorClasses[plan.color];
          return (
            <Card
              key={index}
              className={`border-2 ${colors.border} ${colors.bg} flex flex-col rounded-md`}
            >
              <CardHeader className={`${colors.header} text-white`}>
                <CardTitle className="text-xl font-bold">
                  {plan.title}
                </CardTitle>
                <CardDescription
                  className={`${colors.description} p-3 text-base font-semibold`}
                >
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 px-3 flex-grow">
                <p className={`text-2xl font-bold text-center ${colors.price}`}>
                  {plan.price} / {plan.duration}
                </p>
                <p
                  className="text-base text-gray-600"
                  dangerouslySetInnerHTML={{ __html: plan.details }}
                />
              </CardContent>
              <CardFooter className="mt-auto p-3">
                {/* <Link href={plan.link} className="w-full">
                  <Button className={`w-full ${colors.button}`}>
                    Souscrire
                  </Button>
                </Link> */}
                <Button
                  className={`w-full ${colors.button}`}
                  onClick={() => handleBoost(plan.link)}
                >
                  Souscrire
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCards;
