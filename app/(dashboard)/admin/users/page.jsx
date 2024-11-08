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
  DropdownMenuLabel,
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
import UserInfoModal from "./userInfo/page";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fonction pour récupérer les utilisateurs depuis l'API
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/getAll"); // Remplacez par votre endpoint réel
        const data = await response.json();
        setUsers(data.users);

        console.log("données reçues :", data);
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

  const handleSeeUserInfo = () => {
    router.push("/admin/users/userInfo");
  };
  const handleCancelSeeUserInfo = () => {
    setOpenUserInfoModal(false);
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
    { accessorKey: "statutUser", header: "Statut" },
    {
      header: "Actions",
      cell: () => (
        <div className="flex justify-left ">
          <DropdownMenu>
            <div className="flex rounded-full p-2">
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-fit h-fit p-0 ">
                  <FaEllipsisH className="cursor-pointer " size={24} />
                </Button>
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent
              align="end"
              className="w-fit p-2 mt-2 space-y-3"
            >
              <DropdownMenuItem>
                <Button onClick={handleSeeUserInfo}>
                  Voir le profil de l&apos;utilisateur
                </Button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Avertir l&apos;utilisateur</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Suspendre le compte</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
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
      <Input
        placeholder="Filter emails..."
        value={table.getColumn("email")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
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
    </div>
  );
};

export default UserPage;
