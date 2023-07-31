/*
  Warnings:

  - You are about to drop the column `Day` on the `restrictions` table. All the data in the column will be lost.
  - You are about to drop the column `Period` on the `restrictions` table. All the data in the column will be lost.
  - Added the required column `day` to the `restrictions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period` to the `restrictions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restrictions" DROP COLUMN "Day",
DROP COLUMN "Period",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "period" TEXT NOT NULL;
