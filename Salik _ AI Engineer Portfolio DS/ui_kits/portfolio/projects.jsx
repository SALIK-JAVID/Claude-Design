/* global React */
const { useState, useEffect, useRef } = React;

const PROJECTS = [
  {
    idx: '01', name: 'Atlas',
    tag: 'Agentic research',
    year: '2025',
    problem: 'Researchers waste hours stitching together 10 tabs to answer a single question.',
    solution: 'Multi-step agent with tool use, memory, and a browser-native UX. Ships as a Chrome extension + hosted API.',
    impact: ['8k daily agent runs', '94% tool-call accuracy', '< 900ms p50'],
    stack: ['typescript', 'react', 'postgres', 'pgvector', 'modal'],
    href: '#'
  },
  {
    idx: '02', name: 'Prism',
    tag: 'LLM ops',
    year: '2025',
    problem: 'Teams running LLMs in production have no visibility into cost, drift, or failure modes.',
    solution: 'Realtime observability for LLM apps. Token-level tracing, eval harness, and a CLI.',
    impact: ['p95 latency cut 3.2×', '40% cost reduction for 3 design-partner teams', 'Open source core'],
    stack: ['rust', 'clickhouse', 'nextjs', 'sse'],
    href: '#'
  },
  {
    idx: '03', name: 'Ledgerloop',
    tag: 'Fintech',
    year: '2024',
    problem: 'Freelancers in MENA have no simple way to invoice in USD and get paid in local currency.',
    solution: 'Stripe + local rails, a clean invoicing UX, auto-FX quoting.',
    impact: ['$1.2M processed in year one', '320 freelancers onboarded', 'SOC2 in 4 months'],
    stack: ['nextjs', 'stripe', 'postgres', 'temporal'],
    href: '#'
  },
  {
    idx: '04', name: 'Vellum',
    tag: 'Dev tool',
    year: '2024',
    problem: 'LLM prompts break silently when models change. Nobody runs real regression tests.',
    solution: 'Git-native prompt testing. Evals run on push, diffs render inline in PRs.',
    impact: ['2.3k repos installed', 'Top 50 Product Hunt launch', 'Acquired-talked'],
    stack: ['typescript', 'github-actions', 'openai'],
    href: '#'
  },
];

function ProjectList() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'j') { e.preventDefault(); setActive((i) => Math.min(i + 1, PROJECTS.length - 1)); }
      else if (e.key === 'k') { e.preventDefault(); setActive((i) => Math.max(i - 1, 0)); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="projects" onMouseLeave={() => setActive(-1)}>
      <div className="projects-kbd-hint">
        <kbd>J</kbd>/<kbd>K</kbd> <span>to navigate</span>
      </div>
      {PROJECTS.map((p, i) => (
        <ProjectRow key={p.idx} project={p} isActive={i === active} onEnter={() => setActive(i)} />
      ))}
    </div>
  );
}

function ProjectRow({ project: p, isActive, onEnter }) {
  return (
    <article
      className={`project-row ${isActive ? 'is-active' : ''}`}
      onMouseEnter={onEnter}
      data-reveal
      data-magnetic
    >
      <div className="project-row-top">
        <span className="project-idx serif">{p.idx}</span>
        <div className="project-name-group">
          <h3 className="project-name">{p.name}</h3>
          <span className="project-tag">— {p.tag}</span>
        </div>
        <span className="project-year mono">{p.year}</span>
        <Icon name="arrow-up-right" size={20} />
      </div>
      <div className="project-row-expand">
        <div className="project-col">
          <div className="project-col-label">Problem</div>
          <p className="project-col-text">{p.problem}</p>
        </div>
        <div className="project-col">
          <div className="project-col-label">Solution</div>
          <p className="project-col-text">{p.solution}</p>
        </div>
        <div className="project-col">
          <div className="project-col-label">Impact</div>
          <ul className="project-impact">
            {p.impact.map((m) => <li key={m}><span className="serif">→</span> {m}</li>)}
          </ul>
        </div>
        <div className="project-col project-col-stack">
          <div className="project-col-label">Stack</div>
          <div className="chips">
            {p.stack.map((s) => <span key={s} className="chip mono">{s}</span>)}
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// Sticky project cards variation — alternate layout
// ============================================================
function ProjectSticky() {
  return (
    <div className="projects-sticky">
      {PROJECTS.map((p) => (
        <div key={p.idx} className="project-sticky-card" data-reveal>
          <div className="project-sticky-inner">
            <div className="project-sticky-head">
              <span className="project-idx serif">{p.idx}</span>
              <span className="project-year mono">{p.year}</span>
            </div>
            <h3 className="project-sticky-name">{p.name}</h3>
            <p className="project-sticky-tag">{p.tag}</p>
            <p className="project-sticky-desc">{p.solution}</p>
            <div className="chips">
              {p.stack.map((s) => <span key={s} className="chip mono">{s}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, { ProjectList, ProjectRow, ProjectSticky, PROJECTS });
