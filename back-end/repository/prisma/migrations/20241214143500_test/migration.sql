-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
