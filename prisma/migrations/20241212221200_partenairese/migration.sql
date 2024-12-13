/*
  Warnings:

  - Added the required column `adresse` to the `partenaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "partenaire" ADD COLUMN     "adresse" TEXT NOT NULL;
