/*
  Warnings:

  - You are about to drop the `souscriptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "souscriptions";

-- CreateTable
CREATE TABLE "souscription" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "statusSouscription" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "annonceId" INTEGER NOT NULL,

    CONSTRAINT "souscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "souscription_annonceId_key" ON "souscription"("annonceId");

-- AddForeignKey
ALTER TABLE "souscription" ADD CONSTRAINT "souscription_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "annonces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
