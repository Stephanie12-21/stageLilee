import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis;

// Créer une instance de PrismaClient si elle n'existe pas déjà
const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Si l'environnement n'est pas en production, assigner l'instance à globalForPrisma
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export const db = prisma;
