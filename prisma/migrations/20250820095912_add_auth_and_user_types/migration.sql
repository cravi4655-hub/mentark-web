/*
  Warnings:

  - The `status` column on the `Goal` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `goals` on the `ProfileSummary` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Goal` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userType` to the `Preference` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Preference` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `ProfileSummary` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `ProfileSummary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `ReminderPref` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('STUDENT', 'PROFESSIONAL', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."GoalCategory" AS ENUM ('ACADEMIC', 'CAREER', 'PERSONAL', 'HEALTH', 'FINANCIAL', 'SKILLS', 'RELATIONSHIPS', 'OTHER');

-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "public"."Urgency" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "public"."GoalStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'PAUSED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Goal" ADD COLUMN     "category" "public"."GoalCategory" NOT NULL DEFAULT 'PERSONAL',
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "progress" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "urgency" "public"."Urgency" NOT NULL DEFAULT 'LOW',
ALTER COLUMN "userId" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."GoalStatus" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "public"."Preference" ADD COLUMN     "userType" "public"."UserType" NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."ProfileSummary" DROP COLUMN "goals",
ADD COLUMN     "challenges" JSONB,
ADD COLUMN     "longGoals" JSONB,
ADD COLUMN     "shortGoals" JSONB,
ADD COLUMN     "similarIssues" JSONB,
ADD COLUMN     "solutions" JSONB,
ADD COLUMN     "strengths" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "urgentNeeds" JSONB,
ADD COLUMN     "weaknesses" JSONB,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."ReminderPref" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "description" TEXT,
ADD COLUMN     "priority" "public"."Priority" NOT NULL DEFAULT 'MEDIUM',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "name" TEXT,
    "avatar" TEXT,
    "userType" "public"."UserType" NOT NULL DEFAULT 'STUDENT',
    "university" TEXT,
    "department" TEXT,
    "year" TEXT,
    "profession" TEXT,
    "company" TEXT,
    "experience" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."ai_assistants" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personality" TEXT,
    "primaryModel" TEXT NOT NULL DEFAULT 'openai',
    "fallbackModel" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_assistants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Achievement" (
    "id" TEXT NOT NULL,
    "goalId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "points" INTEGER NOT NULL DEFAULT 0,
    "unlockedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Message" (
    "id" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "model" TEXT,
    "tokens" INTEGER,
    "cost" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "public"."users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "public"."accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "public"."sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "public"."verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "public"."verificationtokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "Message_assistantId_createdAt_idx" ON "public"."Message"("assistantId", "createdAt");

-- AddForeignKey
ALTER TABLE "public"."accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_assistants" ADD CONSTRAINT "ai_assistants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Preference" ADD CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProfileSummary" ADD CONSTRAINT "ProfileSummary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Achievement" ADD CONSTRAINT "Achievement_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "public"."Goal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Message" ADD CONSTRAINT "Message_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "public"."ai_assistants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
