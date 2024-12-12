/*
  Warnings:

  - You are about to drop the column `plan` on the `Abonnement` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Abonnement` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "typePlan" AS ENUM ('STANDARD', 'PREMIUM', 'MEDIUM');

-- AlterTable
ALTER TABLE "Abonnement" DROP COLUMN "plan",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "plan";

-- CreateTable
CREATE TABLE "plan" (
    "id" SERIAL NOT NULL,
    "typePlan" "typePlan" NOT NULL,
    "nbUrgent" INTEGER,
    "nbUne" INTEGER NOT NULL,
    "nbRecommandation" INTEGER NOT NULL,
    "abonnementId" INTEGER NOT NULL,

    CONSTRAINT "plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Abonnement" ADD CONSTRAINT "Abonnement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan" ADD CONSTRAINT "plan_abonnementId_fkey" FOREIGN KEY ("abonnementId") REFERENCES "Abonnement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
