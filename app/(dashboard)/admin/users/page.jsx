"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FaEllipsisH } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

const UserPage = () => {
  const [raison, setRaison] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuspendAlertOpen, setIsSuspendAlertOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/getAll");
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user) => user.role !== "ADMIN"
        ); // Filtrer les utilisateurs
        setUsers(filteredUsers);

        data.users.forEach((user) => {
          console.log("Statut de l'utilisateur :", user.statutUser);
          if (user.profileImages.length > 0) {
            console.log(
              "Lien de l'image de l'utilisateur :",
              user.profileImages[0].path
            );
          } else {
            console.log("Pas d'image pour cet utilisateur");
          }
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSeeUserInfo = (userId) => {
    console.log("ID de l'utilisateur sélectionné :", userId);
    router.push(`/admin/users/${userId}`);
  };

  const handleAlertUser = () => {
    setIsAlertOpen(true);
  };

  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handleSuspendUser = () => {
    setIsSuspendAlertOpen(true);
  };

  const handleCloseSuspendAlert = () => {
    setIsSuspendAlertOpen(false);
  };

  const handleConfirmSuspendUser = () => {
    console.log("Utilisateur suspendu");
    setIsSuspendAlertOpen(false);
  };

  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.profileImages?.[0]?.path;
        return imageUrl ? (
          <Image
            src={imageUrl}
            alt="Profil"
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        ) : (
          "Pas d'image"
        );
      },
    },
    // { accessorKey: "id", header: "Identifiant" },
    { accessorKey: "nom", header: "Nom" },
    { accessorKey: "prenom", header: "Prénom" },
    { accessorKey: "email", header: "Adresse email" },
    { accessorKey: "phone", header: "Téléphone" },
    { accessorKey: "role", header: "Type de compte" },
    { accessorKey: "statutUser", header: "Statut" },
    {
      header: "Actions",
      cell: ({ row }) => {
        console.log(row);
        return (
          <div className="flex justify-left">
            <DropdownMenu>
              <div className="flex rounded-full p-2">
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-fit h-fit p-0">
                    <FaEllipsisH className="cursor-pointer" size={24} />
                  </Button>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent align="end" className="w-fit p-2 mt-2">
                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    onClick={() => handleSeeUserInfo(row.original.id)}
                  >
                    Voir le profil de l&apos;utilisateur
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="outline" onClick={handleAlertUser}>
                    Avertir l&apos;utilisateur
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button variant="outline" onClick={handleSuspendUser}>
                    Suspendre l&apos;utilisateur
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="space-y-3">
      <h1>Liste des utilisateurs</h1>
      <Input placeholder="Rechercher ici ..." className="max-w-sm" />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <h2 className="text-lg font-semibold">Avertir l&apos;utilisateur</h2>
          <div className="grid gap-2">
            <Label htmlFor="email">Email de l&apos;utilisateur</Label>
            <Input
              id="email"
              placeholder="email de l'utilisateur à avertir"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="raison">Raison de l&apos;avertissement</Label>
            <Input
              id="raison"
              placeholder="Ecrire ici la raison "
              value={raison}
              onChange={(e) => setRaison(e.target.value)}
              className="bg-white p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              required
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez votre message ici"
              className="col-span-3 w-full h-10 bg-white text-[16px]  font-medium p-2 rounded-md"
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <AlertDialogCancel asChild>
              <Button
                className="underline"
                variant="secondary"
                onClick={handleCloseAlert}
              >
                Annuler
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={handleCloseAlert}>
                Envoyer l&apos;avertissement
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isSuspendAlertOpen}
        onOpenChange={setIsSuspendAlertOpen}
      >
        <AlertDialogContent className="flex flex-col space-y-2 justify-center items-center ">
          <h2 className="text-lg font-semibold">
            Suspendre l&apos;utilisateur
          </h2>
          <p>
            Vous êtes sûr de vouloir cet utilisateur?
            <br />
            NB: Cet utilisateur ne pourra plus accéder à son compte utilisateur.
          </p>
          <div className="mt-4 flex justify-center space-x-2">
            <AlertDialogCancel asChild>
              <Button
                className="underline"
                variant="secondary"
                onClick={handleCloseSuspendAlert}
              >
                Annuler
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={handleConfirmSuspendUser}>
                Suspendre l&apos;utilisateur
              </Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserPage;
