"use client";

import AnimatedSymbol from "@/components/MainComponent/Loading/Loading";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SuccessPage = ({ params }) => {
  const { id } = params;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      handleStripeSession(id);
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleStripeSession = async (sessionId) => {
    try {
      console.log("Session ID:", sessionId);
      const response = await fetch(`/api/annonce/stripe/${sessionId}`);
      const session = await response.json();

      if (session.payment_status === "paid") {
        const res = await fetch("/api/annonce/save-subscription", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.metadata.userId,
            abonnementId: session.metadata.abonnementId,
            userName: session.metadata.userName,
            stripeSessionId: session.id,
            subscriptionId: session.subscription,
          }),
        });

        if (res.ok) {
          const result = await res.json();
          console.log("Enregistrement réussi :", result);
        } else {
          const errorResult = await res.json();
          console.error("Erreur lors de l'enregistrement :", errorResult.error);
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la session Stripe :",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AnimatedSymbol />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-xl mx-4 overflow-hidden p-6  shadow-xl animate-fade-in-up">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500 animate-bounce" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Merci pour votre abonnement !
          </h1>
          <p className="text-lg text-gray-600">
            Votre transaction a été enregistrée avec succès.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
