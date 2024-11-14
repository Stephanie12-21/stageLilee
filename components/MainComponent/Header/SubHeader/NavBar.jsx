"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

const links = [
  { path: "/", name: "Accueil" },
  { path: "/Annonces", name: "Annonces" },
  { path: "/Contact", name: "Contact" },
  { path: "/Blog", name: "Blog" },
];

// Define the ListLink component
export const ListLink = () => {
  const path = usePathname();
  return (
    <nav className="flex max-md:hidden justify-between items-center gap-8">
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

// Define the NavBar component

export default function NavBar() {
  const [toggle, setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle((prevState) => !prevState);
  };

  return (
    <div className="container p-4 md:px-8">
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
        <Menu
          onClick={toggleMenu}
          className="absolute text-muted hidden max-md:block z-50 right-8 cursor-pointer"
        />
        {toggle && <NavMob toggleMenu={toggleMenu} />}
      </div>
    </div>
  );
}

function NavMob({ toggleMenu }) {
  const path = usePathname();
  return (
    <div className="z-10 left-0 absolute top-0 right-0 w-full min-h-screen h-full bg-red-600 transform translate-y-0">
      <div className="flex flex-col items-center gap-24 container p-4 md:px-8">
        <nav className="flex flex-col mt-32 items-center gap-16">
          {links.map((link) => (
            <Link
              href={link.path}
              key={link.path}
              className="relative capitalize text-white text-xl font-semibold"
              onClick={toggleMenu}
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
      </div>
    </div>
  );
}
