/*
  Warnings:

  - The values [quote,photo,video,text,link] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.
  - The values [draft,published] on the enum `StatusType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('VIDEO', 'TEXT', 'QUOTE', 'PHOTO', 'LINK');
ALTER TABLE "posts" ALTER COLUMN "type" TYPE "PostType_new" USING ("type"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "StatusType_new" AS ENUM ('DRAFT', 'PUBLISHED');
ALTER TABLE "posts" ALTER COLUMN "status" TYPE "StatusType_new" USING ("status"::text::"StatusType_new");
ALTER TYPE "StatusType" RENAME TO "StatusType_old";
ALTER TYPE "StatusType_new" RENAME TO "StatusType";
DROP TYPE "StatusType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_post_id_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "tags";
