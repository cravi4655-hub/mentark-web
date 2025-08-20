// types/mentark.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export type Plan = {
  weekly?: string[];
  daily?: string[];
  [k: string]: Json;
};

export type ProfileSummaryDTO = {
  id: string;
  preferenceId: string;
  persona: string | null;
  cadence: string | null;
  focusAreas: Json | null;
  goals: Json | null;
  plan: Plan | Json | null;
  tags: Json | null;
};

export type TaskDTO = {
  id: string;
  title: string;
  done: boolean;
  dueDate: string | null;
};

export type GoalDTO = {
  id: string;
  title: string;
  targetDate: string | null;
  tasks: TaskDTO[];
};
