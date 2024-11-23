import React from "react";

const PricingCard = ({ price }) => {
  const dynamicSubTitle = (nickname) => {
    switch (nickname) {
      case "Boost hebdomadaire Lilee":
        return "Annonce à la Une pendant 7 jours";
      case "Boost mensuel Lilee":
        return "Annonce à la Une pendant 30 jours";
      case "Boost étendu Lilee":
        return "Annonce à la Une pendant 8 semaines";
      default:
        return "";
    }
  };

  const handleSubscription = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/paiement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: price.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la souscription.");
      }

      const data = await response.json();

      if (data?.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("URL de redirection manquante.");
      }
    } catch (error) {
      console.error("Erreur :", error.message);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="border-gray-100 shadow-2xl border-4 text-center mt-10 max-w-[1040px] rounded-lg">
      <div>
        <div className="bg-gray-100 h-28 flex flex-col items-center justify-center font-bold p-4">
          <h4 className="text-3xl">{price.nickname}</h4>
          <p className="text-orange-500 mt-1">
            {dynamicSubTitle(price.nickname)}
          </p>
          <h3 className="text-gray-700 text-sm mt-2">
            Votre annonce sera l&apos;une des premières que les utilisateurs
            verront
          </h3>
        </div>
        <div className="flex flex-col items-center justify-center pt-4">
          <h1 className="text-5xl font-bold">
            {(price.unit_amount / 100).toLocaleString("fr-FR", {
              style: "currency",
              currency: "EUR",
            })}
          </h1>
        </div>
        <button
          className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-orange-600"
          onClick={handleSubscription}
        >
          Souscrire à ce forfait
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
