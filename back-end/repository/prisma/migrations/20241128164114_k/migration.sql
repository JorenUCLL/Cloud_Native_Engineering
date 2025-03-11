/*
  Warnings:

  - You are about to drop the column `postId` on the `BoulderProblem` table. All the data in the column will be lost.
  - Added the required column `boulderId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BoulderProblem" DROP CONSTRAINT "BoulderProblem_postId_fkey";

-- DropIndex
DROP INDEX "BoulderProblem_postId_key";

-- AlterTable
ALTER TABLE "BoulderProblem" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "boulderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_boulderId_fkey" FOREIGN KEY ("boulderId") REFERENCES "BoulderProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
