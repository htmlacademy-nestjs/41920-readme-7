/*
  Warnings:

  - You are about to drop the column `creator_user_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "creator_user_id",
ALTER COLUMN "is_reposted" SET DEFAULT false;
