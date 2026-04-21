/* global React */
const { useState, useEffect, useRef } = React;

// ============================================================
// Nav — sticky, backdrop-blur, ⌘K trigger, theme toggle
// ============================================================
function Nav({ onOpenPalette, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('work');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = ['work', 'architecture', 'skills', 'services', 'experience', 'contact'];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => { const el = document.getElementById(s); if (el) io.observe(el); });

    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  const links = [
    ['work', 'Work'],
    ['architecture', 'System'],
    ['skills', 'Skills'],
    ['services', 'Services'],
    ['experience', 'Experience'],
  ];

  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo" data-magnetic>
          <span className="nav-mark">S/</span>
          <span className="nav-name">salik<span className="t">.dev</span></span>
        </a>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={`nav-link ${active === id ? 'is-active' : ''}`}>{label}</a>
          ))}
        </div>
        <div className="nav-right">
          <button className="cmdk-trigger" onClick={onOpenPalette} data-magnetic>
            <Icon name="search" size={14} />
            <span>Search</span>
            <kbd>⌘K</kbd>
          </button>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme" data-magnetic>
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
          </button>
          <a href="#contact" className="btn btn-primary btn-sm nav-cta" data-magnetic>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

// ============================================================
// Command Palette — ⌘K, keyboard nav, fake search
// ============================================================
const PALETTE_ITEMS = [
  { group: 'Go to', icon: 'arrow-right', label: 'Hero', hint: 'G H', anchor: '#top' },
  { group: 'Go to', icon: 'briefcase', label: 'Selected work', hint: 'G W', anchor: '#work' },
  { group: 'Go to', icon: 'git-branch', label: 'System design', hint: 'G A', anchor: '#architecture' },
  { group: 'Go to', icon: 'sparkles', label: 'Skills', hint: 'G S', anchor: '#skills' },
  { group: 'Go to', icon: 'hand-coins', label: 'Services', hint: 'G V', anchor: '#services' },
  { group: 'Go to', icon: 'clock', label: 'Experience', hint: 'G X', anchor: '#experience' },
  { group: 'Go to', icon: 'mail', label: 'Contact', hint: 'G C', anchor: '#contact' },
  { group: 'Actions', icon: 'moon', label: 'Toggle theme', hint: 'T', action: 'theme' },
  { group: 'Actions', icon: 'copy', label: 'Copy email', hint: 'E', action: 'email' },
  { group: 'Actions', icon: 'file-down', label: 'Download resume', hint: 'R', action: 'resume' },
  { group: 'Social', icon: 'github', label: 'GitHub — @salikjavid', external: 'https://github.com' },
  { group: 'Social', icon: 'linkedin', label: 'LinkedIn', external: 'https://linkedin.com' },
  { group: 'Social', icon: 'twitter', label: 'X / Twitter', external: 'https://x.com' },
];

function CommandPalette({ open, onClose, onAction }) {
  const [q, setQ] = useState('');
  const [i, setI] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const filtered = PALETTE_ITEMS.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) { setQ(''); setI(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setI((p) => Math.min(p + 1, filtered.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setI((p) => Math.max(p - 1, 0)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        const item = filtered[i];
        if (!item) return;
        if (item.anchor) { document.querySelector(item.anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); onClose(); }
        else if (item.action) { onAction?.(item.action); onClose(); }
        else if (item.external) { window.open(item.external, '_blank'); onClose(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, i, filtered, onAction, onClose]);

  useEffect(() => {
    const row = listRef.current?.querySelector(`[data-idx="${i}"]`);
    row?.scrollIntoView({ block: 'nearest' });
  }, [i]);

  if (!open) return null;

  const groups = filtered.reduce((acc, it, idx) => {
    (acc[it.group] ||= []).push({ ...it, _idx: idx });
    return acc;
  }, {});

  return (
    <div className="palette-backdrop" onClick={onClose}>
      <div className="palette" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <div className="palette-input-row">
          <Icon name="search" size={16} />
          <input
            ref={inputRef}
            className="palette-input"
            placeholder="Type a command or search…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setI(0); }}
          />
          <kbd>esc</kbd>
        </div>
        <div className="palette-list" ref={listRef}>
          {Object.keys(groups).length === 0 && (
            <div className="palette-empty">No results for "{q}"</div>
          )}
          {Object.entries(groups).map(([group, items]) => (
            <div key={group} className="palette-group">
              <div className="palette-group-label">{group}</div>
              {items.map((it) => (
                <button
                  key={it.label}
                  data-idx={it._idx}
                  className={`palette-row ${it._idx === i ? 'is-active' : ''}`}
                  onMouseEnter={() => setI(it._idx)}
                  onClick={() => {
                    if (it.anchor) { document.querySelector(it.anchor)?.scrollIntoView({ behavior: 'smooth' }); onClose(); }
                    else if (it.action) { onAction?.(it.action); onClose(); }
                    else if (it.external) { window.open(it.external, '_blank'); onClose(); }
                  }}
                >
                  <Icon name={it.icon} size={14} />
                  <span className="palette-row-label">{it.label}</span>
                  <span className="palette-row-hint">{it.hint || ''}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="palette-footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Nav, CommandPalette, PALETTE_ITEMS });
