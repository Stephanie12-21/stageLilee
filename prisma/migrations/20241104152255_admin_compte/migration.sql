/*
  Warnings:

  - You are about to drop the `photoAdmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `superadmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "photoAdmin" DROP CONSTRAINT "photoAdmin_superadminId_fkey";

-- DropTable
DROP TABLE "photoAdmin";

-- DropTable
DROP TABLE "superadmin";
