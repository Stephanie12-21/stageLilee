-- CreateEnum
CREATE TYPE "typeTarif" AS ENUM ('JOURNALIER', 'NUITEE', 'FIXE');

-- AlterTable
ALTER TABLE "annonces" ADD COLUMN     "typeTarif" "typeTarif";
