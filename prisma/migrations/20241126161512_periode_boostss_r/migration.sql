/*
  Warnings:

  - The values [STANDARD] on the enum `periode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "periode_new" AS ENUM ('SEMAINE', 'MOIS');
ALTER TABLE "boost" ALTER COLUMN "periode" TYPE "periode_new" USING ("periode"::text::"periode_new");
ALTER TYPE "periode" RENAME TO "periode_old";
ALTER TYPE "periode_new" RENAME TO "periode";
DROP TYPE "periode_old";
COMMIT;

-- AlterTable
ALTER TABLE "annonces" ADD COLUMN     "customerId" TEXT,
ADD COLUMN     "plan" "plan";
