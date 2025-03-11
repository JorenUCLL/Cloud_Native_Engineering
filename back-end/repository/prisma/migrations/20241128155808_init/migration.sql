-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "numPosts" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimbingGym" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "gymName" TEXT NOT NULL,

    CONSTRAINT "ClimbingGym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BoulderProblem" (
    "id" SERIAL NOT NULL,
    "grade" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,
    "climbingGymId" INTEGER NOT NULL,

    CONSTRAINT "BoulderProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoulderProblem_postId_key" ON "BoulderProblem"("postId");

-- AddForeignKey
ALTER TABLE "BoulderProblem" ADD CONSTRAINT "BoulderProblem_climbingGymId_fkey" FOREIGN KEY ("climbingGymId") REFERENCES "ClimbingGym"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BoulderProblem" ADD CONSTRAINT "BoulderProblem_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
