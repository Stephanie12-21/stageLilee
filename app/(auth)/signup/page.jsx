import { Button } from "@/components/ui/button";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
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
          <div className="flex items-start justify-between">
            <div className="grid gap-2 text-center">
              <h1 className="text-2xl font-bold max-md:text-start">
                Bienvenue parmi nous
              </h1>
              <p className="text-balance text-[16px] text-muted-foreground max-md:text-start">
                Veuillez suivre les étapes afin de créer votre compte
              </p>
            </div>
          </div>

          <div className="grid gap-4 h-fit">
            <div className="flex items-center flex-col gap-4">
              <Button asChild className="w-full text-[16px]">
                <Link href={"/signup/personnel"}>Personnel</Link>
              </Button>
              <Button asChild className="w-full text-[16px]">
                <Link href={"/signup/professionnel"}>Professionel</Link>
              </Button>
              {/* <Button asChild className="w-full text-[16px]">
                <Link href={"/signup/admin"}>Administrateur</Link>
              </Button> */}
            </div>
          </div>

          <div className="mt-2 text-center text-[16px]">
            Vous êtes déjà membre?
            <br />
            <br />
            <Link href="/login" className="hover:underline">
              Se connecter
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
};

export default SignUpPage;
