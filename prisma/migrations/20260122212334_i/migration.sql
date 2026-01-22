/*
  Warnings:

  - You are about to drop the column `deletedAT` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deletedAT",
ADD COLUMN     "deletedAt" TIMESTAMP(3);
