/* global React */
const { useState } = React;

const SKILL_GROUPS = [
  {
    key: 'frontend', label: 'Frontend', icon: 'layout',
    blurb: 'Shipping interfaces that feel fast and look considered.',
    items: [
      { name: 'React', level: 'Expert', years: 6 },
      { name: 'Next.js', level: 'Expert', years: 5 },
      { name: 'TypeScript', level: 'Expert', years: 6 },
      { name: 'Tailwind', level: 'Expert', years: 4 },
      { name: 'Framer Motion', level: 'Strong', years: 3 },
      { name: 'Three.js', level: 'Working', years: 2 },
    ]
  },
  {
    key: 'backend', label: 'Backend', icon: 'server',
    blurb: 'APIs that don\'t wake you up at 3am.',
    items: [
      { name: 'Node.js', level: 'Expert', years: 6 },
      { name: 'Postgres', level: 'Expert', years: 5 },
      { name: 'Rust', level: 'Strong', years: 2 },
      { name: 'Go', level: 'Strong', years: 3 },
      { name: 'Redis', level: 'Expert', years: 4 },
      { name: 'Temporal', level: 'Strong', years: 2 },
    ]
  },
  {
    key: 'ai', label: 'AI / ML', icon: 'sparkles',
    blurb: 'Models as infrastructure, not magic.',
    items: [
      { name: 'OpenAI / Anthropic', level: 'Expert', years: 3 },
      { name: 'LangChain / LangGraph', level: 'Strong', years: 2 },
      { name: 'pgvector', level: 'Expert', years: 2 },
      { name: 'Fine-tuning', level: 'Strong', years: 2 },
      { name: 'Evals & observability', level: 'Expert', years: 2 },
      { name: 'Agentic systems', level: 'Expert', years: 2 },
    ]
  },
  {
    key: 'devops', label: 'DevOps', icon: 'boxes',
    blurb: 'Infrastructure that disappears when it works.',
    items: [
      { name: 'Docker', level: 'Expert', years: 5 },
      { name: 'Kubernetes', level: 'Strong', years: 3 },
      { name: 'AWS', level: 'Expert', years: 5 },
      { name: 'Terraform', level: 'Strong', years: 3 },
      { name: 'GitHub Actions', level: 'Expert', years: 4 },
      { name: 'Modal / Fly', level: 'Strong', years: 2 },
    ]
  },
];

function Skills() {
  const [active, setActive] = useState('frontend');
  const group = SKILL_GROUPS.find((g) => g.key === active);

  return (
    <div className="skills">
      <div className="skills-tabs">
        {SKILL_GROUPS.map((g) => (
          <button
            key={g.key}
            className={`skills-tab ${active === g.key ? 'is-active' : ''}`}
            onClick={() => setActive(g.key)}
            data-magnetic
          >
            <Icon name={g.icon} size={14} />
            <span>{g.label}</span>
            <span className="skills-tab-count mono">{String(g.items.length).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      <div className="skills-panel" key={active}>
        <p className="skills-blurb">{group.blurb}</p>
        <div className="skills-grid">
          {group.items.map((it, i) => (
            <div key={it.name} className="skill-item" style={{ animationDelay: `${i * 40}ms` }}>
              <div className="skill-name">{it.name}</div>
              <div className="skill-meta">
                <span className="skill-level">{it.level}</span>
                <span className="skill-years mono">{it.years}y</span>
              </div>
              <div className="skill-bar">
                <div className="skill-bar-fill" style={{ width: it.level === 'Expert' ? '92%' : it.level === 'Strong' ? '72%' : '50%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Stack marquee — infinite scroll of logos/names
// ============================================================
const STACK_NAMES = [
  'typescript', 'react', 'nextjs', 'nodejs', 'postgres', 'rust', 'redis',
  'openai', 'anthropic', 'langchain', 'pgvector', 'temporal', 'stripe',
  'aws', 'docker', 'kubernetes', 'modal', 'clickhouse', 'tailwind', 'fly',
];

function StackMarquee() {
  const doubled = [...STACK_NAMES, ...STACK_NAMES];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((n, i) => (
          <span key={i} className="marquee-item mono">
            <span className="marquee-dot">◆</span>{n}
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Skills, StackMarquee, SKILL_GROUPS });
