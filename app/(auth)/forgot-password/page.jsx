"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarcusAurelius, Logo } from "@/public/assets";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const credentials = {
      "bray@gmail.com": { password: "azertyuiop", redirect: "/admin" },
      "steph@gmail.com": { password: "0123456789", redirect: "/personnel" },
      "safidy@gmail.com": {
        password: "qwertyuiop",
        redirect: "/professionel",
      },
    };

    // Check if the email exists and the password is correct
    if (credentials[email] && credentials[email].password === password) {
      router.push(credentials[email].redirect); // Redirect to the corresponding page
    } else {
      alert("Invalid email or password"); // Optional: Show an error message
    }
  };

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <Image
        src={Logo}
        width="200"
        height="100"
        alt="Logo Lilee"
        className="absolute top-4 left-48 max-md:left-8 h-[100px]"
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
          <form onSubmit={handleSubmit} className="grid gap-4">
            {" "}
            {/* Use form element */}
            <div className="grid gap-2">
              <Label htmlFor="email">Votre adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state
                className="col-span-3 items-start w-full bg-[#edf2f7] text-[15px] text-[#27272E] font-medium"
              />
            </div>
            <Button type="submit" className="w-full">
              Envoyer
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous êtes nouveau? Venez nous rejoindre
            <br />
            <Link href="/sign-up" className="underline">
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
