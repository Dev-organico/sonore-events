/*
  Warnings:

  - You are about to drop the `_EquipmentToBudgets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment` to the `Budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Budgets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_EquipmentToBudgets" DROP CONSTRAINT "_EquipmentToBudgets_A_fkey";

-- DropForeignKey
ALTER TABLE "_EquipmentToBudgets" DROP CONSTRAINT "_EquipmentToBudgets_B_fkey";

-- AlterTable
ALTER TABLE "Budgets" ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "_EquipmentToBudgets";

-- CreateTable
CREATE TABLE "EquipmentsToBudgets" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "budgetsId" INTEGER NOT NULL,
    "rentQuantity" INTEGER NOT NULL,

    CONSTRAINT "EquipmentsToBudgets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EquipmentsToBudgets" ADD CONSTRAINT "EquipmentsToBudgets_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsToBudgets" ADD CONSTRAINT "EquipmentsToBudgets_budgetsId_fkey" FOREIGN KEY ("budgetsId") REFERENCES "Budgets"("id") ON DELETE CASCADE ON UPDATE CASCADE;
