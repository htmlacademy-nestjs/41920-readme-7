/*
  Warnings:

  - You are about to drop the column `title` on the `tags` table. All the data in the column will be lost.
  - Changed the type of `type` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `posts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `user_id` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('quote', 'photo', 'video', 'text', 'link');

-- DropIndex
DROP INDEX "likes_post_id_idx";

-- DropIndex
DROP INDEX "posts_title_idx";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "type",
ADD COLUMN     "type" "PostType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusType" NOT NULL;

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "title",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
