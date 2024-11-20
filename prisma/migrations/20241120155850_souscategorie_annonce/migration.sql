/*
  Warnings:

  - Made the column `sousCategorie` on table `annonces` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "annonces" ALTER COLUMN "sousCategorie" SET NOT NULL;
