-- CreateEnum
CREATE TYPE "statusSouscription" AS ENUM ('ACTIVE', 'DESACTIVE');

-- CreateTable
CREATE TABLE "souscriptions" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prix" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "dateDebut" TIMESTAMP(3),
    "dateFin" TIMESTAMP(3),
    "statutSouscription" "statusSouscription" NOT NULL,

    CONSTRAINT "souscriptions_pkey" PRIMARY KEY ("id")
);
