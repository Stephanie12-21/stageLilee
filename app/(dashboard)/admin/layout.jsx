"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ChevronDown, ChevronUp, Megaphone, Menu, Search } from "lucide-react";
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
import NavigationDesk from "../admin/_components/NavigationDesk";

import {
  FaChartLine,
  FaEllipsisV,
  FaEnvelope,
  FaHeart,
  FaHome,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LayoutAdmin({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

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
                  href={session ? `/admin/` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaHome className="h-5 w-5" />
                  Tableau de bord
                </Link>

                <div className="relative">
                  <button
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className="mx-[-0.65rem] w-full flex items-center justify-between gap-4 rounded-xl px-3 py-2 text-foreground hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Megaphone className="h-5 w-5" />
                      Annonces
                    </div>
                    {isSubmenuOpen ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronUp className="h-4 w-4" />
                    )}
                  </button>

                  {isSubmenuOpen && (
                    <div className="ml-8 mt-2 flex flex-col space-y-2">
                      <a
                        href={
                          session ? `/admin/${session.user.id}/annonces` : "#"
                        }
                        className="flex items-center gap-4 rounded-lg px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        Vos annonces
                      </a>
                      <a
                        href="/admin/annonces/annonces-restreintes"
                        className="flex items-center gap-4 rounded-lg px-3 py-1 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        Les annonces restreintes
                      </a>
                    </div>
                  )}
                </div>

                <Link
                  href={session ? `/admin/favoris` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaHeart className="h-5 w-5" />
                  Favoris
                </Link>

                <Link
                  href={session ? `/admin/messages` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaEnvelope className="h-5 w-5" />
                  Messages
                </Link>

                <Link
                  href={session ? `/admin/transactions` : "#"}
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
                <Button variant="ghost" className="p-2 rounded-full">
                  <FaEllipsisV className="text-gray-400" />
                </Button>
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
                <Link href={`/admin/security/${session.user.id}`}>
                  Sécurité
                </Link>
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
