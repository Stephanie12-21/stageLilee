-- CreateEnum
CREATE TYPE "duree" AS ENUM ('MENSUEL', 'TRIMESTRIEL', 'SEMESTRIEL', 'ANNUEL');

-- CreateEnum
CREATE TYPE "statutPartenaire" AS ENUM ('ACTIF', 'SUSPENDU');

-- CreateTable
CREATE TABLE "partenaire" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "statutPartenaire" "statutPartenaire" NOT NULL DEFAULT 'ACTIF',
    "siteWeb" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "tikTok" TEXT,
    "duree" "duree" NOT NULL,
    "youtube" TEXT,
    "description" TEXT,

    CONSTRAINT "partenaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contenuPartenaire" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "partenaireId" INTEGER NOT NULL,

    CONSTRAINT "contenuPartenaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "logo" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "partenaireId" INTEGER NOT NULL,

    CONSTRAINT "logo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partenaire_nom_key" ON "partenaire"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "partenaire_email_key" ON "partenaire"("email");

-- CreateIndex
CREATE UNIQUE INDEX "partenaire_phone_key" ON "partenaire"("phone");

-- AddForeignKey
ALTER TABLE "contenuPartenaire" ADD CONSTRAINT "contenuPartenaire_partenaireId_fkey" FOREIGN KEY ("partenaireId") REFERENCES "partenaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logo" ADD CONSTRAINT "logo_partenaireId_fkey" FOREIGN KEY ("partenaireId") REFERENCES "partenaire"("id") ON DELETE CASCADE ON UPDATE CASCADE;
