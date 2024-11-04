"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import * as z from "zod";
import { useRouter } from "next/navigation";

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

  const onSubmit = async () => {
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
      } else {
        router.push("/admin");
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-fit p-10">
        <CardHeader>
          <CardTitle>Connexion avec un email</CardTitle>
          <CardDescription>
            Veuillez saisir votre email et votre mot de passe pour accéder à
            votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-right font-medium text-[16px]"
            >
              Votre adresse email
            </Label>
            <Input
              id="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#edf2f7] text-[15px] font-medium"
            />
          </div>
          <div className="space-y-2 relative pt-4">
            <div>
              <Label
                htmlFor="password"
                className="text-right font-medium text-[16px]"
              >
                Votre mot de passe
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#edf2f7] pr-10 text-[17px] font-medium"
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
            <div>
              <Link href="/forgotpassword" className="hover:underline">
                Mot de passe oublié?
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-center gap-3">
          <Button onClick={onSubmit} className="w-full">
            Se connecter
          </Button>
          <Link href="/signup/" className="w-full">
            <Button className="w-full bg-transparent text-black border border-black hover:bg-black hover:text-white">
              Créer un compte
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
