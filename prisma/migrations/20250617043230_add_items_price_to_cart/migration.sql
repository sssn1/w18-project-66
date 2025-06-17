/*
  Warnings:

  - Added the required column `items` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemsPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropIndex
DROP INDEX "Cart_sessionCartId_key";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "items" JSONB NOT NULL,
ADD COLUMN     "itemsPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "shippingPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "taxPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalPrice" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "sessionCartId" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
