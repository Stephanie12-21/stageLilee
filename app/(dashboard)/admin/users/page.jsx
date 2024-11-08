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
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { AlertTitle } from "@/components/ui/alert";

const UserPage = () => {
  const [raison, setRaison] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuspendAlertOpen, setIsSuspendAlertOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/user/getAll");
      const data = await response.json();
      const filteredUsers = data.users.filter((user) => user.role !== "ADMIN");
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUsers();
  }, []);

  const filteredUsersData = useMemo(() => {
    const searchLower = searchFilter.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        user.nom.toLowerCase().includes(searchLower) ||
        user.prenom.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.phone.toLowerCase().includes(searchLower);
      const matchesRole =
        roleFilter === "all" || user.role.toLowerCase() === roleFilter;
      const matchesStatus =
        statusFilter === "all" ||
        user.statutUser.toLowerCase() === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchFilter, roleFilter, statusFilter]);

  const handleSeeUserInfo = useCallback(
    (userId) => {
      console.log("ID de l'utilisateur sélectionné :", userId);
      router.push(`/admin/users/${userId}`);
    },
    [router]
  );

  const openAlert = (user) => {
    setSelectedUser(user);
    setEmail(user.email);
    setIsAlertOpen(true);
  };

  const openSuspendAlert = (user) => {
    setSelectedUser(user);
    setEmail(user.email);
    setUserId(user.id);
    setIsSuspendAlertOpen(true);
  };

  const handleConfirmAlertUser = async () => {
    if (!messageAlert) {
      alert("Veuillez entrer une raison pour la suspension.");
      return;
    }

    try {
      const response = await fetch("/api/user/alertUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          messageAlert,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("L'utilisateur a été alerté et informé par email.");
      } else {
        alert(data.error || "Une erreur s'est produite lors de la suspension.");
      }
    } catch (error) {
      console.error("Erreur lors de la suspension :", error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      // Fermer le dialogue après l'action
      setIsSuspendAlertOpen(false);
    }
  };

  const handleConfirmSuspendUser = async () => {
    if (!raison) {
      alert("Veuillez entrer une raison pour la suspension.");
      return;
    }

    const statutUser = "SUSPENDU";
    try {
      const response = await fetch(`/api/user/suspendUser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raison,
          statutUser,
          email,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("L'utilisateur a été suspendu et informé par email.");
        await fetchUsers();
      } else {
        alert(data.error || "Une erreur s'est produite lors de la suspension.");
      }
    } catch (error) {
      console.error("Erreur lors de la suspension :", error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setIsSuspendAlertOpen(false);
    }
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
                  Voir le profil de l&apos;utilisateur
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="outline"
                  onClick={() => openAlert(row.original)}
                >
                  Avertir l&apos;utilisateur
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="outline"
                  onClick={() => openSuspendAlert(row.original)}
                >
                  Suspendre l&apos;utilisateur
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
      <div className="flex justify-between space-x-10 mx-6">
        <Input
          placeholder="Rechercher ici ..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex justify-center space-x-3">
          <Select
            value={roleFilter}
            onValueChange={(value) => setRoleFilter(value)}
          >
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Sélectionner le type de compte" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="pro">Professionnel</SelectItem>
                <SelectItem value="perso">Personnel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)} // Mettez à jour le filtre de statut ici
          >
            <SelectTrigger className="w-fit px-5">
              <SelectValue placeholder="Sélectionner le statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="actif">Actif</SelectItem>
                <SelectItem value="nonActif">Non actif</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

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
          <Label htmlFor="email" className="text-[16px] ">
            Email de l&apos;utilisateur :{" "}
            <span className="text-blue-950 font-bold">{email}</span>
          </Label>

          <Label htmlFor="message" className="text-[16px] font-medium">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Écrire un message ..."
            value={messageAlert}
            onChange={(e) => setMessageAlert(e.target.value)}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAlertUser}>
              Envoyer
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isSuspendAlertOpen}
        onOpenChange={setIsSuspendAlertOpen}
      >
        <AlertDialogContent>
          <Label htmlFor="email" className="text-[16px]">
            Email de l&apos;utilisateur :{" "}
            <span className="text-blue-950 font-bold">{email}</span>
            <span>Avec l&apos; identifiant :{userId}</span>
          </Label>

          <Label htmlFor="raison" className="text-[16px] font-medium">
            Raison de la suspension
          </Label>
          <Textarea
            id="raison"
            placeholder="Expliquez pourquoi cet utilisateur est suspendu..."
            value={raison}
            onChange={(e) => setRaison(e.target.value)} // Met à jour la raison
          />

          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSuspendUser}>
              Suspendre
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserPage;
