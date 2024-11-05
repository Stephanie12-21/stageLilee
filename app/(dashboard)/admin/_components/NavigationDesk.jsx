import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Home,
  Megaphone,
  Newspaper,
  Heart,
  Mail,
  Users,
  TrendingUp,
} from "lucide-react";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const DataLinkNav = [
    {
      icon: Home,
      name: "Dashboard",
      href: session ? `/admin/${session.user.id}` : "#",
    },
    {
      icon: Megaphone,
      name: "Annonces",
      href: session ? `/admin/${session.user.id}/annonces` : "#",
    },
    {
      icon: Newspaper,
      name: "Blog & presse",
      href: session ? `/admin/${session.user.id}/blog` : "#",
    },
    {
      icon: Heart,
      name: "Favoris",
      href: session ? `/admin/${session.user.id}/favoris` : "#",
    },
    {
      icon: Mail,
      name: "Messages",
      href: session ? `/admin/${session.user.id}/messages` : "#",
    },
    {
      icon: Users,
      name: "Comptes utilisateurs",
      href: session ? `/admin/${session.user.id}/users` : "#",
    },
    {
      icon: TrendingUp,
      name: "Transactions",
      href: session ? `/admin/${session.user.id}/transactions` : "#",
    },
  ];

  return (
    <nav className="grid items-start px-2 text-[16px] font-medium lg:px-4">
      <Linknav pathname={pathname} DataLinkNav={DataLinkNav} />
    </nav>
  );
};

export default Navigation;

function Linknav({ pathname, DataLinkNav }) {
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
