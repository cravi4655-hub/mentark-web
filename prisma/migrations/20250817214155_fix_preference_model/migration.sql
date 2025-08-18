/*
  Warnings:

  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Preferences";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "answers" JSONB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
