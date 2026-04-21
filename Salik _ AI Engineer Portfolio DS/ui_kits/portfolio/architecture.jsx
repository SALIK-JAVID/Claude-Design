/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Architecture — live animated diagram (nodes + edges)
// ============================================================
function Architecture() {
  const svgRef = useRef(null);

  useEffect(() => {
    // Animate data flowing along paths
    const paths = svgRef.current?.querySelectorAll('.flow-path');
    paths?.forEach((p, i) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len * 0.08} ${len}`;
      p.style.animation = `dash-flow ${2.4 + i * 0.3}s linear ${i * 0.25}s infinite`;
    });
  }, []);

  return (
    <div className="arch-diagram" data-reveal>
      <svg ref={svgRef} viewBox="0 0 1040 520" fill="none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow-sm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
          </marker>
        </defs>

        {/* Layer labels */}
        <g fill="var(--fg-subtle)" fontFamily="'JetBrains Mono',monospace" fontSize="10" letterSpacing="2">
          <text x="20" y="40">CLIENT</text>
          <text x="20" y="200">GATEWAY</text>
          <text x="20" y="340">AI LAYER</text>
          <text x="20" y="480">DATA</text>
        </g>

        {/* Client nodes */}
        <ArchNode x={180} y={20} w={150} h={48} label="Web app" sub="Next.js · edge" />
        <ArchNode x={360} y={20} w={150} h={48} label="Mobile" sub="React Native" />
        <ArchNode x={540} y={20} w={150} h={48} label="CLI / SDK" sub="typed" />
        <ArchNode x={720} y={20} w={150} h={48} label="Webhooks" sub="partners" />

        {/* Gateway */}
        <ArchNode x={180} y={180} w={330} h={56} label="API Gateway" sub="tRPC · auth · rate-limit" tall />
        <ArchNode x={540} y={180} w={330} h={56} label="Task orchestration" sub="Temporal · queues" tall />

        {/* AI layer */}
        <ArchNode x={180} y={320} w={200} h={56} label="Agent runtime" sub="tool use · memory" tall />
        <ArchNode x={400} y={320} w={200} h={56} label="RAG pipeline" sub="chunk · embed · rerank" tall />
        <ArchNode x={620} y={320} w={250} h={56} label="LLM proxy" sub="fallback · cache · eval" tall />

        {/* Data */}
        <ArchNode x={180} y={460} w={180} h={40} label="Postgres" sub="source of truth" />
        <ArchNode x={380} y={460} w={180} h={40} label="pgvector" sub="embeddings" />
        <ArchNode x={580} y={460} w={180} h={40} label="Object store" sub="S3 · R2" />
        <ArchNode x={780} y={460} w={180} h={40} label="Observability" sub="traces · evals" />

        {/* Flow edges */}
        <g stroke="var(--fg-subtle)" strokeWidth="0.7" fill="none" markerEnd="url(#arrow-sm)">
          <path d="M255 68 L 345 180" className="edge" />
          <path d="M435 68 L 345 180" className="edge" />
          <path d="M615 68 L 705 180" className="edge" />
          <path d="M795 68 L 705 180" className="edge" />
          <path d="M345 236 L 280 320" className="edge" />
          <path d="M705 236 L 500 320" className="edge" />
          <path d="M705 236 L 745 320" className="edge" />
          <path d="M280 376 L 270 460" className="edge" />
          <path d="M500 376 L 470 460" className="edge" />
          <path d="M745 376 L 670 460" className="edge" />
          <path d="M745 376 L 870 460" className="edge" />
        </g>

        {/* Animated flow highlight (pulse) */}
        <g stroke="var(--fg)" strokeWidth="1.5" fill="none" opacity="0.9">
          <path className="flow-path" d="M255 68 L 345 180 L 280 320 L 470 460" />
          <path className="flow-path" d="M615 68 L 705 180 L 745 320 L 870 460" />
          <path className="flow-path" d="M435 68 L 345 180 L 500 320 L 270 460" />
        </g>

        {/* Labeled annotations */}
        <g fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="var(--fg-subtle)">
          <text x="235" y="128">request</text>
          <text x="400" y="296">context</text>
          <text x="750" y="296">llm call</text>
          <text x="290" y="432">write</text>
          <text x="750" y="432">trace</text>
        </g>
      </svg>

      <div className="arch-legend">
        <span><span className="legend-dot pulse" /> live request</span>
        <span><span className="legend-dot" /> service edge</span>
        <kbd>⌘</kbd><kbd>D</kbd> <span className="legend-hint">inspect</span>
      </div>
    </div>
  );
}

function ArchNode({ x, y, w, h, label, sub, tall }) {
  return (
    <g className="arch-node">
      <rect x={x} y={y} width={w} height={h} rx="6" fill="var(--bg)" stroke="var(--border-strong)" strokeWidth="0.7" />
      <text x={x + 14} y={y + (tall ? 24 : 20)} fontFamily="Inter,sans-serif" fontSize="12" fontWeight="600" fill="var(--fg)">{label}</text>
      <text x={x + 14} y={y + (tall ? 42 : 35)} fontFamily="'JetBrains Mono',monospace" fontSize="9" fill="var(--fg-subtle)">{sub}</text>
      <circle cx={x + w - 12} cy={y + 12} r="2" fill="var(--success)" className="node-pulse" />
    </g>
  );
}

Object.assign(window, { Architecture, ArchNode });
