/* global React */

const SERVICES = [
  {
    icon: 'code', title: 'Web development',
    blurb: 'Product surfaces that ship in weeks, not quarters. React, Next.js, TypeScript.',
    price: 'from $8k', engagement: '2–6 weeks',
  },
  {
    icon: 'sparkles', title: 'AI integrations',
    blurb: 'From "we should use AI" to a working pipeline with evals, cost caps, and fallbacks.',
    price: 'from $12k', engagement: '3–8 weeks',
  },
  {
    icon: 'zap', title: 'Performance audits',
    blurb: 'p95 is a number you can move. I find the bottleneck and fix it, with a written report.',
    price: 'from $4k', engagement: '1–2 weeks',
  },
  {
    icon: 'git-branch', title: 'System design',
    blurb: 'Pre-implementation review. Diagrams, RFC, risks, and a build plan you can staff against.',
    price: 'from $3k', engagement: 'fixed scope',
  },
];

function Services() {
  return (
    <div className="services">
      {SERVICES.map((s, i) => (
        <article key={s.title} className="service-card" data-reveal data-magnetic style={{ transitionDelay: `${i * 80}ms` }}>
          <div className="service-icon"><Icon name={s.icon} size={18} /></div>
          <h3 className="service-title">{s.title}</h3>
          <p className="service-blurb">{s.blurb}</p>
          <div className="service-meta">
            <span className="service-price mono">{s.price}</span>
            <span className="service-sep">·</span>
            <span className="service-eng mono">{s.engagement}</span>
          </div>
          <div className="service-arrow"><Icon name="arrow-up-right" size={16} /></div>
        </article>
      ))}
    </div>
  );
}

// ============================================================
// Experience timeline
// ============================================================
const EXPERIENCE = [
  {
    year: '2025', range: 'NOW',
    role: 'Independent · Founding engineer (contract)',
    company: 'Atlas Labs & others',
    bullets: [
      'Shipped Atlas, an agentic research assistant, from 0 → 8k daily runs.',
      'Consulting for 2 Series-A teams on LLM ops and RAG architecture.',
      'Open-sourced Prism — now 1.2k stars, 40+ contributors.',
    ],
  },
  {
    year: '2023', range: '2023 — 2025',
    role: 'Senior full stack engineer',
    company: 'Ledgerloop (YC W23)',
    bullets: [
      'Second engineering hire. Built payments, invoicing, and FX pipeline from scratch.',
      'Led SOC2 compliance work; passed Type I audit in 4 months.',
      'Grew team from 2 → 7 engineers. Set architecture and hiring bar.',
    ],
  },
  {
    year: '2021', range: '2021 — 2023',
    role: 'Full stack engineer',
    company: 'Mesh (Series-B fintech)',
    bullets: [
      'Owned the merchant dashboard. 40k+ daily actives.',
      'Migrated legacy PHP monolith to a TypeScript + Postgres stack.',
      'Shipped a realtime fraud-alert system; flagged $3.1M in chargebacks y/1.',
    ],
  },
  {
    year: '2019', range: '2019 — 2021',
    role: 'Software engineer',
    company: 'Freelance',
    bullets: [
      '12 shipped client projects across web, mobile, and data tooling.',
      'Taught myself Rust on a weather-data pipeline that ran on a $5 VPS.',
    ],
  },
];

function Experience() {
  return (
    <div className="timeline">
      {EXPERIENCE.map((x, i) => (
        <div key={i} className="tl-row" data-reveal>
          <div className="tl-year">
            <span className="tl-year-num serif">{x.year}</span>
            <span className="tl-year-range mono">{x.range}</span>
          </div>
          <div className="tl-marker"><span className="tl-dot" /><span className="tl-line" /></div>
          <div className="tl-body">
            <h3 className="tl-role">{x.role}</h3>
            <div className="tl-company">{x.company}</div>
            <ul className="tl-bullets">
              {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Contact
// ============================================================
function Contact() {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText('salik@salik.dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="contact">
      <div className="contact-left">
        <h2 className="h-display contact-title">
          <RevealText as="span" text="Let's" />
          <span className="serif reveal-word" style={{ animationDelay: '80ms', paddingRight: '0.08em' }}> talk.</span>
        </h2>
        <p className="p-lead contact-lead" data-reveal>
          Plain email is fastest. I reply within 48 hours, or I tell you I can't.
        </p>

        <div className="contact-actions" data-reveal>
          <button className="contact-email" onClick={copy} data-magnetic>
            <span className="mono">salik@salik.dev</span>
            <span className="contact-email-action">
              <Icon name={copied ? 'check' : 'copy'} size={14} />
              {copied ? 'copied' : 'copy'}
            </span>
          </button>
        </div>

        <div className="contact-socials" data-reveal>
          <a href="#" className="contact-social"><Icon name="github" size={16} /> github/salikjavid</a>
          <a href="#" className="contact-social"><Icon name="linkedin" size={16} /> linkedin/in/salik</a>
          <a href="#" className="contact-social"><Icon name="twitter" size={16} /> x.com/salik</a>
        </div>
      </div>

      <div className="contact-right">
        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Would send. This is a kit.'); }}>
          <div className="field">
            <label>Your name</label>
            <input className="input" placeholder="Jane Doe" />
          </div>
          <div className="field">
            <label>Email</label>
            <input className="input" type="email" placeholder="you@company.com" />
          </div>
          <div className="field">
            <label>What are you building?</label>
            <textarea className="textarea" rows="4" placeholder="One paragraph about the thing you're trying to un-stick…" />
          </div>
          <div className="contact-form-foot">
            <span className="p-meta">I read every message.</span>
            <Button variant="primary" type="submit">Send <Icon name="arrow-right" size={14} /></Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Object.assign(window, { Services, Experience, Contact, SERVICES, EXPERIENCE });
