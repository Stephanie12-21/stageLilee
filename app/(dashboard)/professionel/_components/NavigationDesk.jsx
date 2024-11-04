import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DataLinkNav = [
  { icon: Home, name: "Dashboard", href: "/professionel" },
  { icon: ShoppingCart, name: "Orders", href: "/professionel/orders" },
  { icon: Package, name: "Products", href: "/professionel/products" },
  { icon: Users, name: "Customers", href: "/professionel/customers" },
  { icon: LineChart, name: "Analytics", href: "/professionel/analytics" },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 bg-white">
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
          className={`flex items-center gap-3 bg-white rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary focus:text-primary ${
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
