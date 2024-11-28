import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <div className="container mx-auto p-6">
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
                <Link href={plan.link} className="w-full">
                  <Button className={`w-full ${colors.button}`}>
                    Souscrire
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCards;
