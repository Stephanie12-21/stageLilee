/*
  Warnings:

  - You are about to drop the `souscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "statutBoost" AS ENUM ('ACTIVE', 'DESACTIVE');

-- DropForeignKey
ALTER TABLE "souscription" DROP CONSTRAINT "souscription_annonceId_fkey";

-- DropTable
DROP TABLE "souscription";

-- DropEnum
DROP TYPE "statusSouscription";

-- CreateTable
CREATE TABLE "boostAnnonce" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "statutBoost" "statutBoost" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "annonceId" INTEGER NOT NULL,

    CONSTRAINT "boostAnnonce_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boostAnnonce_annonceId_key" ON "boostAnnonce"("annonceId");

-- AddForeignKey
ALTER TABLE "boostAnnonce" ADD CONSTRAINT "boostAnnonce_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "annonces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
