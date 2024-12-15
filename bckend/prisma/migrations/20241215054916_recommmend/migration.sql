-- AlterTable
ALTER TABLE "User" ADD COLUMN     "recommendedById" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_recommendedById_fkey" FOREIGN KEY ("recommendedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
