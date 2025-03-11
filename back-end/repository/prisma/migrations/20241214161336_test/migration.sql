/*
  Warnings:

  - You are about to drop the column `postId` on the `Image` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Image_postId_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "postId";
