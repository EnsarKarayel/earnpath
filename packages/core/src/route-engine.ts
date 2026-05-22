import type { CareerRoute, GeneratedPlan, ScoredRoute, UserProfileInput } from "./types";

export const starterRoutes: CareerRoute[] = [
  {
    id: "customer-support",
    slug: "customer-support",
    name: "Customer support representative",
    shortDescription: "Handle customer questions through phone, chat, email or WhatsApp.",
    baseScore: 72,
    incomeWindowMinDays: 7,
    incomeWindowMaxDays: 21,
    prepLevel: "medium",
    workModes: ["remote", "hybrid", "any"],
    deviceRequirements: ["computer", "both", "phone"],
    educationLevels: ["highschool", "student", "degree"],
    skillSlugs: ["communication", "computer"],
    languageHints: ["en", "ar", "de", "ru"],
    facts: ["Chat support", "Shift work", "Resume matters"],
    gaps: ["Basic CRM use", "Clear written replies", "Complaint handling"],
    jobTitles: ["Call center agent", "E-commerce support", "Travel support agent"]
  },
  {
    id: "ecommerce-ops",
    slug: "ecommerce-ops",
    name: "E-commerce operations assistant",
    shortDescription: "Support product entry, order tracking, spreadsheets and marketplace panels.",
    baseScore: 70,
    incomeWindowMinDays: 14,
    incomeWindowMaxDays: 30,
    prepLevel: "medium",
    workModes: ["hybrid", "onsite", "remote", "any"],
    deviceRequirements: ["computer", "both"],
    educationLevels: ["highschool", "student", "degree"],
    skillSlugs: ["computer", "sales"],
    languageHints: ["en"],
    facts: ["Spreadsheets", "Marketplaces", "Office or hybrid"],
    gaps: ["Spreadsheet filters", "Product descriptions", "Order tracking habits"],
    jobTitles: ["Marketplace assistant", "Product listing assistant", "Operations support"]
  },
  {
    id: "field-sales",
    slug: "field-sales",
    name: "Field sales and brand representative",
    shortDescription: "Earn faster through store, booth or local sales work with possible commission.",
    baseScore: 68,
    incomeWindowMinDays: 3,
    incomeWindowMaxDays: 14,
    prepLevel: "low",
    workModes: ["onsite", "any"],
    deviceRequirements: ["phone", "both", "computer"],
    educationLevels: ["none", "middle", "highschool", "student", "degree"],
    skillSlugs: ["communication", "sales", "field"],
    languageHints: ["ar", "ru"],
    facts: ["Commission", "Field work", "Fast start"],
    gaps: ["Short sales pitch", "Daily target tracking", "Basic product explanation"],
    jobTitles: ["Brand representative", "Booth staff", "Field sales assistant"]
  },
  {
    id: "micro-logistics",
    slug: "micro-logistics",
    name: "Micro logistics and delivery",
    shortDescription: "Start quickly with package, grocery, warehouse or local delivery tasks.",
    baseScore: 66,
    incomeWindowMinDays: 1,
    incomeWindowMaxDays: 10,
    prepLevel: "low",
    workModes: ["onsite", "any"],
    deviceRequirements: ["phone", "both"],
    educationLevels: ["none", "middle", "highschool", "student", "degree"],
    skillSlugs: ["field"],
    languageHints: [],
    facts: ["Fast cash flow", "Field work", "Flexible hours"],
    gaps: ["Route tracking", "Customer communication", "Daily cost calculation"],
    jobTitles: ["Package delivery", "Grocery picker", "Warehouse support"]
  },
  {
    id: "office-assistant",
    slug: "office-assistant",
    name: "Office and bookkeeping assistant",
    shortDescription: "Handle invoices, documents, appointments and basic spreadsheet tracking.",
    baseScore: 62,
    incomeWindowMinDays: 21,
    incomeWindowMaxDays: 45,
    prepLevel: "high",
    workModes: ["onsite", "hybrid", "any"],
    deviceRequirements: ["computer", "both"],
    educationLevels: ["highschool", "student", "degree"],
    skillSlugs: ["computer", "communication"],
    languageHints: ["en"],
    facts: ["Spreadsheets", "Documents", "Organization"],
    gaps: ["Spreadsheet formulas", "Invoice basics", "Calendar management"],
    jobTitles: ["Office assistant", "Bookkeeping support", "Administrative assistant"]
  },
  {
    id: "content-ops",
    slug: "content-ops",
    name: "Social content operator",
    shortDescription: "Create short posts, product visuals, captions and publishing calendars.",
    baseScore: 60,
    incomeWindowMinDays: 14,
    incomeWindowMaxDays: 45,
    prepLevel: "medium",
    workModes: ["remote", "hybrid", "any"],
    deviceRequirements: ["computer", "both", "phone"],
    educationLevels: ["highschool", "student", "degree"],
    skillSlugs: ["design", "computer", "sales"],
    languageHints: ["en"],
    facts: ["Portfolio", "Short video", "Freelance"],
    gaps: ["Canva layout", "Short copywriting", "Sample portfolio"],
    jobTitles: ["Content assistant", "Social media support", "Product copywriter"]
  },
  {
    id: "repair-apprentice",
    slug: "repair-apprentice",
    name: "Technical service apprentice",
    shortDescription: "Learn phone, computer, appliance or electrical service work on the job.",
    baseScore: 58,
    incomeWindowMinDays: 21,
    incomeWindowMaxDays: 60,
    prepLevel: "medium",
    workModes: ["onsite", "any"],
    deviceRequirements: ["phone", "both", "computer"],
    educationLevels: ["none", "middle", "highschool", "student", "degree"],
    skillSlugs: ["repair", "field"],
    languageHints: [],
    facts: ["Mentor based", "Field work", "Long-term skill"],
    gaps: ["Safety rules", "Part recognition", "Service notes"],
    jobTitles: ["Service apprentice", "Technical support assistant", "Installation helper"]
  },
  {
    id: "care-support",
    slug: "care-support",
    name: "Care and companion support",
    shortDescription: "Provide elderly, child, patient or household support with local references.",
    baseScore: 56,
    incomeWindowMinDays: 3,
    incomeWindowMaxDays: 14,
    prepLevel: "low",
    workModes: ["onsite", "any"],
    deviceRequirements: ["phone", "both"],
    educationLevels: ["none", "middle", "highschool", "student", "degree"],
    skillSlugs: ["care", "communication"],
    languageHints: ["ar", "ru"],
    facts: ["Trust", "References", "Local demand"],
    gaps: ["Reference message", "Hourly pricing", "Safe listing checks"],
    jobTitles: ["Companion support", "Home support", "Child care assistant"]
  },
  {
    id: "food-service",
    slug: "food-service",
    name: "Cafe and quick service team",
    shortDescription: "Start in service, cashier, prep or shift-based food business roles.",
    baseScore: 55,
    incomeWindowMinDays: 3,
    incomeWindowMaxDays: 14,
    prepLevel: "low",
    workModes: ["onsite", "any"],
    deviceRequirements: ["phone", "both"],
    educationLevels: ["none", "middle", "highschool", "student", "degree"],
    skillSlugs: ["food", "communication", "field"],
    languageHints: ["en", "ar", "ru"],
    facts: ["Shift work", "Tips possible", "Fast start"],
    gaps: ["Hygiene basics", "Cashier communication", "Peak-hour pace"],
    jobTitles: ["Barista assistant", "Service staff", "Prep team member"]
  }
];

