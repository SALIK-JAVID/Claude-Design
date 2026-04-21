/* global React */
const { useState, useEffect, useRef, useCallback } = React;

// ============================================================
// Magnetic Cursor — follows pointer, grows on [data-magnetic]
// ============================================================
function MagneticCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100, tx: -100, ty: -100, scale: 1, tscale: 1 });
  const rafRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      posRef.current.tx = e.clientX;
      posRef.current.ty = e.clientY;
      const t = e.target.closest('[data-magnetic]');
      if (t) {
        const r = t.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d = Math.hypot(dx, dy);
        if (d < 80) {
          posRef.current.tx = cx + dx * 0.25;
          posRef.current.ty = cy + dy * 0.25;
          posRef.current.tscale = 3.5;
        } else posRef.current.tscale = 1;
      } else posRef.current.tscale = 1;
    };

    const onDown = () => posRef.current.tscale = 0.6;
    const onUp = () => posRef.current.tscale = 1;

    const tick = () => {
      const p = posRef.current;
      p.x += (p.tx - p.x) * 0.22;
      p.y += (p.ty - p.y) * 0.22;
      p.scale += (p.tscale - p.scale) * 0.2;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${p.x - 3}px, ${p.y - 3}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${p.x - 16}px, ${p.y - 16}px, 0) scale(${p.scale})`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

// ============================================================
// Scroll reveal — IntersectionObserver, one-shot fade-up
// ============================================================
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.revealed)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ============================================================
// Staggered word-by-word text reveal
// ============================================================
function RevealText({ text, as: Tag = 'span', delay = 0, stagger = 40, className = '' }) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="reveal-word" style={{ animationDelay: `${delay + i * stagger}ms` }}>
          {w}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  );
}

// ============================================================
// Button, Badge, Chip, Icon
// ============================================================
function Button({ variant = 'primary', size = 'md', children, magnetic = true, onClick, as: As = 'button', ...rest }) {
  const cls = `btn btn-${variant} btn-${size}`;
  return <As className={cls} data-magnetic={magnetic ? '' : undefined} onClick={onClick} {...rest}>{children}</As>;
}

function Badge({ children, variant = 'default' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

function Chip({ children }) { return <span className="chip">{children}</span>; }

function Icon({ name, size = 16 }) {
  useEffect(() => { if (window.lucide) window.lucide.createIcons(); });
  // Brand icons (not in core Lucide) — inline SVG
  const brand = {
    github: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.3v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3',
    linkedin: 'M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9h3v10Zm-1.5-11a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-5c0-1-.4-1.6-1.3-1.6-.9 0-1.4.6-1.6 1.1-.1.2-.1.5-.1.7V19h-3s0-8.6 0-9.5h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.4 1.3 3.4 4v5.7Z',
    twitter: 'M18.9 2H22l-7.3 8.4L23 22h-6.8l-5.3-7-6.1 7H1.7l7.9-9L1 2h6.9l4.8 6.4L18.9 2Zm-1.2 18h1.9L6.4 4H4.4l13.3 16Z',
  };
  if (brand[name]) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <path d={brand[name]} />
      </svg>
    );
  }
  return <i data-lucide={name} style={{ width: size, height: size }} />;
}

// ============================================================
// Section — eyebrow + title wrapper
// ============================================================
function Section({ id, eyebrow, title, subtitle, children, index }) {
  return (
    <section id={id} className="section" data-screen-label={eyebrow || title}>
      <div className="container">
        <div className="section-head">
          {eyebrow && (
            <div className="eyebrow" data-reveal>
              {index && <span className="section-idx">{index}</span>}
              {eyebrow}
            </div>
          )}
          {title && <RevealText as="h2" className="h2" text={title} />}
          {subtitle && <p className="p-lead" data-reveal style={{ maxWidth: 640 }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

Object.assign(window, { MagneticCursor, useReveal, RevealText, Button, Badge, Chip, Icon, Section });
