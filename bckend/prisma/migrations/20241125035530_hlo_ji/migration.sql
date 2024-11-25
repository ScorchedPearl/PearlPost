/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Diary` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `date` on table `Diary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `public` on table `Diary` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_tagId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_tagId_fkey";

-- AlterTable
ALTER TABLE "Diary" DROP COLUMN "imageURL",
DROP COLUMN "published",
DROP COLUMN "tagId",
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "date" SET NOT NULL,
ALTER COLUMN "date" DROP DEFAULT,
ALTER COLUMN "public" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "tagId";

-- DropTable
DROP TABLE "Tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_DiaryTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_title_key" ON "Tag"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_PostTags_AB_unique" ON "_PostTags"("A", "B");

-- CreateIndex
CREATE INDEX "_PostTags_B_index" ON "_PostTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DiaryTags_AB_unique" ON "_DiaryTags"("A", "B");

-- CreateIndex
CREATE INDEX "_DiaryTags_B_index" ON "_DiaryTags"("B");

-- AddForeignKey
ALTER TABLE "_PostTags" ADD CONSTRAINT "_PostTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostTags" ADD CONSTRAINT "_PostTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryTags" ADD CONSTRAINT "_DiaryTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Diary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiaryTags" ADD CONSTRAINT "_DiaryTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
