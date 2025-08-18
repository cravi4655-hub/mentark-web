/*
  Warnings:

  - You are about to alter the column `focusAreas` on the `ProfileSummary` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `goals` on the `ProfileSummary` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `plan` on the `ProfileSummary` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `tags` on the `ProfileSummary` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProfileSummary" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "preferenceId" TEXT NOT NULL,
    "goals" JSONB,
    "persona" TEXT,
    "cadence" TEXT,
    "focusAreas" JSONB,
    "plan" JSONB,
    "tags" JSONB,
    "vector" BLOB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ProfileSummary" ("cadence", "createdAt", "focusAreas", "goals", "id", "persona", "plan", "preferenceId", "tags", "userId", "vector") SELECT "cadence", "createdAt", "focusAreas", "goals", "id", "persona", "plan", "preferenceId", "tags", "userId", "vector" FROM "ProfileSummary";
DROP TABLE "ProfileSummary";
ALTER TABLE "new_ProfileSummary" RENAME TO "ProfileSummary";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
