import NextAuth from "next-auth";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("Tentative de connexion avec:", credentials);
        if (!credentials?.email || !credentials.password) {
          console.log("Credentials manquants");
          return null;
        }

        const existingComptePerso = await db.user.findUnique({
          where: { email: credentials.email },
          include: { profileImages: true },
        });

        if (!existingComptePerso) {
          console.log("Utilisateur non trouvé");
          return null;
        }

        // Authentification et récupération des informations utilisateur
        const passwordMatch = await compare(
          credentials.password,
          existingComptePerso.hashPassword
        );
        if (!passwordMatch) {
          console.log("Mot de passe incorrect");
          return null;
        }

        console.log(
          "Authentification réussie pour :",
          existingComptePerso.email
        );

        // Récupérer l'URL de la première image de profil
        const imageUrl =
          existingComptePerso.profileImages.length > 0
            ? existingComptePerso.profileImages[0].path
            : null;
        console.log("Utilisateur autorisé :", {
          id: existingComptePerso.id,
          nom: existingComptePerso.nom,
          prenom: existingComptePerso.prenom,
          email: existingComptePerso.email,
          dateCreation: existingComptePerso.createdAt,
          role: existingComptePerso.role,
          statutUser: existingComptePerso.statutUser,
          image: imageUrl,
        });
        return {
          id: `${existingComptePerso.id}`,
          nom: existingComptePerso.nom,
          prenom: existingComptePerso.prenom,
          email: existingComptePerso.email,
          role: existingComptePerso.role,
          statutUser: existingComptePerso.statutUser,
          image: imageUrl,
        };
      },
    }),
  ],

  events: {
    createUser: async (message) => {
      // Ajout de `async` pour permettre l'utilisation d'`await`
      const userId = message.user.id;
      const userEmail = message.user.email;

      if (!userId || !userEmail) {
        return; // Arrête la fonction si `userId` n'est pas défini
      }

      try {
        // Crée un client Stripe
        const stripeCustomer = await stripe.customers.create({
          email: userEmail, // Utilisation de `userEmail`
        });

        // Log ou effectuez une action avec le client Stripe créé
        console.log("Stripe Customer Created:", stripeCustomer);
      } catch (error) {
        console.error("Error creating Stripe customer:", error);
      }
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Mise à jour des informations dans le token
        token.id = user.id || null;
        token.nom = user.nom || null;
        token.prenom = user.prenom || null; // Ajout du prénom
        token.email = user.email || null;
        token.picture = user.image || null;
        token.role = user.role || null;
        token.statutUser = user.statutUser || null;
        token.name = user.nom || null;
      } else {
        // Lorsqu'il n'y a pas d'utilisateur, mais que le token contient des informations
        token.user = {
          id: token.id || null,
          nom: token.nom || null,
          email: token.email || null,
          picture: token.picture || null,
          role: token.role || null,
          name: token.nom || null,
          statutUser: token.statutUser || null,
          prenom: token.prenom || null,
        };
      }

      //console.log("JWT data:", { token });
      return token;
    },

    async session({ session, token }) {
      // Ajout des données utilisateur dans la session
      session.user = {
        ...session.user,
        id: token.id || null,
        nom: token.nom || null,
        prenom: token.prenom || null, // Le prénom est ici
        name: token.nom || null,
        email: token.email || null,
        image: token.picture || null,
        statutUser: token.statutUser || null,
        role: token.role || null,
      };

      // console.log(" session data:", { session });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
