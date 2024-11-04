import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  FaBullhorn,
  FaChartLine,
  FaEnvelope,
  FaHeart,
  FaHome,
} from "react-icons/fa";

const DataLinkNav = [
  { icon: FaHome, name: "Dashboard", href: "/personnel" },
  { icon: FaBullhorn, name: "Annonces", href: "/personnel/annonces" },
  { icon: FaHeart, name: "Favoris", href: "/personnel/favoris" },
  { icon: FaEnvelope, name: "Messages", href: "/personnel/messages" },
  { icon: FaChartLine, name: "Transactions", href: "/personnel/transactions" },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-[16px] font-medium lg:px-4">
      <Linknav pathname={pathname} />
    </nav>
  );
};

export default Navigation;

function Linknav({ pathname }) {
  return (
    <>
      {DataLinkNav.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary focus:text-primary ${
            pathname === i.href ? "text-primary" : ""
          }`}
        >
          <i.icon className="h-4 w-4" />
          {i.name}
        </Link>
      ))}
    </>
  );
}
