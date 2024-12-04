/*
  Warnings:

  - You are about to drop the `boost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "boost" DROP CONSTRAINT "boost_annonceId_fkey";

-- AlterTable
ALTER TABLE "annonces" ADD COLUMN     "prix" DECIMAL(65,30),
ALTER COLUMN "statut" SET DEFAULT 'EN_ATTENTE_DE_VALIDATION';

-- DropTable
DROP TABLE "boost";

-- DropEnum
DROP TYPE "periode";

-- DropEnum
DROP TYPE "plan";
