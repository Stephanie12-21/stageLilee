"use client";
import React, { useState, useEffect } from "react";
import { Users, Building2, FileText, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  annonces: { label: "Annonces", color: "green" },
  utilisateurs: { label: "Utilisateurs", color: "red" },
  companies: { label: "Entreprises", color: "yellow" },
};

const StatsCard = ({ title, value = 0, icon: Icon, gradient }) => (
  <div
    className={`relative overflow-hidden rounded-xl p-6 ${gradient} transition-transform hover:scale-105`}
  >
    <div className="absolute right-0 top-0 opacity-10">
      <Icon size={100} className="transform translate-x-8 -translate-y-8" />
    </div>
    <div className="relative">
      <div className="flex items-center gap-3">
        <Icon size={24} className="text-white" />
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-4 text-3xl font-bold text-white">
        {value.toLocaleString()}
      </p>
    </div>
  </div>
);

const StatsDashboard = ({ stats, previousStats }) => (
  <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
    <StatsCard
      title="Total Annonces"
      value={stats.annonces}
      icon={FileText}
      gradient="bg-gradient-to-br from-blue-500 to-blue-600"
    />
    <StatsCard
      title="Total Utilisateurs"
      value={stats.utilisateurs}
      icon={Users}
      gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
    />
    <StatsCard
      title="Total Entreprises"
      value={stats.companies}
      icon={Building2}
      gradient="bg-gradient-to-br from-amber-500 to-amber-600"
    />
  </div>
);

const AdminPreview = () => {
  const [stats, setStats] = useState(null);
  const [previousStats, setPreviousStats] = useState({
    annonces: 0,
    utilisateurs: 0,
    companies: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/stats/");
        const data = await response.json();

        if (stats) {
          setPreviousStats({ ...stats }); // Sauvegarde les valeurs actuelles comme "précédentes"
        }

        setStats({
          annonces: data.totalAnnonces,
          utilisateurs: data.totalUsers,
          companies: data.totalCompanies,
        });

        setChartData(data.history || []);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchStats();
  }, [stats]);

  if (!stats) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-7 pt-8 pb-0">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800 px-6">
            Tableau de bord admin
          </h1>
        </div>
        <StatsDashboard stats={stats} previousStats={previousStats} />
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart - Multiple</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart data={chartData} width={500} height={300}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={4}
                  />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;
