"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { Connexion } from "@/components/MainComponent/Comptes/Connexion";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

// Define the ListLink component
export const ListLink = () => {
  const path = usePathname();

  const links = [
    { path: "/", name: "Accueil" },
    { path: "/Annonces", name: "Annonces" },
    { path: "/Contact", name: "Contact" },
    { path: "/Blog", name: "Blog" },
  ];

  return (
    <nav className="flex justify-between items-center gap-10">
      {links.map((link) => (
        <Link
          href={link.path}
          key={link.path}
          className="relative capitalize text-white text-[16px] font-semibold"
        >
          {link.name}
          {link.path === path && (
            <motion.span
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              layoutId="underline"
              className="absolute left-0 bottom-0 w-full h-[3px] bg-white"
            />
          )}
          <motion.span
            whileHover={{ scaleX: 1 }}
            whileFocus={{ scaleX: 1 }}
            initial={{ scaleX: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute left-0 bottom-0 w-full h-[3px] bg-white"
          />
        </Link>
      ))}
    </nav>
  );
};

// Define the ListButton component

export const ListButton = () => {
  return (
    <div className="flex gap-2">
      <Toaster position="top-right" className="text-[20px] font-semibold" />
      <Button
        className="px-5 rounded-[10px] text-[16px] text-white font-semibold bg-transparent border-[1px] hover:bg-transparent hover:text-white"
        variant="outline"
        onClick={() =>
          toast("", {
            description: (
              <div>
                <span style={{ fontSize: "17px", fontStyle: "semibold" }}>
                  Pour pouvoir déposer une annonce et se satisfaire pleinement
                  des fonctionnalités du site, il faut d'abord accéder à votre
                  espace utilisateur.
                </span>
                <div className="mt-2">
                  <span
                    className="text-[#15213d] text-[17px] hover:underline font-semibold cursor-pointer"
                    onClick={() => toast.dismiss()}
                  >
                    Très bien, d'accord
                  </span>
                </div>
              </div>
            ),
          })
        }
      >
        Déposer une annonce
      </Button>
      <Button
        asChild
        className="px-5 rounded-[10px] text-[16px] font-semibold bg-transparent border-[1px] hover:border"
      >
        <Link href={"/login"}>Se connecter</Link>
      </Button>
    </div>
  );
};

// Define the NavBar component

const NavBar = () => {
  return (
    <div className="container pt-5">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/Logo_site.svg"
            width={140}
            height={50}
            alt="Logo"
          />
        </Link>
        <ListLink />
        <ListButton />
      </div>
    </div>
  );
};

export default NavBar;
