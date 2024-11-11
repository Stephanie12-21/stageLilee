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
