/*
  Warnings:

  - You are about to drop the column `abonnementId` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `dureePub` on the `publicite` table. All the data in the column will be lost.
  - Added the required column `planId` to the `Abonnement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "plan" DROP CONSTRAINT "plan_abonnementId_fkey";

-- AlterTable
ALTER TABLE "Abonnement" ADD COLUMN     "planId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "plan" DROP COLUMN "abonnementId";

-- AlterTable
ALTER TABLE "publicite" DROP COLUMN "dureePub";

-- AddForeignKey
ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
