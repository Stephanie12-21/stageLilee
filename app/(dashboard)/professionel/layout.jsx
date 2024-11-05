"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  CircleUser,
  EllipsisVerticalIcon,
  Home,
  LineChart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Logo, LogoSite } from "@/public/assets";
import NavigationDesk from "../professionel/_components/NavigationDesk";
import { Label } from "@/components/ui/label";
import {
  FaBullhorn,
  FaChartLine,
  FaEnvelope,
  FaHeart,
  FaHome,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LayoutAdmin({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  if (!session?.user) {
    return (
      <div>
        <h2>
          Veuillez vous connecter à votre compte
          <span>
            <Link href="/login"> Se connecter</Link>
          </span>
        </h2>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src={Logo}
                alt="logo"
                width={180}
                height={80}
                className="size-40"
              />
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <NavigationDesk />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-8 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Image
                    src={LogoSite}
                    alt="Logo mobile"
                    width={40}
                    height={40}
                    className="size-40"
                  />
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaHome className="h-5 w-5" />
                  Tableau de bord
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <FaBullhorn className="h-5 w-5" />
                  Annonces
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaHeart className="h-5 w-5" />
                  Favoris
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaEnvelope className="h-5 w-5" />
                  Messages
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaChartLine className="h-5 w-5" />
                  Transactions
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu className="w-full h-fit p-4">
            <DropdownMenuTrigger asChild>
              <div className="flex space-x-3">
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full border-none"
                >
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="User profile"
                      width={40} // Taille de l'image (width et height identiques pour un carré)
                      height={40}
                      className="w-8 h-8 rounded-full object-cover" // Ajuste l'image dans le bouton
                    />
                  ) : (
                    <span className="sr-only">User profile</span>
                  )}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {" "}
              {/* Changez w-64 à la largeur souhaitée */}
              <DropdownMenuLabel>
                {session?.user?.nom && session?.user?.prenom ? (
                  <Label className="text-orange-500 font-bold text-xl">
                    {session.user.nom} {session.user.prenom}
                  </Label>
                ) : null}

                {/* Ajoutez ici la date de création du compte */}
                {session?.user?.id ? ( // Remplacez 'dateCreation' par le nom réel de votre champ pour la date
                  <p className="text-gray-600 text-sm">{session.user.email}</p>
                ) : null}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.id ? ( // Remplacez 'dateCreation' par le nom réel de votre champ pour la date
                  <Link href={`/professionel/profile/${session.user.id}`}>
                    Votre profil
                  </Link>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.id ? ( // Remplacez 'dateCreation' par le nom réel de votre champ pour la date
                  <Link href={`/professionel/security/${session.user.id}`}>
                    Sécurité
                  </Link>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.id ? ( // Remplacez 'dateCreation' par le nom réel de votre champ pour la date
                  <Link href={"/professionel/contact/"}>
                    Contacter l&apos; administrateur
                  </Link>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="outline" onClick={handleSignOut}>
                  Se déconnecter
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
}
