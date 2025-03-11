/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "postId" INTEGER;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "imageId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Image_postId_key" ON "Image"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_imageId_key" ON "Post"("imageId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;
