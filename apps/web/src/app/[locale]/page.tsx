import { generatePlan } from "@earnpath/core";
import type { UserProfileInput } from "@earnpath/core";

const demoProfile: UserProfileInput = {
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

const markets = [
  { label: "Turkey", value: "TR", status: "Pilot" },
  { label: "Germany", value: "DE", status: "Research" },
  { label: "United Kingdom", value: "UK", status: "Research" },
  { label: "Gulf region", value: "GCC", status: "Next" }
];

const metrics = [
  ["3", "ranked routes"],
  ["30", "day action plan"],
  ["9", "starter languages"],
  ["2", "mobile stores ready"]
];

export default function HomePage() {
  const plan = generatePlan(demoProfile);
  const routes = [plan.bestRoute, ...plan.alternatives];

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

        <section className="panel-block">
          <div className="block-heading">
            <span>01</span>
            <h2>Candidate profile</h2>
          </div>
          <div className="form-grid">
            <label>
              Market
              <select defaultValue="TR">
                {markets.map((market) => (
                  <option key={market.value} value={market.value}>
                    {market.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Work mode
              <select defaultValue="any">
                <option value="any">Any</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </label>
            <label>
              Starting point
              <textarea placeholder="No license, can work evenings, has phone only..." />
            </label>
            <button className="primary-action" type="button">
              Generate path
            </button>
          </div>
        </section>

        <section className="panel-block">
          <div className="block-heading">
            <span>02</span>
            <h2>Launch markets</h2>
          </div>
          <div className="market-list">
            {markets.map((market) => (
              <div className="market-row" key={market.value}>
                <strong>{market.label}</strong>
                <span>{market.status}</span>
              </div>
            ))}
          </div>
        </section>
      </aside>

      <section className="workspace" aria-label="Income route workspace">
        <div className="workspace-header">
          <div>
            <p className="eyebrow">Live route engine</p>
            <h2>Fastest income path for a new candidate</h2>
          </div>
          <button className="secondary-action" type="button">
            Save plan
          </button>
        </div>

        <div className="metric-grid">
          {metrics.map(([value, label]) => (
            <div className="metric" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
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
              <h3>Commercial MVP</h3>
              <span>Designed to reach revenue early</span>
            </div>
            <div className="pricing-list">
              <article>
                <span>Free</span>
                <strong>Route analysis</strong>
                <p>Lead capture, trust building and saved plan.</p>
              </article>
              <article className="highlight">
                <span>$12-$19</span>
                <strong>Resume + application pack</strong>
                <p>Fast first paid product for job seekers.</p>
              </article>
              <article>
                <span>$29-$49</span>
                <strong>30-day follow-up</strong>
                <p>Weekly plan updates and application tracking.</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
