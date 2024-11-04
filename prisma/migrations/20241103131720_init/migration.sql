-- CreateEnum
CREATE TYPE "secteurActivite" AS ENUM ('IMMOBILIER', 'VETEMENT', 'EMPLOI', 'SERVICE', 'VOITURE', 'LOISIR', 'MATERIEL', 'MOBILIER');

-- CreateEnum
CREATE TYPE "role" AS ENUM ('PERSO', 'PRO');

-- CreateEnum
CREATE TYPE "typeSociete" AS ENUM ('ENTREPRISE_INDIVIDUELLE', 'SOCIETE_PRIVEE', 'SOCIETE_PUBLIQUE', 'COOPERATIVE', 'ASSOCIATION');

-- CreateEnum
CREATE TYPE "statut" AS ENUM ('PUBLIEE', 'DESACTIVEE');

-- CreateEnum
CREATE TYPE "categorieAnnonce" AS ENUM ('IMMOBILIER', 'VETEMENT', 'EMPLOI', 'SERVICE', 'VOITURE', 'LOISIR', 'MATERIEL', 'MOBILIER', 'DONS');

-- CreateTable
CREATE TABLE "article" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "categorieArticle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "articleId" INTEGER NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "role" "role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "siret" TEXT NOT NULL,
    "nomSociete" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "secteurActivite" "secteurActivite" NOT NULL,
    "typeSociete" "typeSociete" NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profileImage" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "profileImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "superadmin" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "superadmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photoAdmin" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "superadminId" INTEGER NOT NULL,

    CONSTRAINT "photoAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "annonces" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "localisation" TEXT,
    "adresse" TEXT NOT NULL,
    "statut" "statut" DEFAULT 'PUBLIEE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categorieAnnonce" "categorieAnnonce" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "annonces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imageAnnonce" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "annoncesId" INTEGER NOT NULL,

    CONSTRAINT "imageAnnonce_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commentaire" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "commentaire" TEXT NOT NULL,
    "note" INTEGER,
    "annoncesId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "commentaire_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "company_siret_key" ON "company"("siret");

-- CreateIndex
CREATE UNIQUE INDEX "company_nomSociete_key" ON "company"("nomSociete");

-- CreateIndex
CREATE UNIQUE INDEX "superadmin_phone_key" ON "superadmin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "superadmin_email_key" ON "superadmin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "annonces_titre_key" ON "annonces"("titre");

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profileImage" ADD CONSTRAINT "profileImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photoAdmin" ADD CONSTRAINT "photoAdmin_superadminId_fkey" FOREIGN KEY ("superadminId") REFERENCES "superadmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "annonces" ADD CONSTRAINT "annonces_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imageAnnonce" ADD CONSTRAINT "imageAnnonce_annoncesId_fkey" FOREIGN KEY ("annoncesId") REFERENCES "annonces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_annoncesId_fkey" FOREIGN KEY ("annoncesId") REFERENCES "annonces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commentaire" ADD CONSTRAINT "commentaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