export function scoreRoute(route: CareerRoute, profile: UserProfileInput): number {
  let score = route.baseScore;

  if (route.deviceRequirements.includes(profile.deviceAccess)) score += 12;
  if (route.workModes.includes(profile.workMode)) score += 10;
  if (route.educationLevels.includes(profile.educationLevel)) score += 8;
  if (profile.languages.some((language) => route.languageHints.includes(language))) score += 6;

  for (const skill of profile.skills) {
    if (route.skillSlugs.includes(skill)) score += 8;
  }

  if (profile.incomeUrgency === "now" && route.incomeWindowMaxDays <= 10) score += 16;
  if (profile.incomeUrgency === "now" && route.incomeWindowMaxDays <= 14) score += 10;
  if (profile.incomeUrgency === "month" && route.incomeWindowMaxDays <= 30) score += 9;
  if (profile.incomeUrgency === "quarter" && route.prepLevel !== "low") score += 8;

  if (profile.dailyTimeBudget === "2" && route.prepLevel === "high") score -= 10;
  if (profile.dailyTimeBudget === "6" && route.prepLevel !== "low") score += 6;
  if (profile.workMode === "remote" && !route.workModes.includes("remote")) score -= 20;
  if (profile.deviceAccess === "phone" && !route.deviceRequirements.includes("phone")) score -= 16;

  const constraints = profile.constraints?.toLocaleLowerCase("en") ?? "";
  if (constraints.includes("no license") && route.slug === "micro-logistics") score -= 14;
  if (constraints.includes("child") && route.workModes.includes("remote")) score += 6;
  if (constraints.includes("evening") && ["customer-support", "micro-logistics"].includes(route.slug)) score += 6;

  return Math.max(0, Math.min(99, score));
}

