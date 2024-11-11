import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Home,
  Megaphone,
  Newspaper,
  Heart,
  Mail,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const Navigation = () => {
  const { data: session } = useSession();

  const pathname = usePathname();
  const [isAnnoncesOpen, setIsAnnoncesOpen] = useState(false); // État pour gérer le sous-menu "Annonces"
  const DataLinkNav = [
    {
      icon: Home,
      name: "Dashboard",
      href: session ? `/admin/` : "#",
    },
    {
      icon: Megaphone,
      name: "Annonces",
      href: "#",
      submenu: [
        {
          name: "Vos annonces",
          href: session ? `/admin/annonces` : "#",
        },
        {
          name: "Annonces des utilisateurs",
          href: session ? `/admin/annonces/usersAnnonces` : "#",
        },
      ],
    },
    {
      icon: Newspaper,
      name: "Blog & presse",
      href: session ? `/admin/blog` : "#",
    },
    {
      icon: Heart,
      name: "Favoris",
      href: session ? `/admin/favoris` : "#",
    },
    {
      icon: Mail,
      name: "Messages",
      href: session ? `/admin/messages/${session.user.id}` : "#",
    },
    {
      icon: Users,
      name: "Comptes utilisateurs",
      href: session ? `/admin/users` : "#",
    },
    {
      icon: TrendingUp,
      name: "Transactions",
      href: session ? `/admin/transactions` : "#",
    },
  ];

  return (
    <nav className="grid items-start px-2 text-[16px] font-medium lg:px-4">
      <Linknav
        pathname={pathname}
        DataLinkNav={DataLinkNav}
        isAnnoncesOpen={isAnnoncesOpen}
        setIsAnnoncesOpen={setIsAnnoncesOpen}
      />
    </nav>
  );
};

export default Navigation;

function Linknav({ pathname, DataLinkNav, isAnnoncesOpen, setIsAnnoncesOpen }) {
  return (
    <>
      {DataLinkNav.map((i) => (
        <div key={i.href}>
          <Link
            href={i.href}
            onClick={(e) => {
              if (i.name === "Annonces") {
                e.preventDefault();
                setIsAnnoncesOpen(!isAnnoncesOpen);
              }
            }}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary focus:text-primary ${
              pathname === i.href ? "text-primary" : ""
            }`}
          >
            <i.icon className="h-4 w-4" />
            {i.name}
            {i.name === "Annonces" && (
              <span className="ml-auto">
                {isAnnoncesOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronUp className="h-4 w-4" />
                )}
              </span>
            )}
          </Link>

          {i.name === "Annonces" && isAnnoncesOpen && i.submenu && (
            <div className="ml-6 flex flex-col space-y-1 mt-1">
              {i.submenu.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="text-[16px] text-muted-foreground hover:text-primary px-3 py-1"
                >
                  {subItem.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
