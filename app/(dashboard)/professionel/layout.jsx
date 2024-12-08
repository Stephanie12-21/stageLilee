"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { Bell, Menu, Search, Star } from "lucide-react";
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

import NavigationDesk from "../professionel/_components/NavigationDesk";
import { Label } from "@/components/ui/label";
import { FaBullhorn, FaChartLine, FaEnvelope, FaHeart } from "react-icons/fa";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LayoutAdmin({ children }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [testimony, setTestimony] = useState("");
  const [isEditing, setIsEditing] = useState(true);

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

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center  min-h-screen bg-gray-100">
        <Card className="w-full max-w-md p-4">
          <CardHeader>
            <CardTitle className="text-2xl text-primary font-bold text-center">
              Connexion requise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6 text-gray-600">
              Veuillez vous connecter à votre compte pour continuer
            </p>
            <div className="flex justify-center">
              <Button asChild className="w-full">
                <Link href="/login">Se connecter</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
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
                src="/assets/logo.svg"
                width="200"
                height="100"
                alt="Logo Lilee"
                className="absolute top-4 left-40 max-md:left-8 h-[70px]"
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
                {/* <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <FaHome className="h-5 w-5" />
                  Tableau de bord
                </Link> */}
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
                      width={40}
                      height={40}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <span className="sr-only">User profile</span>
                  )}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {" "}
              <DropdownMenuLabel>
                {session?.user?.nom && session?.user?.prenom ? (
                  <Label className="text-orange-500 font-bold text-xl">
                    {session.user.nom} {session.user.prenom}
                  </Label>
                ) : null}

                {session?.user?.id ? (
                  <p className="text-gray-600 text-sm">{session.user.email}</p>
                ) : null}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.id ? (
                  <Link href={`/professionel/profile/${session.user.id}`}>
                    Votre profil
                  </Link>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.id ? (
                  <Link href={`/professionel/security/${session.user.id}`}>
                    Modifier le mot de passe
                  </Link>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session?.user?.id ? (
                  <Link href={"/professionel/contact/"}>
                    Contacter l&apos; administrateur
                  </Link>
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleOpenDialog(session.user.id)}
              >
                Noter la plateforme LILEE
              </DropdownMenuItem>
              <DropdownMenuSeparator />
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
