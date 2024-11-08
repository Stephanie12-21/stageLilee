// import { Button } from "@/components/ui/button";
// import React from "react";

// const page = () => {
//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//       <div className="flex items-center">
//         <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
//       </div>
//       <div
//         className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
//         x-chunk="dashboard-02-chunk-1"
//       >
//         <div className="flex flex-col items-center gap-1 text-center">
//           <h3 className="text-2xl font-bold tracking-tight">
//             You have no products
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             You can start selling as soon as you add a product.
//           </p>
//           <Button className="mt-4">Add Product</Button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default page;

import { Logout } from "@/app/(dialog)/Logout/page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      {session?.user ? (
        <div>
          <div className="flex items-center">
            {session.user.image ? (
              <Image
                src={session.user.image}
                height={200}
                width={200}
                alt={`${session.user.nom} ${session.user.prenom}`}
                className="w-16 h-16 rounded-full mr-4"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full mr-4" />
            )}
            <span className="font-bold text-xl">
              Bienvenue à toi -{" "}
              <span className="text-orange-500 font-bold text-xl">
                {session.user.nom}
              </span>
            </span>
          </div>
          <div>
            Vous avez le rôle
            <span className="text-orange-500 font-bold text-xl">
              {session.user.role}
            </span>
          </div>
          <div className="flex justify-center items-center space-x-10">
            <Logout />
            <Link href="/Annonce">Liste des annonces</Link>
            {session.user.role !== "USER" && (
              <Link href="/blog">Liste des articles</Link>
            )}
            <Link href={`/user//${session.user.id}`}>Voir le profil</Link>
            <Link href={`/user//${session.user.id}`}>
              Modifier le mot de passe
            </Link>
            <Link href="/formContact">Contacter Lilee</Link>
          </div>
        </div>
      ) : (
        <div>
          <h2>
            Veuillez vous connecter à votre compte
            <span>
              <Link href="/login">Se connecter</Link>
            </span>
          </h2>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
