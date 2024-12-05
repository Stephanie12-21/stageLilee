/*
  Warnings:

  - The values [EMPLOI,SERVICE] on the enum `categorieAnnonce` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "categorieAnnonce_new" AS ENUM ('IMMOBILIER', 'VETEMENT', 'EMPLOI_SERVICE', 'VOITURE', 'LOISIR', 'MATERIEL', 'MOBILIER', 'DONS');
ALTER TABLE "annonces" ALTER COLUMN "categorieAnnonce" TYPE "categorieAnnonce_new" USING ("categorieAnnonce"::text::"categorieAnnonce_new");
ALTER TYPE "categorieAnnonce" RENAME TO "categorieAnnonce_old";
ALTER TYPE "categorieAnnonce_new" RENAME TO "categorieAnnonce";
DROP TYPE "categorieAnnonce_old";
COMMIT;
