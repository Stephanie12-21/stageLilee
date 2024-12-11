-- CreateEnum
CREATE TYPE "statutPub" AS ENUM ('ACTIF', 'SUSPENDU');

-- AlterTable
ALTER TABLE "publicite" ADD COLUMN     "statutPub" "statutPub" NOT NULL DEFAULT 'ACTIF';
