/* global React */
const { useState, useEffect } = React;

// ============================================================
// HERO — 3 layout variations, cycleable via Tweaks
// ============================================================
function Hero({ variant = 'editorial' }) {
  if (variant === 'split') return <HeroSplit />;
  if (variant === 'centered') return <HeroCentered />;
  return <HeroEditorial />;
}

function HeroEditorial() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.toLocaleTimeString('en-US', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false });
      setTime(h);
    };
    tick(); const t = setInterval(tick, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <header id="top" className="hero hero-editorial grain" data-screen-label="Hero">
      <div className="hero-radial" />
      <div className="container hero-inner">
        <div className="hero-meta">
          <span className="eyebrow"><span className="dot-available" />Available · Q1 2026</span>
          <span className="hero-meta-sep">·</span>
          <span className="mono p-meta">Karachi · {time} PKT</span>
        </div>

        <h1 className="h-display hero-title">
          <RevealText as="span" text="Full stack" delay={80} />
          <br />
          <span className="hero-serif reveal-word" style={{ animationDelay: '180ms' }}>AI engineer,</span>
          <br />
          <RevealText as="span" text="shipping production." delay={320} />
        </h1>

        <div className="hero-sub">
          <p className="p-lead" data-reveal style={{ transitionDelay: '800ms' }}>
            I build agents, RAG pipelines, and the web apps that wrap them.
            <br />
            Previously shipped systems serving 8k+ daily runs. Looking for the hard problems.
          </p>
        </div>

        <div className="hero-ctas" data-reveal style={{ transitionDelay: '950ms' }}>
          <Button as="a" href="#work" variant="primary" size="lg">
            View selected work <Icon name="arrow-down-right" size={16} />
          </Button>
          <Button as="a" href="#contact" variant="secondary" size="lg">
            Get in touch
          </Button>
        </div>

        <div className="hero-stats" data-reveal style={{ transitionDelay: '1100ms' }}>
          <div className="hero-stat">
            <div className="hero-stat-n"><span className="serif">4</span>+</div>
            <div className="hero-stat-l">years<br/>shipping</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-n"><span className="serif">12</span></div>
            <div className="hero-stat-l">production<br/>systems</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-n"><span className="serif">3.2</span>×</div>
            <div className="hero-stat-l">p95 latency<br/>reduction</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-n"><span className="serif">94</span>%</div>
            <div className="hero-stat-l">tool-call<br/>accuracy</div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" data-reveal style={{ transitionDelay: '1400ms' }}>
        <span className="mono p-meta">Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </header>
  );
}

function HeroSplit() {
  return (
    <header id="top" className="hero hero-split grain" data-screen-label="Hero">
      <div className="container hero-split-grid">
        <div className="hero-split-left">
          <div className="eyebrow"><span className="dot-available" />Open to work · Q1 2026</div>
          <h1 className="h-display hero-title">
            <RevealText as="span" text="Salik Javid." />
          </h1>
          <p className="p-lead" data-reveal>
            Full stack AI engineer. I build <span className="serif">scalable</span> systems,
            AI-powered applications, and high-performance web platforms.
          </p>
          <div className="hero-ctas" data-reveal>
            <Button as="a" href="#work" variant="primary" size="lg">See the work <Icon name="arrow-right" size={16} /></Button>
            <Button as="a" href="#contact" variant="ghost" size="lg">salik@salik.dev</Button>
          </div>
        </div>
        <div className="hero-split-right">
          <ArchitectureDiagramMini />
        </div>
      </div>
    </header>
  );
}

function HeroCentered() {
  return (
    <header id="top" className="hero hero-centered grain" data-screen-label="Hero">
      <div className="container hero-centered-inner">
        <div className="eyebrow center"><span className="dot-available" />Available Q1</div>
        <h1 className="h-display hero-centered-title">
          <RevealText as="span" text="Full stack AI engineer" />
          <br />
          <span className="serif hero-serif-big reveal-word" style={{ animationDelay: '120ms' }}>building for tomorrow.</span>
        </h1>
        <p className="p-lead center" data-reveal style={{ maxWidth: 560, margin: '0 auto' }}>
          Scalable AI systems, modern web apps, and the infrastructure that ships them.
        </p>
        <div className="hero-ctas center" data-reveal>
          <Button as="a" href="#work" variant="primary" size="lg">View work <Icon name="arrow-up-right" size={16} /></Button>
          <Button as="a" href="#contact" variant="secondary" size="lg">Contact</Button>
        </div>
      </div>
    </header>
  );
}

// Tiny architecture diagram used in split hero
function ArchitectureDiagramMini() {
  return (
    <div className="arch-mini">
      <svg viewBox="0 0 400 360" fill="none">
        <defs>
          <marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>
        {/* nodes */}
        <g stroke="currentColor" fill="var(--bg)" strokeWidth="0.8">
          <rect x="20"  y="20"  width="110" height="44" rx="6" />
          <rect x="20"  y="158" width="110" height="44" rx="6" />
          <rect x="20"  y="296" width="110" height="44" rx="6" />
          <rect x="160" y="90"  width="110" height="44" rx="6" />
          <rect x="160" y="228" width="110" height="44" rx="6" />
          <rect x="300" y="158" width="80"  height="44" rx="6" />
        </g>
        <g fill="currentColor" fontFamily="'JetBrains Mono',monospace" fontSize="10" textAnchor="middle">
          <text x="75" y="46">Web</text>
          <text x="75" y="184">Agent</text>
          <text x="75" y="322">Embed</text>
          <text x="215" y="116">Gateway</text>
          <text x="215" y="254">pgvector</text>
          <text x="340" y="184">LLM</text>
        </g>
        {/* edges */}
        <g stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.7" markerEnd="url(#ah)">
          <path d="M130 42 C 145 42, 145 112, 160 112" className="edge-anim" />
          <path d="M130 180 L 160 180 M 160 180 L 160 112" className="edge-anim" />
          <path d="M130 180 L 160 250" className="edge-anim" />
          <path d="M130 318 C 145 318, 145 250, 160 250" className="edge-anim" />
          <path d="M270 112 C 285 112, 285 180, 300 180" className="edge-anim" />
          <path d="M270 250 C 285 250, 285 180, 300 180" className="edge-anim" />
        </g>
        <g fill="currentColor">
          <circle r="3" className="edge-dot" />
        </g>
      </svg>
    </div>
  );
}

Object.assign(window, { Hero, HeroEditorial, HeroSplit, HeroCentered, ArchitectureDiagramMini });
