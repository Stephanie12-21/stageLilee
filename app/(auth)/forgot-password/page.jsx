"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/user/forgotPswrd/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("E-mail de réinitialisation envoyé avec succès !");
        setError("");
        console.log("ID utilisateur:", data.userId); // Afficher l'ID utilisateur si nécessaire
      } else {
        setError(data.error || "Une erreur s'est produite.");
        setMessage("");
      }
    } catch (error) {
      setError("Une erreur s'est produite.");
      setMessage("");
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <Image
        src="/assets/logo.svg"
        width="200"
        height="100"
        alt="Logo Lilee"
        className="absolute top-4 left-40 max-md:left-8 h-[70px]"
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto grid w-[350px] gap-6 max-md:px-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold max-md:text-start">
              Réinitialiser le mot de passe
            </h1>
            <p className="text-balance text-muted-foreground max-md:text-start">
              Veuillez saisir votre adresse email pour pouvoir réinitialiser
              votre mot de passe
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Votre adresse email</Label>

            <Input
              id="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3 items-start w-full bg-white text-[16px] text-[#27272E] font-medium"
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-3">
            {message && <p className="text-green-500 mb-3">{message}</p>}
            {error && <p className="text-red-500 mb-3">{error}</p>}
            <Button onClick={handleSubmit} className="w-full">
              Réinitialiser
            </Button>
          </div>
          <div className="mt-4 text-center text-[16px]">
            Vous êtes nouveau? Venez nous rejoindre
            <br />
            <Link href="/signup" className="underline">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
      <div className="block max-lg:hidden bg-muted overflow-hidden">
        <Image
          src="/assets/marcus-aurelius.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
