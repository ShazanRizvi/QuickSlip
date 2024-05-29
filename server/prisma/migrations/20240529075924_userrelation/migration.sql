/*
  Warnings:

  - Changed the type of `user_id` on the `invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "invoice" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
