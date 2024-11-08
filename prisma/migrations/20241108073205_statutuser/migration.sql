-- CreateEnum
CREATE TYPE "statutUser" AS ENUM ('ACTIF', 'NON_ACTIF');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "statut" "statutUser" DEFAULT 'ACTIF';
