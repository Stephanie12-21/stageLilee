-- CreateTable
CREATE TABLE "temoignages" (
    "id" SERIAL NOT NULL,
    "temoignage" TEXT NOT NULL,
    "noteLilee" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "temoignages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "temoignages" ADD CONSTRAINT "temoignages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
