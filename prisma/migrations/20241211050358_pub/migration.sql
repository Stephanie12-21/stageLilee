-- CreateTable
CREATE TABLE "publicite" (
    "id" SERIAL NOT NULL,
    "nomMarque" TEXT NOT NULL,
    "emailMarque" TEXT NOT NULL,
    "phoneMarque" TEXT NOT NULL,
    "adresseMarque" TEXT NOT NULL,
    "siteWeb" TEXT,

    CONSTRAINT "publicite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "publicite_nomMarque_key" ON "publicite"("nomMarque");

-- CreateIndex
CREATE UNIQUE INDEX "publicite_emailMarque_key" ON "publicite"("emailMarque");

-- CreateIndex
CREATE UNIQUE INDEX "publicite_phoneMarque_key" ON "publicite"("phoneMarque");
