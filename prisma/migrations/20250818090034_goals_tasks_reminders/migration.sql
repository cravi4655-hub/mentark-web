-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "profileId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active'
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "goalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL DEFAULT 0,
    "dueDate" DATETIME,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortIndex" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goal" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReminderPref" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "profileId" TEXT,
    "cadence" TEXT NOT NULL DEFAULT 'weekly',
    "hour" INTEGER NOT NULL DEFAULT 19,
    "timezone" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
