"use client";
import PricingCard from "@/components/MainComponent/Pricing/PricingCard";
import { useEffect, useState } from "react";

const SubscriptionPage = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/getProduct");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des prix");
      }
      const data = await response.json();
      setPrices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="mx-auto max-w-4xl text-center mt-10 items-center">
        <h2 className="text-5xl font-semibold leading-7 text-orange-500">
          Abonnement
        </h2>
        <p className="mt-2 text-4xl tracking-tight text-gray-900 sm:text-3xl">
          Optez pour l&apos;abonnement qui vous convient
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-8 max-w-[1040px] items-center mx-auto">
        {loading && <p>Chargement des abonnements...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && prices.length === 0 && (
          <p>Aucun abonnement disponible pour le moment.</p>
        )}
        {!loading &&
          !error &&
          prices.map((price) => <PricingCard key={price.id} price={price} />)}
      </div>
    </section>
  );
};

export default SubscriptionPage;
