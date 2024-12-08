"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const offers = {
  weekly: [
    {
      title: "Badge URGENT",
      description:
        "Mettez en avant votre annonce pendant 7 jours avec un badge urgent.",
      price: "4,99€",
      priceCents: 499,
      boostType: "urgent",
    },
    {
      title: "Badge à la UNE standard",
      description: "Affichez votre annonce en tête de liste durant 7 jours.",
      price: "10,99€",
      priceCents: 1099,
      boostType: "une_medium",
    },
    {
      title: "Boost Recommandations premium",
      description:
        "Maximisez la visibilité de votre annonce  pendant 8 semaines.",
      price: "10,99€",
      priceCents: 1099,
      boostType: "premium",
    },
    {
      title: "Boost Recommandations standard",
      description: "Augmentez la visibilité de votre annonce pendant 7 jours",
      price: "14,99€",
      priceCents: 1499,
      boostType: "standard",
    },
  ],
  monthly: [
    {
      title: "Boost Recommandations medium",
      description:
        "Boost mensuel pour une visibilité constante pendant 30 jours.",
      price: "40,99€",
      priceCents: 4099,
      boostType: "medium",
    },
    {
      title: "Badge à la UNE premium",
      description: "Restez en tête de liste pendant 30 jours",
      price: "40,99€",
      priceCents: 4099,
      boostType: "une_premium",
    },
  ],
};

function OfferCard({
  title,
  description,
  price,
  priceCents,
  boostType,
  adId,
  offerType,
  titreAnnonce,
}) {
  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/paiement/testAbonnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceCents,
          boostType,
          adId,
          titreAnnonce,
          offerType,
        }),
      });

      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        console.error("Erreur lors de la création de la session Stripe");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <Card className="p-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant="secondary" className="text-lg font-bold">
          {price}
        </Badge>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePayment}>
          Choisir cette offre
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function BoostOffers({ adId, titreAnnonce }) {
  return (
    <Tabs defaultValue="weekly" className="w-full max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="weekly">Hebdomadaire</TabsTrigger>
        <TabsTrigger value="monthly">Mensuel</TabsTrigger>
      </TabsList>
      <TabsContent value="weekly" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.weekly.map((offer, index) => (
            <OfferCard
              key={index}
              {...offer}
              adId={adId}
              titreAnnonce={titreAnnonce}
              offerType="weekly"
            />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="monthly" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.monthly.map((offer, index) => (
            <OfferCard key={index} {...offer} adId={adId} offerType="monthly" />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
