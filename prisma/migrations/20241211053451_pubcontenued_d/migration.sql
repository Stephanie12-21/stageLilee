/*
  Warnings:

  - The values [ACTIF,SUSPENDU] on the enum `statutPub` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "statutPub_new" AS ENUM ('ACTIVE', 'SUSPENDUE');
ALTER TABLE "publicite" ALTER COLUMN "statutPub" DROP DEFAULT;
ALTER TABLE "publicite" ALTER COLUMN "statutPub" TYPE "statutPub_new" USING ("statutPub"::text::"statutPub_new");
ALTER TYPE "statutPub" RENAME TO "statutPub_old";
ALTER TYPE "statutPub_new" RENAME TO "statutPub";
DROP TYPE "statutPub_old";
ALTER TABLE "publicite" ALTER COLUMN "statutPub" SET DEFAULT 'ACTIVE';
COMMIT;

-- AlterTable
ALTER TABLE "publicite" ALTER COLUMN "statutPub" SET DEFAULT 'ACTIVE';
