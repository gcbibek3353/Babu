/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" TEXT NOT NULL DEFAULT '1',
ADD COLUMN     "time" INTEGER NOT NULL DEFAULT 8;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_productId_key" ON "Cart"("userId", "productId");
