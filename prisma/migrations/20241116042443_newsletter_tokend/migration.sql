/*
  Warnings:

  - You are about to drop the column `unsubscribeToken` on the `newsletter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "newsletter" DROP COLUMN "unsubscribeToken";
