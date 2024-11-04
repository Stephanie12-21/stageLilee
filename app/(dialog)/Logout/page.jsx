"use client"; // Ajoute ceci au tout début du fichier

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
export function Logout() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Se déconnecter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            Souhaitez-vous vraiment vous déconnecter ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col">
          {/* Bouton pour confirmer la déconnexion */}
          <Button onClick={handleSignOut}>Oui, je veux me déconnecter</Button>

          {/* Bouton pour rester connecté */}
          <Button
            className="w-full bg-transparent text-black border border-black hover:bg-black hover:text-white"
            onClick={() => router.back()}
          >
            Non, je reste connecté
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
