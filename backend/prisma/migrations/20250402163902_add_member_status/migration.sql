-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('ONLINE', 'OFFLINE', 'AWAY', 'BUSY');

-- AlterTable
ALTER TABLE "group_members" ADD COLUMN     "status" "MemberStatus" NOT NULL DEFAULT 'ONLINE';
