/*
  Warnings:

  - You are about to drop the column `statut` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "statut",
ADD COLUMN     "statutUser" "statutUser" DEFAULT 'ACTIF';
