"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      emailLoginSchema.parse({ email, password });

      const loginData = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginData?.error) {
        console.error("Login error:", loginData.error);
        setAlertMessage("Identifiants incorrects");
        setOpen(true);
        return;
      }

      console.log("Login successful:", loginData);

      const updatedSession = await getSession();

      const statutUser = updatedSession?.user?.statutUser;
      console.log("Role associé à l'email:", statutUser);

      if (statutUser !== "ACTIF") {
        setAlertMessage(
          "Votre compte est suspendu ou inactif. Veuillez contacter l'administrateur."
        );
        setOpen(true);
        return;
      } else {
        const role = updatedSession?.user?.role;
        console.log("Role associé à l'email:", role);

        if (role === "PERSO") {
          router.push("/personnel/annonces");
        } else if (role === "PRO") {
          router.push("/professionel/annonces");
        } else if (role === "ADMIN") {
          router.push(`/admin/`);
        } else {
          router.push("/login");
        }

        router.refresh();
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Validation failed:", error.errors);
      } else {
        console.error("Login error:", error);
        setAlertMessage(
          "Une erreur s'est produite lors de la connexion. Veuillez réessayer."
        );
        setOpen(true);
      }
    }
  };

  const handlePrev = () => {
    router.push("/");
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Accès refusé</AlertDialogTitle>
          <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          <AlertDialogAction onClick={() => setOpen(false)}>
            Fermer
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

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
