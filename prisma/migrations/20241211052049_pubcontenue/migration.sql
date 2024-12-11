/*
  Warnings:

  - Changed the type of `dureePub` on the `publicite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "publicite" DROP COLUMN "dureePub",
ADD COLUMN     "dureePub" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "contenuPub" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "publiciteId" INTEGER NOT NULL,

    CONSTRAINT "contenuPub_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "contenuPub" ADD CONSTRAINT "contenuPub_publiciteId_fkey" FOREIGN KEY ("publiciteId") REFERENCES "publicite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
