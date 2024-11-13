-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_annonceId_fkey";

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_annonceId_fkey" FOREIGN KEY ("annonceId") REFERENCES "annonces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
