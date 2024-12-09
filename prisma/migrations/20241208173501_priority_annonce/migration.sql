-- CreateEnum
CREATE TYPE "priority" AS ENUM ('URGENT', 'POPULAIRE', 'RECOMMANDATION');

-- AlterTable
ALTER TABLE "annonces" ADD COLUMN     "priority" "priority";
