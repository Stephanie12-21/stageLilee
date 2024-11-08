/*
  Warnings:

  - The values [NON_ACTIF] on the enum `statutUser` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "statutUser_new" AS ENUM ('ACTIF', 'SUSPENDU');
ALTER TABLE "user" ALTER COLUMN "statutUser" TYPE "statutUser_new" USING ("statutUser"::text::"statutUser_new");
ALTER TYPE "statutUser" RENAME TO "statutUser_old";
ALTER TYPE "statutUser_new" RENAME TO "statutUser";
DROP TYPE "statutUser_old";
COMMIT;
