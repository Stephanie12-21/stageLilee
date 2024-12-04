"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Heart,
  Home,
  Mail,
  Megaphone,
  MenuIcon,
  Newspaper,
  Star,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Logo } from "@/public/assets";
import NavigationDesk from "../admin/_components/NavigationDesk";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

export default function LayoutAdmin({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [testimony, setTestimony] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!testimony || rating === 0) {
      alert("Veuillez écrire un témoignage et donner une note.");
      return;
    }

    const data = {
      userId: session.user.id,
      testimony,
      rating,
    };

    try {
      const response = await fetch("/api/testimony/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Témoignage soumis avec succès !");
        setTestimony("");
        setRating(0);
        handleCloseDialog();
      } else {
        alert("Erreur lors de la soumission du témoignage.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite.");
    }
  };

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

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
      <div className="hidden  md:block bg-primary">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center py-10 px-4 lg:h-[60px] lg:px-6 ">
            <Link href="/" className="flex items-center gap-2  font-semibold">
              <Image src={Logo} alt="logo" width={200} height={100} />
            </Link>
          </div>
          <div className="flex-1 bg-primary">
            <NavigationDesk />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-[70px] items-center gap-4 bg-primary px-8 lg:h-[70px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <div>
                <MenuIcon className="h-7 w-7 shrink-0 md:hidden text-white cursor-pointer" />
                <span className="sr-only">Icône du menu</span>
              </div>
            </SheetTrigger>

            <SheetContent side="left" className="flex flex-col bg-primary">
              <div className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 font-semibold"
                >
                  <Image src={Logo} alt="logo" width={200} height={100} />
                </Link>

                <Link
                  href={session ? `/admin/` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                >
                  <Home className="h-5 w-5" />
                  Tableau de bord
                </Link>

                <div className="relative">
                  <div
                    onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                  >
                    <div className="flex items-center gap-4 text-lg">
                      <Megaphone className="h-5 w-5" />
                      Annonces
                    </div>

                    <div className="ml-auto">
                      {isSubmenuOpen ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronUp className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  {isSubmenuOpen && (
                    <div className="ml-8 mt-2 flex flex-col text-[17px] space-y-2">
                      <a
                        href={session ? `/admin/annonces` : "#"}
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                      >
                        Vos annonces
                      </a>
                      <a
                        href="/admin/annonces/usersAnnonces"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                      >
                        Les annonces des utilisateurs
                      </a>
                    </div>
                  )}
                </div>

                <Link
                  href={session ? `/admin/blog` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                >
                  <Newspaper className="h-5 w-5" />
                  Blog & presse
                </Link>

                <Link
                  href={session ? `/admin/favoris` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                >
                  <Heart className="h-5 w-5" />
                  Favoris
                </Link>

                <Link
                  href={session ? `/admin/messages/${session.user.id}` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  Messages
                </Link>

                <Link
                  href={session ? `/admin/users` : "#"}
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-white"
                >
                  <UsersRound className="h-[24px] w-[24px]" />
                  Comptes utilisateurs
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative"></div>
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
                  <EllipsisVertical className="text-gray-400" />
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

              <DropdownMenuItem
                onClick={() => handleOpenDialog(session.user.id)}
              >
                Noter la plateforme LILEE
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Button variant="outline" onClick={handleSignOut}>
                  Se déconnecter
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="max-w-md w-full p-6 gap-6">
              <AlertDialogHeader className="space-y-4">
                <AlertDialogTitle className="text-2xl font-bold text-center">
                  Noter la plateforme LILEE
                </AlertDialogTitle>
                <AlertDialogDescription className="text-center text-gray-600">
                  Votre avis est précieux pour nous aider à améliorer votre
                  expérience
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="flex flex-col gap-6 py-4">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Sélectionnez une note
                  </span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        className="relative p-1 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          size={32}
                          className={`transition-colors duration-200 ${
                            star <= (hover || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="testimony"
                    className="text-sm font-medium text-gray-700"
                  >
                    Partagez votre expérience
                  </label>
                  <Textarea
                    id="testimony"
                    value={testimony}
                    onChange={(e) => setTestimony(e.target.value)}
                    required
                    className="min-h-[120px] resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Qu'avez-vous apprécié ? Que pourrions-nous améliorer ?"
                  />
                </div>
              </div>

              <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
                <Button
                  onClick={handleSubmit}
                  className="w-full  text-white py-2"
                  disabled={!rating || !testimony.trim()}
                >
                  Soumettre mon avis
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleCloseDialog}
                  className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  Annuler
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </header>
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
}
