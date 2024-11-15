// import { Heart, Home, Mail, Megaphone, TrendingUp } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const DataLinkNav = [
//   // { icon: Home, name: "Dashboard", href: "/personnel" },
//   { icon: Megaphone, name: "Annonces", href: "/personnel/annonces" },
//   { icon: Heart, name: "Favoris", href: "/personnel/favoris" },
//   { icon: Mail, name: "Messages", href: "/personnel/messages" },
//   { icon: TrendingUp, name: "Transactions", href: "/personnel/transactions" },
// ];

// const Navigation = () => {
//   const pathname = usePathname();

//   return (
//     <nav className="grid items-start px-2 text-[16px] font-medium lg:px-4">
//       <Linknav pathname={pathname} />
//     </nav>
//   );
// };

// export default Navigation;

// function Linknav({ pathname }) {
//   return (
//     <>
//       {DataLinkNav.map((i) => (
//         <Link
//           key={i.href}
//           href={i.href}
//           className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary focus:text-primary ${
//             pathname === i.href ? "text-primary" : ""
//           }`}
//         >
//           <i.icon className="h-4 w-4" />
//           {i.name}
//         </Link>
//       ))}
//     </>
//   );
// }

import { Heart, Mail, Megaphone, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const DataLinkNav = [
    // { icon: Home, name: "Dashboard", href: "/professionel" },
    { icon: Megaphone, name: "Annonces", href: "/professionel/annonces" },
    { icon: Heart, name: "Favoris", href: "/professionel/favoris" },
    {
      icon: Mail,
      name: "Messages",
      href: session ? `/professionel/messages/${session.user.id}` : "#",
    },
    {
      icon: TrendingUp,
      name: "Transactions",
      href: "/professionel/transactions",
    },
  ];

  return (
    <nav className="grid items-start px-2 text-[16px] font-medium lg:px-4">
      <Linknav DataLinkNav={DataLinkNav} pathname={pathname} />
    </nav>
  );
};

export default Navigation;

function Linknav({ DataLinkNav, pathname }) {
  return (
    <>
      {DataLinkNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary focus:text-primary ${
            pathname === item.href ? "text-primary" : ""
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </>
  );
}
