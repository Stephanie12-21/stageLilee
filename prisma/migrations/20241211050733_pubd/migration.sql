/*
  Warnings:

  - Added the required column `debutPub` to the `publicite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dureePub` to the `publicite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finPub` to the `publicite` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `publicite` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "publicite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "debutPub" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dureePub" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finPub" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
