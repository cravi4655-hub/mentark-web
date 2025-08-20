-- CreateTable
CREATE TABLE "public"."Campaign" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "goalAmount" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Preference" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProfileSummary" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "preferenceId" TEXT NOT NULL,
    "goals" JSONB,
    "persona" TEXT,
    "cadence" TEXT,
    "focusAreas" JSONB,
    "plan" JSONB,
    "tags" JSONB,
    "vector" BYTEA,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfileSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "profileId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "targetDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Task" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dayIndex" INTEGER NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "done" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sortIndex" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ReminderPref" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "profileId" TEXT,
    "cadence" TEXT NOT NULL DEFAULT 'weekly',
    "hour" INTEGER NOT NULL DEFAULT 19,
    "timezone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReminderPref_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Campaign_slug_key" ON "public"."Campaign"("slug");

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "public"."Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
