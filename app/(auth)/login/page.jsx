"use client";
import { Button } from "@/components/ui/button";

import { MarcusAurelius, Logo } from "@/public/assets";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";

const emailLoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit comporter au moins 8 caractères"),
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      console.log("Email:", email);
      console.log("Password:", password);

      emailLoginSchema.parse({ email, password });
      const loginData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginData?.error) {
        console.error("Login error:", loginData.error);
        return;
      }

      console.log("Login successful:", loginData);

      // Récupération de la session mise à jour après la connexion
      const updatedSession = await getSession();

      const role = updatedSession?.user?.role;
      console.log("Role associé à l'email:", role);

      // Redirection basée sur le rôle
      if (role === "PERSO") {
        router.push("/personnel");
      } else if (role === "PRO") {
        router.push("/professionel");
      } else if (role === "ADMIN") {
        router.push(`/admin/`);
      } else {
        router.push("/login");
      }

      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation failed:", error.errors);
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handlePrev = () => {
    router.push("/");
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <Image
        src={Logo}
        width="200"
        height="100"
        alt="Logo Lilee"
        className="absolute top-4 left-40 max-md:left-8 h-[70px]"
      />
      <div className="flex items-center justify-center min-h-screen">
        <div className="mx-auto grid w-[350px] gap-9 max-md:px-8">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold max-md:text-start">
              Bon retour parmi nous
            </h1>
            <p className="text-balance text-muted-foreground max-md:text-start">
              Accédez à votre compte pour découvrir les dernières nouveautés.
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Votre adresse email</Label>
            <Input
              id="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Votre mot de passe</Label>
              <Link
                href="/forgot-password"
                className="ml-auto inline-block text-[16px] underline"
              >
                Mot de passe oublié?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white p-2 border border-gray-300 rounded"
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <Eye className="w-5 h-5 text-gray-600" />
                ) : (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button onClick={handleSubmit} className="w-full">
              Se connecter
            </Button>
            <Button onClick={handlePrev} className="w-full">
              Revenir à l&apos; accueil
            </Button>
          </div>

          <div className="mt-8 text-center text-[16px]">
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
          src={MarcusAurelius}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
