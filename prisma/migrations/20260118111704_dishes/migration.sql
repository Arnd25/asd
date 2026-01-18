-- CreateTable
CREATE TABLE "Dishes" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Dishes_pkey" PRIMARY KEY ("id")
);
