export type LocaleCode = "tr" | "en" | "ar" | "de" | "es" | "fr" | "ru" | "pt" | "hi";

export type EducationLevel = "none" | "middle" | "highschool" | "student" | "degree";
export type DeviceAccess = "phone" | "computer" | "both";
export type WorkMode = "any" | "remote" | "onsite" | "hybrid";
export type IncomeUrgency = "now" | "month" | "quarter";
export type PrepLevel = "low" | "medium" | "high";

export interface UserProfileInput {
  city: string;
  country?: string;
  locale: LocaleCode;
  educationLevel: EducationLevel;
  deviceAccess: DeviceAccess;
  dailyTimeBudget: "2" | "4" | "6";
  workMode: WorkMode;
  incomeUrgency: IncomeUrgency;
  languages: string[];
  skills: string[];
  constraints?: string;
}

export interface CareerRoute {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  baseScore: number;
  incomeWindowMinDays: number;
  incomeWindowMaxDays: number;
  prepLevel: PrepLevel;
  workModes: WorkMode[];
  deviceRequirements: DeviceAccess[];
  educationLevels: EducationLevel[];
  skillSlugs: string[];
  languageHints: string[];
  facts: string[];
  gaps: string[];
  jobTitles: string[];
}

export interface ScoredRoute extends CareerRoute {
  score: number;
  incomeWindowLabel: string;
}

export interface PlanTask {
  day: string;
  title: string;
  body: string;
}

export interface GeneratedPlan {
  bestRoute: ScoredRoute;
  alternatives: ScoredRoute[];
  timeline: PlanTask[];
  applicationMessage: string;
  cvSummary: string;
}