export function rankRoutes(profile: UserProfileInput, routes: CareerRoute[] = starterRoutes): ScoredRoute[] {
  return routes
    .map((route) => ({
      ...route,
      score: scoreRoute(route, profile),
      incomeWindowLabel: `${route.incomeWindowMinDays}-${route.incomeWindowMaxDays} days`
    }))
    .sort((a, b) => b.score - a.score);
}

export function generatePlan(profile: UserProfileInput, routes: CareerRoute[] = starterRoutes): GeneratedPlan {
  const ranked = rankRoutes(profile, routes);
  const bestRoute = ranked[0];
  const alternatives = ranked.slice(1, 3);

  const timeline = [
    {
      day: "Day 1",
      title: "Choose one target",
      body: `Prepare a one-page resume, a short application message and three search keywords for ${bestRoute.name}.`
    },
    {
      day: "Day 2-3",
      title: "Close the first skill gap",
      body: `Finish two short lessons about ${bestRoute.gaps.slice(0, 2).join(" and ")}. Save proof of what you completed.`
    },
    {
      day: "Day 4-7",
      title: "Run the first application sprint",
      body: "Apply through local job boards, LinkedIn, municipal employment offices and direct business messages."
    },
    {
      day: "Day 8-14",
      title: "Turn replies into interviews",
      body: "Track every reply, answer the same day and ask for a short trial task when the role is suitable."
    },
    {
      day: "Day 15-30",
      title: "Stabilize the income path",
      body: "Focus on the role type with the fastest response. Weekly target: 25 applications, 5 conversations, 1 trial."
    }
  ];

  const applicationMessage = `Hello,\n\nI would like to apply for a ${bestRoute.name} role. I am available in ${profile.city} or through a suitable work model. My strongest areas are: ${profile.skills.join(", ")}.\n\nI am preparing for this path by improving ${bestRoute.gaps[0]} and ${bestRoute.gaps[1]}. I would be happy to complete a short interview or trial task.\n\nThank you.`;

  const cvSummary = `${bestRoute.name} candidate aiming for a fast and realistic start. Strong areas: ${profile.skills.join(", ")}. Current development plan: ${bestRoute.gaps.join(", ")}.`;

  return {
    bestRoute,
    alternatives,
    timeline,
    applicationMessage,
    cvSummary
  };
}
