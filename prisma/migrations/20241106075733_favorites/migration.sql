-- CreateTable
CREATE TABLE "favoris" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "annonceId" INTEGER NOT NULL,

    CONSTRAINT "favoris_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favoris" ADD CONSTRAINT "favoris_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favoris" ADD CONSTRAINT "favoris_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "annonces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
