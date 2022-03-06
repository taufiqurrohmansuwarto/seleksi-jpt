/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `admin` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `korektor` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_korektor_fkey";

-- AlterTable
ALTER TABLE "admin" DROP CONSTRAINT "admin_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "korektor",
ADD COLUMN     "korektor" INTEGER;

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_korektor_fkey" FOREIGN KEY ("korektor") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
