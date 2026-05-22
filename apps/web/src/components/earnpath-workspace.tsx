"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { generatePlan } from "@earnpath/core";
import type { DeviceAccess, EducationLevel, IncomeUrgency, LocaleCode, UserProfileInput, WorkMode } from "@earnpath/core";
import { createSupabaseBrowserClient } from "../lib/supabase";

const markets = [
  { label: "Turkey", value: "TR", status: "Pilot" },
  { label: "Germany", value: "DE", status: "Research" },
  { label: "United Kingdom", value: "UK", status: "Research" },
  { label: "Gulf region", value: "GCC", status: "Next" }
];

const skills = [
  ["communication", "Communication"],
  ["computer", "Computer work"],
  ["sales", "Sales"],
  ["field", "Field work"],
  ["design", "Content/design"],
  ["repair", "Technical repair"],
  ["care", "Care support"],
  ["food", "Food/service"]
] as const;

const defaultProfile: UserProfileInput = {
  city: "Istanbul",
  country: "TR",
  locale: "en",
  educationLevel: "highschool",
  deviceAccess: "both",
  dailyTimeBudget: "4",
  workMode: "any",
  incomeUrgency: "now",
  languages: ["tr", "en"],
  skills: ["communication", "computer"],
  constraints: ""
};

export function EarnPathWorkspace() {
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const [profile, setProfile] = useState<UserProfileInput>(defaultProfile);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState("Generate a path instantly. Sign in to save it.");
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingLink, setIsSendingLink] = useState(false);
  const [savedNotice, setSavedNotice] = useState("");

  const plan = useMemo(() => generatePlan(profile), [profile]);
  const routes = [plan.bestRoute, ...plan.alternatives];

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!user) {
      setSavedNotice("");
      return;
    }

    async function loadUserState() {
      const { data: savedProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (savedProfile) {
        setProfile({
          city: savedProfile.city ?? defaultProfile.city,
          country: savedProfile.country ?? defaultProfile.country,
          locale: (savedProfile.locale ?? defaultProfile.locale) as LocaleCode,
          educationLevel: (savedProfile.education_level ?? defaultProfile.educationLevel) as EducationLevel,
          deviceAccess: (savedProfile.device_access ?? defaultProfile.deviceAccess) as DeviceAccess,
          dailyTimeBudget: (savedProfile.daily_time_budget ?? defaultProfile.dailyTimeBudget) as "2" | "4" | "6",
          workMode: (savedProfile.work_mode ?? defaultProfile.workMode) as WorkMode,
          incomeUrgency: (savedProfile.income_urgency ?? defaultProfile.incomeUrgency) as IncomeUrgency,
          languages: savedProfile.languages?.length ? savedProfile.languages : defaultProfile.languages,
          skills: savedProfile.skills?.length ? savedProfile.skills : defaultProfile.skills,
          constraints: savedProfile.constraints ?? ""
        });
      }

      const { data: latestPlan } = await supabase
        .from("user_plans")
        .select("created_at,status")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setSavedNotice(latestPlan ? `Latest saved plan: ${new Date(latestPlan.created_at).toLocaleString()}` : "");
    }

    loadUserState();
  }, [supabase, user]);

  function updateProfile<Key extends keyof UserProfileInput>(key: Key, value: UserProfileInput[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function toggleSkill(value: string) {
    setProfile((current) => ({
      ...current,
      skills: current.skills.includes(value)
        ? current.skills.filter((skill) => skill !== value)
        : [...current.skills, value]
    }));
  }

  async function sendMagicLink() {
    if (!email.trim()) {
      setStatus("Enter an email address first.");
      return;
    }

    setIsSendingLink(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.href
      }
    });

    setIsSendingLink(false);
    setStatus(error ? error.message : "Magic link sent. Open your email to sign in.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setStatus("Signed out. You can still generate paths locally.");
  }

  async function savePlan() {
    if (!user) {
      setStatus("Sign in with email before saving your profile and plan.");
      return;
    }

    setIsSaving(true);

    const profilePayload = {
      id: user.id,
      locale: profile.locale,
      display_name: user.email?.split("@")[0] ?? null,
      city: profile.city,
      country: profile.country,
      education_level: profile.educationLevel,
      device_access: profile.deviceAccess,
      daily_time_budget: profile.dailyTimeBudget,
      work_mode: profile.workMode,
      income_urgency: profile.incomeUrgency,
      languages: profile.languages,
      skills: profile.skills,
      constraints: profile.constraints ?? null,
      onboarding_completed: true
    };

    const { error: profileError } = await supabase.from("profiles").upsert(profilePayload);

    if (profileError) {
      setIsSaving(false);
      setStatus(profileError.message);
      return;
    }

    const { error: planError } = await supabase.from("user_plans").insert({
      user_id: user.id,
      profile_snapshot: profile,
      route_scores: routes.map((route) => ({
        id: route.id,
        slug: route.slug,
        name: route.name,
        score: route.score,
        incomeWindow: route.incomeWindowLabel
      })),
      timeline: plan.timeline,
      application_message: plan.applicationMessage,
      cv_summary: plan.cvSummary,
      status: "active"
    });

    setIsSaving(false);

    if (planError) {
      setStatus(planError.message);
      return;
    }

    const message = `Saved plan for ${plan.bestRoute.name}.`;
    setStatus(message);
    setSavedNotice(message);
  }

  return (
    <main className="app-frame">
      <aside className="sidebar" aria-label="Profile intake">
        <div className="brand">
          <span className="brand-mark">EP</span>
          <div>
            <h1>EarnPath</h1>
            <p>Your 30-day route to income</p>
          </div>
        </div>

        <section className="panel-block auth-card">
          <div className="block-heading">
            <span>01</span>
            <h2>Account</h2>
          </div>
          {user ? (
            <div className="signed-in">
              <strong>{user.email}</strong>
              <button className="secondary-action" type="button" onClick={signOut}>
                Sign out
              </button>
            </div>
          ) : (
            <div className="form-grid">
              <label>
                Email
                <input
                  value={email}
                  type="email"
                  placeholder="you@example.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <button className="primary-action" type="button" onClick={sendMagicLink} disabled={isSendingLink}>
                {isSendingLink ? "Sending..." : "Send magic link"}
              </button>
            </div>
          )}
          <p className="status-text">{status}</p>
          {savedNotice ? <p className="status-text success">{savedNotice}</p> : null}
        </section>

        <section className="panel-block">
          <div className="block-heading">
            <span>02</span>
            <h2>Candidate profile</h2>
          </div>
          <div className="form-grid">
            <label>
              Market
              <select value={profile.country} onChange={(event) => updateProfile("country", event.target.value)}>
                {markets.map((market) => (
                  <option key={market.value} value={market.value}>
                    {market.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              City
              <input value={profile.city} onChange={(event) => updateProfile("city", event.target.value)} />
            </label>
            <label>
              Education
              <select
                value={profile.educationLevel}
                onChange={(event) => updateProfile("educationLevel", event.target.value as EducationLevel)}
              >
                <option value="none">No diploma</option>
                <option value="middle">Middle school</option>
                <option value="highschool">High school</option>
                <option value="student">University student</option>
                <option value="degree">Degree</option>
              </select>
            </label>
            <label>
              Device access
              <select
                value={profile.deviceAccess}
                onChange={(event) => updateProfile("deviceAccess", event.target.value as DeviceAccess)}
              >
                <option value="phone">Phone only</option>
                <option value="computer">Computer</option>
                <option value="both">Phone + computer</option>
              </select>
            </label>
            <label>
              Daily time
              <select
                value={profile.dailyTimeBudget}
                onChange={(event) => updateProfile("dailyTimeBudget", event.target.value as "2" | "4" | "6")}
              >
                <option value="2">1-2 hours</option>
                <option value="4">3-4 hours</option>
                <option value="6">5+ hours</option>
              </select>
            </label>
            <label>
              Work mode
              <select value={profile.workMode} onChange={(event) => updateProfile("workMode", event.target.value as WorkMode)}>
                <option value="any">Any</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </label>
            <label>
              Income urgency
              <select
                value={profile.incomeUrgency}
                onChange={(event) => updateProfile("incomeUrgency", event.target.value as IncomeUrgency)}
              >
                <option value="now">Immediately</option>
                <option value="month">Within 30 days</option>
                <option value="quarter">Within 3 months</option>
              </select>
            </label>
            <label>
              Starting point
              <textarea
                value={profile.constraints}
                placeholder="No license, can work evenings, has phone only..."
                onChange={(event) => updateProfile("constraints", event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="panel-block">
          <div className="block-heading">
            <span>03</span>
            <h2>Strengths</h2>
          </div>
          <div className="skill-grid">
            {skills.map(([value, label]) => (
              <label className="skill-pill" key={value}>
                <input checked={profile.skills.includes(value)} type="checkbox" onChange={() => toggleSkill(value)} />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </section>
      </aside>

      <section className="workspace" aria-label="Income route workspace">
        <div className="workspace-header">
          <div>
            <p className="eyebrow">Live route engine</p>
            <h2>{plan.bestRoute.name}</h2>
          </div>
          <button className="secondary-action" type="button" onClick={savePlan} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save plan"}
          </button>
        </div>

        <div className="metric-grid">
          <div className="metric">
            <strong>{plan.bestRoute.score}%</strong>
            <span>top route fit</span>
          </div>
          <div className="metric">
            <strong>{plan.bestRoute.incomeWindowLabel}</strong>
            <span>first income window</span>
          </div>
          <div className="metric">
            <strong>{profile.skills.length}</strong>
            <span>strengths selected</span>
          </div>
          <div className="metric">
            <strong>{user ? "Synced" : "Local"}</strong>
            <span>data mode</span>
          </div>
        </div>

        <div className="section-heading">
          <h3>Recommended routes</h3>
          <span>Based on skills, device access, language and urgency</span>
        </div>
        <div className="route-grid">
          {routes.map((route, index) => (
            <article className={index === 0 ? "route-card selected" : "route-card"} key={route.id}>
              <div className="card-topline">
                <span>#{index + 1}</span>
                <strong>{route.score}% fit</strong>
              </div>
              <h4>{route.name}</h4>
              <p>{route.shortDescription}</p>
              <ul>
                <li>{route.incomeWindowLabel}</li>
                <li>{route.prepLevel} prep</li>
                {route.facts.slice(0, 2).map((fact) => (
                  <li key={fact}>{fact}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="two-column">
          <section>
            <div className="section-heading">
              <h3>30-day plan</h3>
              <span>Concrete tasks, not generic advice</span>
            </div>
            <ol className="timeline">
              {plan.timeline.map((task) => (
                <li className="task" key={task.day}>
                  <time>{task.day}</time>
                  <div>
                    <strong>{task.title}</strong>
                    <p>{task.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <div className="section-heading">
              <h3>Application assets</h3>
              <span>Generated from the route</span>
            </div>
            <div className="asset-card">
              <strong>Resume summary</strong>
              <p>{plan.cvSummary}</p>
            </div>
            <div className="asset-card">
              <strong>Application message</strong>
              <p>{plan.applicationMessage}</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
