"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import { fr } from "date-fns/locale";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { AlertTriangle, CalendarIcon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";

const UserPage = () => {
  const { data: session, status } = useSession();
  const [raison, setRaison] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSuspendAlertOpen, setIsSuspendAlertOpen] = useState(false);
  const [isActivationAlertOpen, setIsActivationAlertOpen] = useState(false);
  const [annonceID, setAnnonceId] = useState(null);
  const [annonceTitre, setSelectedAnnonceTitre] = useState(null);
  const [userId, setUserId] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const router = useRouter();

  // useEffect(() => {
  //   if (!session?.user) {
  //     router.push("/login");
  //   }
  // }, [session, router]);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const fetchAnnoncesUsers = async () => {
    try {
      const response = await fetch("/api/annonce/getAll");
      const data = await response.json();

      const updatedData = data.map((annonce) => {
        const userAnnonces = annonce.user.id;
        setUserId(userAnnonces);

        const notes = annonce.commentaire
          .map((c) => c.note)
          .filter((note) => note !== null);

        if (notes.length > 0) {
          const total = notes.reduce((acc, note) => acc + note, 0);
          const average = total / notes.length;

          annonce.averageNote = average;
        } else {
          annonce.averageNote = 0;
        }

        return annonce;
      });

      setUsers(updatedData);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAnnoncesUsers();
  }, []);

  const filteredUsersData = useMemo(() => {
    const searchLower = searchFilter.toLowerCase();
    return users.filter((user) => {
      const matchesSearch =
        user.titre.toLowerCase().includes(searchLower) ||
        user.description.toLowerCase().includes(searchLower) ||
        user.adresse.toLowerCase().includes(searchLower);

      const matchesCategory =
        categoryFilter === "all" ||
        user.categorieAnnonce.toLowerCase() === categoryFilter.toLowerCase();

      const matchesStatus =
        statusFilter === "all" ||
        user.statut.toLowerCase() === statusFilter.toLowerCase();

      const matchesDateRange =
        !date?.from ||
        !date?.to ||
        (new Date(user.createdAt) >= date.from &&
          new Date(user.createdAt) <= date.to);

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesDateRange
      );
    });
  }, [users, searchFilter, categoryFilter, statusFilter, date]);

  const handleSeeAnnonceInfo = useCallback(
    (annonceId) => {
      router.push(`/admin/annonces/usersAnnonces/id=${annonceId}`);
    },
    [router]
  );

  const openSuspendAlert = (annonce) => {
    setAnnonceId(annonce.id);
    setSelectedAnnonceTitre(annonce.titre);
    setEmail(annonce.user.email);
    setUserId(annonce.user.id);
    setIsSuspendAlertOpen(true);
  };

  const openActivationAlert = (annonce) => {
    setAnnonceId(annonce.id);
    setSelectedAnnonceTitre(annonce.titre);
    setEmail(annonce.user.email);
    setUserId(annonce.user.id);
    setIsActivationAlertOpen(true);
  };

  const handleConfirmSuspendAnnonce = async () => {
    if (!raison) {
      alert("Veuillez entrer une raison pour la suspension.");
      return;
    }

    const statut = "DESACTIVEE";
    try {
      const response = await fetch(`/api/annonce/suspendAnnonce/${annonceID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raison,
          statut,
          email,
          annonceTitre,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(
          "L'annonce a été desactivée et l'utilisateur a été informé par email."
        );
        await fetchAnnoncesUsers();
      } else {
        toast.error(
          data.error || "Une erreur s'est produite lors de la suspension."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suspension :", error);
      toast.error("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setIsSuspendAlertOpen(false);
    }
  };

  const handleConfirmActivationUser = async () => {
    const statut = "PUBLIEE";
    try {
      const response = await fetch(
        `/api/annonce/activationAnnonce/${annonceID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            statut,
            email,
            annonceTitre,
          }),
        }
      );

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("Erreur du serveur:", textResponse);
        throw new Error(textResponse || "Une erreur s'est produite");
      }

      const data = await response.json();

      if (data.error) {
        toast.error(
          data.error || "Une erreur s'est produite lors de l'activation."
        );
        return;
      }

      toast.success(
        "L'annonce a été activée et l'utilisateur a été informé par email."
      );
      await fetchAnnoncesUsers();
    } catch (error) {
      console.error("Erreur lors de l'activation :", error);
      toast.error("Une erreur s'est produite, veuillez réessayer.");
    } finally {
      setIsActivationAlertOpen(false);
    }
  };

  const columns = [
    { accessorKey: "titre", header: "Titre" },
    { accessorKey: "categorieAnnonce", header: "Catégorie" },
    { accessorKey: "adresse", header: "Adresse " },
    {
      header: "Date de publication",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const createdAt = new Date(row.original.createdAt);

        return createdAt.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      header: "Utilisateur",
      cell: ({ row }) => {
        const utilisateur = row.original.user;
        return utilisateur
          ? `${utilisateur.nom} ${utilisateur.prenom}`
          : "Inconnu";
      },
    },
    {
      header: "Notes",
      cell: ({ row }) => {
        const averageNote = row.original.averageNote;

        if (typeof averageNote === "number" && !isNaN(averageNote)) {
          return averageNote.toFixed(2);
        } else {
          return "Aucune note";
        }
      },
    },

    {
      accessorKey: "statut",
      header: "Statut",
      cell: ({ row }) => {
        const statut = row.original.statut;

        const statusText = {
          PUBLIEE: "publiée",
          DESACTIVEE: "suspendue",
          EN_ATTENTE_DE_VALIDATION: "en attente",
        };

        const statusColor = {
          PUBLIEE: "bg-primary text-white hover:bg-primary hover:text-white",
          DESACTIVEE:
            "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800",
          EN_ATTENTE_DE_VALIDATION:
            "bg-orange-100 text-orange-500 hover:bg-orange-100 hover:text-orange-500",
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
                    onClick={() => handleSeeAnnonceInfo(row.original.id)}
                  >
                    Voir les détails
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (row.original.statut === "PUBLIEE") {
                        openSuspendAlert(row.original);
                      } else if (
                        row.original.statut === "EN_ATTENTE_DE_VALIDATION"
                      ) {
                        openActivationAlert(row.original);
                      } else if (row.original.statut === "DESACTIVEE") {
                        openActivationAlert(row.original);
                      }
                    }}
                  >
                    {row.original.statut === "PUBLIEE"
                      ? "Suspendre l'annonce"
                      : row.original.statut === "EN_ATTENTE_DE_VALIDATION"
                      ? "Valider l'annonce"
                      : row.original.statut === "DESACTIVEE"
                      ? "Activer l'annonce"
                      : ""}
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

          <div className="flex flex-wrap items-center gap-4 w-full md:w-2/3">
            <Select
              value={categoryFilter}
              onValueChange={(value) => setCategoryFilter(value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-primary/20  transition-colors bg-white"
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner la catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="immobilier">Immobilier</SelectItem>
                  <SelectItem value="vetement">Vêtement</SelectItem>
                  <SelectItem value="mobilier">Mobilier</SelectItem>
                  <SelectItem value="loisir">Loisir</SelectItem>
                  <SelectItem value="don">Dons</SelectItem>
                  <SelectItem value="emploi_service">Emploi_Service</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="publiee">Publiée</SelectItem>
                  <SelectItem value="suspendue">Suspendue</SelectItem>
                  <SelectItem value="attente">En attente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="relative">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="default"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-white"
                  )}
                >
                  <CalendarIcon />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "dd MMM yyyy", { locale: fr })} -{" "}
                        {format(date.to, "dd MMM yyyy", { locale: fr })}
                      </>
                    ) : (
                      format(date.from, "dd MMM yyyy", { locale: fr })
                    )
                  ) : (
                    <span>Sélectionner la date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
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

      <AlertDialog
        open={isSuspendAlertOpen}
        onOpenChange={setIsSuspendAlertOpen}
      >
        <AlertDialogContent className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <AlertDialogTitle className="flex flex-col items-center space-y-3 text-center text-2xl">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
            <span>Confirmation de suspension</span>
          </AlertDialogTitle>

          <div className="mt-4">
            <Label
              htmlFor="email"
              className="block text-[16px] font-medium mb-2"
            >
              Email de l&apos;annonceur concerné :
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Rechercher une annonce"
              value={email}
              className="w-full text-black text-[16px] font-bold"
              disabled
            />
          </div>

          <div className="mt-4">
            <Label
              htmlFor="raison"
              className="block text-[16px] font-medium mb-2"
            >
              Raison de la suspension :
            </Label>
            <Textarea
              id="raison"
              placeholder="Expliquez pourquoi cet utilisateur est suspendu..."
              value={raison}
              onChange={(e) => setRaison(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex flex-col items-center w-full space-y-3 mt-6">
            <AlertDialogAction
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 py-2 rounded-md"
              onClick={handleConfirmSuspendAnnonce}
            >
              Suspendre l&apos;annonce
            </AlertDialogAction>
            <AlertDialogCancel className="w-full text-center text-primary hover:underline">
              Annuler
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={isActivationAlertOpen}
        onOpenChange={setIsActivationAlertOpen}
      >
        <AlertDialogContent className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <AlertDialogTitle className="text-center text-lg sm:text-xl font-semibold">
            Êtes-vous sûr d&apos;activer cette annonce ?
          </AlertDialogTitle>

          <div className="mt-4 space-y-2 text-sm sm:text-base text-gray-700">
            <p>
              En activant cette annonce, vous allez permettre à tous les
              utilisateurs de la plate-forme de consulter cette annonce.
            </p>
          </div>

          <div className="flex w-full justify-end space-x-3 mt-6">
            <AlertDialogCancel className="px-4 py-2 w-full text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmActivationUser}
              className="px-4 py-2 bg-primary w-full text-white rounded-md hover:bg-primary/90"
            >
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
