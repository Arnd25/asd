/*
  Warnings:

  - The `status` column on the `OrderDishes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DishStatus" AS ENUM ('Pending', 'Prepare', 'Completed');

-- AlterTable
ALTER TABLE "OrderDishes" DROP COLUMN "status",
ADD COLUMN     "status" "DishStatus" NOT NULL DEFAULT 'Pending',
ALTER COLUMN "readyAt" DROP NOT NULL;
