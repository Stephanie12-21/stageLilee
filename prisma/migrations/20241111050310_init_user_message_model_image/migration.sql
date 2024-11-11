-- AlterTable
ALTER TABLE "message" ALTER COLUMN "content" DROP NOT NULL;

-- CreateTable
CREATE TABLE "imageMessages" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "messageId" INTEGER NOT NULL,

    CONSTRAINT "imageMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "imageMessages" ADD CONSTRAINT "imageMessages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
