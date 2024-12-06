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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UserPage = () => {
  const [raison, setRaison] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuspendAlertOpen, setIsSuspendAlertOpen] = useState(false);
  const [isActivationAlertOpen, setIsActivationAlertOpen] = useState(false);
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
  const openActivationAlert = (user) => {
    setSelectedUser(user);
    setEmail(user.email);
    setUserId(user.id);
    setIsActivationAlertOpen(true);
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

  const handleConfirmActivationUser = async () => {
    const statutUser = "ACTIF";
    try {
      const response = await fetch(`/api/user/activationUser/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statutUser,
          email,
        }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Erreur du serveur:", textResponse);
        throw new Error(textResponse || "Une erreur s'est produite");
      }

      const data = await response.json();

      if (data.error) {
        alert(data.error || "Une erreur s'est produite lors de l'activation.");
        return;
      }

      alert(
        "Le compte de l'utilisateur a été activé et l'utilisateur a été informé par email."
      );
      await fetchUsers();
    } catch (error) {
      console.error("Erreur lors de l'activation :", error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setIsActivationAlertOpen(false); // Fermez l'alerte ou le modal
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

    {
      accessorKey: "role",
      header: "Type de compte",
      cell: ({ row }) => {
        const role = row.original.role;

        const roleText = {
          PERSO: "particulier",
          PRO: "professionnel",
        };

        const statusColor = {
          PERSO: "bg-primary text-white hover:bg-primary hover:text-white",
          PRO: "bg-orange-100 text-orange-500 hover:bg-orange-100 hover:text-orange-500",
        };

        return (
          <Badge
            className={`px-3 py-[5px] rounded-full ${
              statusColor[role] || "bg-gray-100 text-gray-800"
            }`}
          >
            {roleText[role] || "Inconnu"}
          </Badge>
        );
      },
    },

    {
      accessorKey: "statutUser",
      header: "Statut",
      cell: ({ row }) => {
        const statut = row.original.statutUser;

        const statusText = {
          ACTIF: "actif",
          SUSPENDU: "suspendue",
        };

        const statusColor = {
          ACTIF: "bg-primary text-white hover:bg-primary hover:text-white",
          SUSPENDU:
            "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800",
        };

        return (
          <Badge
            className={`px-3 py-[5px] rounded-full ${
              statusColor[statut] || "bg-gray-100 text-gray-800"
            }`}
          >
            {statusText[statut] || "Inconnu"}
          </Badge>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const statut = row.original.statutUser; // Récupérer le statut de l'utilisateur
        const actionLabel =
          statut === "ACTIF"
            ? "Suspendre l'utilisateur"
            : "Activer l'utilisateur"; // Modifier le libellé

        return (
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
                    onClick={() => {
                      if (row.original.statutUser === "ACTIF") {
                        openSuspendAlert(row.original);
                      } else if (row.original.statutUser === "SUSPENDU") {
                        openActivationAlert(row.original);
                      }
                    }}
                  >
                    {row.original.statutUser === "ACTIF"
                      ? "Suspendre le compte"
                      : "Activer le compte"}{" "}
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
    data: filteredUsersData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Liste de toutes les annonces de LILEE
      </h1>

      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between pt-8 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full max-w-full mx-auto">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher ici ..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-primary/20 transition-colors bg-white"
            />
          </div>

          <div className="flex flex-row space-x-4 items-center w-full md:w-2/3">
            <Select
              value={roleFilter}
              onValueChange={(value) => setRoleFilter(value)}
            >
              <SelectTrigger className="w-full">
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
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-full">
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
      </div>

      <div className="pt-7">
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
      </div>

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

      <AlertDialog
        open={isActivationAlertOpen}
        onOpenChange={setIsActivationAlertOpen}
      >
        <AlertDialogContent>
          <AlertDialogTitle>
            Êtes-vous sûr d&apos;activer cet utilisateur, avec l&apos; {userId}
          </AlertDialogTitle>
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmActivationUser}>
              Activer
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default UserPage;
