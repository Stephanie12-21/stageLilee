"use client";
import React, { useState, useEffect } from "react";
import Annonce from "@/components/MainComponent/Sections/Annonce/Annonce";
import Faq from "@/components/MainComponent/Sections/Faq/Faq";
import Hero from "@/components/MainComponent/Sections/Hero/Hero";
import Informations from "@/components/MainComponent/Sections/Informations/Informations";
import Sponsors from "@/components/MainComponent/Sections/Sponsors/Sponsors";
import { Testimonial } from "@/components/MainComponent/Sections/Testimonials/Testimonials";
import Partenaires from "@/components/MainComponent/Sections/Partenaires/Partenaires";

export default function Home() {
  return (
    <main className="p-8">
      <Hero />
      <Annonce />
      <Informations />
      <Faq />
      <Testimonial />
      <Sponsors />
      <Partenaires />
    </main>
  );
}
