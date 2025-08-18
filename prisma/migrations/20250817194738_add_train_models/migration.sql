/*
  Warnings:

  - You are about to drop the column `audience` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `consent` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `existingContent` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `platforms` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `sector` on the `Preference` table. All the data in the column will be lost.
  - You are about to drop the column `tone` on the `Preference` table. All the data in the column will be lost.
  - Added the required column `answers` to the `Preference` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ProfileSummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "preferenceId" TEXT NOT NULL,
    "goals" TEXT,
    "persona" TEXT,
    "cadence" TEXT,
    "focusAreas" TEXT,
    "plan" TEXT,
    "tags" TEXT,
    "vector" BLOB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Preference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "answers" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Preference" ("createdAt", "id", "userId") SELECT "createdAt", "id", "userId" FROM "Preference";
DROP TABLE "Preference";
ALTER TABLE "new_Preference" RENAME TO "Preference";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
