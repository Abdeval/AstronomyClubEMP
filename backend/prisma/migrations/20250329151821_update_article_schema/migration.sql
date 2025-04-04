/*
  Warnings:

  - Added the required column `category` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('SOLAR_SYSTEM', 'GALAXIES', 'STARS', 'EXOPLANETS', 'BLACK_HOLES', 'COSMOLOGY', 'ASTROBIOLOGY', 'TELESCOPES', 'SPACE_MISSIONS');

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "category" "Category" NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "tags" JSONB NOT NULL;
