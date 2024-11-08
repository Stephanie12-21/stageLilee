"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
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

const UserPage = () => {
  const [raison, setRaison] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuspendAlertOpen, setIsSuspendAlertOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/getAll");
        const data = await response.json();
        const filteredUsers = data.users.filter(
          (user) => user.role !== "ADMIN"
        );
        setUsers(filteredUsers);
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

  const filteredUsersData = useMemo(() => {
    const searchLower = searchFilter.toLowerCase();
    return users.filter(
      (user) =>
        user.nom.toLowerCase().includes(searchLower) ||
        user.prenom.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower)
    );
  }, [users, searchFilter]);

  const handleSeeUserInfo = useCallback(
    (userId) => {
      console.log("ID de l'utilisateur sélectionné :", userId);
      router.push(`/admin/users/${userId}`);
    },
    [router]
  );

  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);
  const openSuspendAlert = () => setIsSuspendAlertOpen(true);
  const closeSuspendAlert = () => setIsSuspendAlertOpen(false);
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
    { accessorKey: "nom", header: "Nom" },
    { accessorKey: "prenom", header: "Prénom" },
    { accessorKey: "email", header: "Adresse email" },
    { accessorKey: "phone", header: "Téléphone" },
    { accessorKey: "role", header: "Type de compte" },
    { accessorKey: "statutUser", header: "Statut" },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-fit h-fit p-0">
                <FaEllipsisH className="cursor-pointer" size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-fit p-2 mt-2">
              <DropdownMenuItem>
                <Button
                  variant="outline"
                  onClick={() => handleSeeUserInfo(row.original.id)}
                >
                  Voir le profil de lutilisateur
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="outline" onClick={openAlert}>
                  Avertir lutilisateur
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button variant="outline" onClick={openSuspendAlert}>
                  Suspendre lutilisateur
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: filteredUsersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="space-y-3">
      <h1>Liste des utilisateurs</h1>
      <Input
        placeholder="Rechercher ici ..."
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        className="max-w-sm"
      />
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
          <Label>Raison</Label>
          <Textarea
            value={raison}
            onChange={(e) => setRaison(e.target.value)}
          />
          <AlertDialogCancel onClick={closeAlert}>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={closeAlert}>Envoyer</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isSuspendAlertOpen}
        onOpenChange={setIsSuspendAlertOpen}
      >
        <AlertDialogContent>
          <Label>Message</Label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <AlertDialogCancel onClick={closeSuspendAlert}>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmSuspendUser}>
            Suspendre
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserPage;
