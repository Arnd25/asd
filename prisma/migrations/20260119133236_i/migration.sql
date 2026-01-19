/*
  Warnings:

  - The values [Peding,ready,in_delivery,completed] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('Pending', 'Prepare', 'Ready', 'InDelivery', 'Completed');
ALTER TABLE "public"."OrderDishes" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "OrderDishes" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "OrderDishes" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "OrderDishes" ALTER COLUMN "status" SET DEFAULT 'Pending';
