-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "goal" TEXT NOT NULL,
    "sector" TEXT,
    "audience" TEXT,
    "experience" TEXT,
    "platforms" JSONB,
    "tone" TEXT,
    "keywords" TEXT,
    "existingContent" TEXT,
    "region" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Campaign" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "goalAmount" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Campaign" ("createdAt", "currency", "goalAmount", "id", "isApproved", "slug", "story", "title") SELECT "createdAt", "currency", "goalAmount", "id", "isApproved", "slug", "story", "title" FROM "Campaign";
DROP TABLE "Campaign";
ALTER TABLE "new_Campaign" RENAME TO "Campaign";
CREATE UNIQUE INDEX "Campaign_slug_key" ON "Campaign"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
