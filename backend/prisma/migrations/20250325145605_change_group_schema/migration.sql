/*
  Warnings:

  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GroupStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'PENDING');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ECLIPSE', 'MOON', 'METEOR_SHOWER', 'PLANETARY', 'COMET', 'STAR', 'SOLSTICE', 'EQUINOX', 'AURORA', 'OCCULTATION', 'CONJUNCTION', 'TRANSIT', 'BLUE_MOON', 'BLOOD_MOON', 'HARVEST_MOON', 'SUPERMOON', 'MICROMOON', 'MEETING', 'WORKSHOP');

-- DropIndex
DROP INDEX "users_username_key";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "requirements" TEXT,
ADD COLUMN     "type" "EventType" NOT NULL DEFAULT 'MEETING';

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status" "GroupStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
