/*
  Warnings:

  - Added the required column `annonceId` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" ADD COLUMN     "annonceId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "annonces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
