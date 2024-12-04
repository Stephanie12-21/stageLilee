/*
  Warnings:

  - The values [JOUR] on the enum `periode` will be removed. If these variants are still used in the database, this will fail.
  - The values [URGENT,PREMIUM,MEDIUM,STANDARD] on the enum `plan` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `typeBoost` on the `boost` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "periode_new" AS ENUM ('SEMAINE', 'MOIS', 'NORMAL');
ALTER TABLE "boost" ALTER COLUMN "periode" DROP DEFAULT;
ALTER TABLE "boost" ALTER COLUMN "periode" TYPE "periode_new" USING ("periode"::text::"periode_new");
ALTER TYPE "periode" RENAME TO "periode_old";
ALTER TYPE "periode_new" RENAME TO "periode";
DROP TYPE "periode_old";
ALTER TABLE "boost" ALTER COLUMN "periode" SET DEFAULT 'NORMAL';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "plan_new" AS ENUM ('NORMAL');
ALTER TABLE "boost" ALTER COLUMN "plan" TYPE "plan_new" USING ("plan"::text::"plan_new");
ALTER TYPE "plan" RENAME TO "plan_old";
ALTER TYPE "plan_new" RENAME TO "plan";
DROP TYPE "plan_old";
COMMIT;

-- AlterTable
ALTER TABLE "boost" DROP COLUMN "typeBoost";

-- DropEnum
DROP TYPE "typeBoost";

-- AlterEnum
ALTER TYPE "statut" ADD VALUE 'EN_ATTENTE_DE_VALIDATION';
