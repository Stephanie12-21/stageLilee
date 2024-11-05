"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { FaEllipsisV } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="flex gap-2 items-center">
      {session ? (
        <DropdownMenu>
          <div className="flex items-center space-x-3 bg-dark rounded-full p-2">
            <Image
              src={session.user.image || "/default-avatar.png"}
              alt="User profile"
              width={50}
              height={50}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-orange-500 font-bold text-[16px]">
                {session.user.nom} {session.user.prenom}
              </span>
            </div>

            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-gray-700">
                <FaEllipsisV className="text-gray-400" />
              </button>
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent align="end" className="w-64 mt-2">
            <DropdownMenuLabel>
              <p className="text-orange-500 font-bold text-xl">
                {session.user.nom} {session.user.prenom}
              </p>
              <p className="text-gray-600 text-sm">{session.user.email}</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/admin/profile/${session.user.id}`}>
                Votre profil
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/admin/security/${session.user.id}`}>Sécurité</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href={`/admin/`}>Espace client</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Button variant="outline" onClick={handleSignOut}>
                Se déconnecter
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Toaster position="top-right" />
          <Button
            className="px-5 rounded-[10px] text-[16px] text-white font-semibold bg-transparent border-[1px] hover:bg-transparent hover:text-white"
            onClick={() =>
              toast(
                <div>
                  <span style={{ fontSize: "17px", fontWeight: "semibold" }}>
                    Pour pouvoir déposer une annonce et se satisfaire pleinement
                    des fonctionnalités du site, il faut d&apos;abord accéder à
                    votre espace utilisateur.
                  </span>
                  <div className="mt-2">
                    <span
                      className="text-[#15213d] text-[17px] hover:underline font-semibold cursor-pointer"
                      onClick={() => toast.dismiss()}
                    >
                      Très bien, d&apos;accord
                    </span>
                  </div>
                </div>
              )
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
        </>
      )}
    </div>
  );
};

// Define the NavBar component

const NavBar = () => {
  return (
    <div className="container pt-5">
      <div className="flex justify-between items-center ">
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
