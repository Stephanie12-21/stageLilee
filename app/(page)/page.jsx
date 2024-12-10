"use client";
import React, { useState, useEffect } from "react";
import Annonce from "@/components/MainComponent/Sections/Annonce/Annonce";
import Faq from "@/components/MainComponent/Sections/Faq/Faq";
import Hero from "@/components/MainComponent/Sections/Hero/Hero";
import Informations from "@/components/MainComponent/Sections/Informations/Informations";
import Sponsors from "@/components/MainComponent/Sections/Sponsors/Sponsors";
import { Testimonial } from "@/components/MainComponent/Sections/Testimonials/Testimonials";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function Home() {
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setDialogOpen(true);
  }, []);
 
 
  return (
    <main className="p-8">
      <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogTrigger asChild>
          <button className="hidden" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Publicité</AlertDialogTitle>
            <AlertDialogDescription>
              Ceci est un modal de publicité affiché automatiquement. Cliquez
              sur Continuer pour en savoir plus ou Fermer pour ignorer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            <AlertDialogAction>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Hero />
      <Annonce />
      <Informations />
      <Faq />
      <Testimonial />
      <Sponsors />
    </main>
  );
}
