/*
  Warnings:

  - You are about to drop the column `surat_pernyataan_tidak_dijathui_hukdis_is_verified` on the `documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "surat_pernyataan_tidak_dijathui_hukdis_is_verified",
ADD COLUMN     "surat_pernyataan_tidak_dijatuhi_hukdis_is_verified" BOOLEAN DEFAULT false;
