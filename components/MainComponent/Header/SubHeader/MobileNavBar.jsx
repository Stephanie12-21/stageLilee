"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
const links = [
  { path: "/", name: "Accueil" },
  { path: "/Annonces", name: "Annonces" },
  { path: "/Contact", name: "Contact" },
  { path: "/Blog", name: "Blog" },
];
export default function NavMob() {
  const path = usePathname();
  return (
    <div className="z-40 left-0 absolute top-0 right-0 w-full min-h-screen h-full bg-green-600 transform -translate-y-full ">
      <div className="flex flex-col items-center gap-24 container p-4 md:px-8">
        <nav className="flex flex-col mt-32 items-center gap-16">
          {links.map((link) => (
            <Link
              href={link.path}
              key={link.path}
              className="relative capitalize text-white text-xl font-semibold"
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
