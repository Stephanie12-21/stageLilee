-- CreateEnum
CREATE TYPE "plan" AS ENUM ('PREMIUM', 'MEDIUM', 'STANDARD');

-- CreateTable
CREATE TABLE "Abonnement" (
    "id" SERIAL NOT NULL,
    "plan" "plan" NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Abonnement_pkey" PRIMARY KEY ("id")
);
