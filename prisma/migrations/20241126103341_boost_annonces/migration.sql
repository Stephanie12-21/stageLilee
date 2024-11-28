/*
  Warnings:

  - You are about to drop the `boostAnnonce` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "typeBoost" AS ENUM ('URGENT', 'A_LA_UNE', 'RECOMMANDEE', 'NORMAL');

-- CreateEnum
CREATE TYPE "plan" AS ENUM ('URGENT', 'PREMIUM', 'MEDIUM', 'STANDARD');

-- CreateEnum
CREATE TYPE "periode" AS ENUM ('JOUR', 'SEMAINE', 'MOIS', 'NORMAL');

-- DropForeignKey
ALTER TABLE "boostAnnonce" DROP CONSTRAINT "boostAnnonce_annonceId_fkey";

-- DropTable
DROP TABLE "boostAnnonce";

-- DropEnum
DROP TYPE "statutBoost";

-- CreateTable
CREATE TABLE "boost" (
    "id" SERIAL NOT NULL,
    "typeBoost" "typeBoost" NOT NULL DEFAULT 'NORMAL',
    "plan" "plan" NOT NULL,
    "periode" "periode" NOT NULL DEFAULT 'NORMAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "debutDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finDate" TIMESTAMP(3) NOT NULL,
    "annonceId" INTEGER NOT NULL,

    CONSTRAINT "boost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "boost_annonceId_key" ON "boost"("annonceId");

-- AddForeignKey
ALTER TABLE "boost" ADD CONSTRAINT "boost_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "annonces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
