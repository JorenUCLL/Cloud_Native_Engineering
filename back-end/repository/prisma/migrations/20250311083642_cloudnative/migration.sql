/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BoulderProblem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClimbingGym` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AchievementToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BoulderProblem" DROP CONSTRAINT "BoulderProblem_climbingGymId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_boulderId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AchievementToUser" DROP CONSTRAINT "_AchievementToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_AchievementToUser" DROP CONSTRAINT "_AchievementToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "BoulderProblem";

-- DropTable
DROP TABLE "ClimbingGym";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "_AchievementToUser";
