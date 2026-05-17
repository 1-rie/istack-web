'use client';
import { useState, useEffect } from 'react';

const SITE = 'https://project-9sli3.vercel.app';
const INSTALL_CMD = `curl -fsSL ${SITE}/install | bash`;

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  // Blues
  bgDeep:   '#060d18',   // outermost — very dark navy
  bgMain:   '#0a1628',   // primary sections
  bgPanel:  '#0f2040',   // elevated panels / cards
  bgLight:  '#162d52',   // highlighted sections (light blue bg)
  bgLighter:'#1d3a63',   // even lighter, for hover / alt rows

  // Accents
  blue:     '#3b82f6',
  blueBright:'#60a5fa',
  cyan:     '#67e8f9',
  cyanDim:  '#22d3ee',
  green:    '#4ade80',
  greenDim: '#16a34a',
  yellow:   '#fbbf24',
  red:      '#f87171',
  orange:   '#fb923c',

  // Text
  white:    '#e2f0fb',
  dim:      '#4d7097',
  dim2:     '#7da4c4',

  // Borders
  border:   '#1a3a5c',
  borderBright: '#2a5a8c',

  mono: "'SF Mono','Fira Code','Fira Mono','Roboto Mono',monospace",
};

// ── Skills ────────────────────────────────────────────────────────────────
const SKILLS = [
  { cmd: '/review',          stage: 'REVIEW',   color: '#fbbf24', desc: 'Retain cycles · concurrency · App Store risks'      },
  { cmd: '/plan-eng-review', stage: 'PLAN',     color: '#3b82f6', desc: 'Architecture · state machines · data flow'           },
  { cmd: '/qa-ios',          stage: 'TEST',     color: '#4ade80', desc: 'Build sim · run tests · fix bugs · regression suite' },
  { cmd: '/ship-ios',        stage: 'SHIP',     color: '#f87171', desc: 'Version bump · archive · TestFlight via Fastlane'    },
  { cmd: '/appstore-review', stage: 'SHIP',     color: '#f87171', desc: 'Every rejection reason before Apple sees it'         },
  { cmd: '/design-swiftui',  stage: 'BUILD',    color: '#67e8f9', desc: 'Production SwiftUI — Dark Mode · a11y · all states'  },
  { cmd: '/office-hours',    stage: 'THINK',    color: '#c084fc', desc: 'YC-style product stress-test'                        },
  { cmd: '/onboarding',      stage: 'PLAN',     color: '#3b82f6', desc: 'Paywall narrative · conversion funnel · screen specs' },
  { cmd: '/investigate',     stage: 'DEBUG',    color: '#a78bfa', desc: 'Systematic root-cause analysis + regression test'    },
  { cmd: '/cso-ios',         stage: 'SECURITY', color: '#fb923c', desc: 'OWASP Mobile Top 10 full audit'                      },
];

// ── Terminal frames ────────────────────────────────────────────────────────
const FRAMES = [
  { prompt: '/review', lines: [
    { c: T.dim2,   t: '  Scanning git diff main…HEAD (3 files changed)' },
    { c: T.yellow, t: '  ⚠  ContentView.swift:42  retain cycle — closure captures self strongly' },
    { c: T.yellow, t: '  ⚠  NetworkManager.swift:91  missing [weak self] in escaping closure' },
    { c: T.dim2,   t: '  ─────────────────────────────────────────────────' },
    { c: T.green,  t: '  ✓  3 files reviewed · 2 issues found · 0 App Store risks' },
    { c: T.cyan,   t: '  →  run /qa-ios to validate the fix' },
  ]},
  { prompt: '/plan-eng-review', lines: [
    { c: T.dim2,   t: '  Reading manifest.json + PRODUCT.md…' },
    { c: T.cyan,   t: '  ◆  Architecture: MVVM + @Observable (SwiftUI 5)' },
    { c: T.white,  t: '  ├── NavigationStack → HomeView → DetailView' },
    { c: T.white,  t: '  ├── UserStore (@Observable singleton)' },
    { c: T.white,  t: '  └── Persistence: SwiftData + iCloud sync' },
    { c: T.green,  t: '  ✓  Plan written → .iStack/plans/2026-05-16.md' },
  ]},
  { prompt: '/qa-ios', lines: [
    { c: T.dim2,   t: '  Building on iPhone 16 Pro (simulator)…' },
    { c: T.green,  t: '  ✓  Build succeeded in 14.2s' },
    { c: T.dim2,   t: '  Running test suite (47 tests)…' },
    { c: T.red,    t: '  ✗  UserStoreTests.testLogin — assertion failed' },
    { c: T.cyan,   t: '  ◆  Fixing: missing async context in setUp()' },
    { c: T.green,  t: '  ✓  47/47 tests pass · coverage 84%' },
  ]},
];

// ── Feature list ──────────────────────────────────────────────────────────
const FEATURES = [
  { flag: '--zero-friction',  val: 'true',  desc: 'One curl, self-contained binary. No Node, Python, Homebrew.' },
  { flag: '--byok',           val: 'true',  desc: 'Anthropic · OpenAI · Gemini. We never touch your code.' },
  { flag: '--encrypted',      val: 'aes-256', desc: 'Skills decrypted in RAM only. Never written to disk.' },
  { flag: '--ai-agnostic',    val: 'true',  desc: 'Switch provider in seconds from the login prompt.' },
  { flag: '--platform',       val: 'ios',   desc: 'SwiftUI · Xcode 15+ · App Store. Depth, not breadth.' },
  { flag: '--pipeline',       val: 'full',  desc: 'think → plan → build → review → test → ship → retro' },
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [frame, setFrame]   = useState(0);
  const [line, setLine]     = useState(0);
  const [time, setTime]     = useState('');

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Rotate terminal frames
  useEffect(() => {
    const cur = FRAMES[frame];
    if (line < cur.lines.length) {
      const t = setTimeout(() => setLine(l => l + 1), 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setFrame(f => (f + 1) % FRAMES.length);
      setLine(0);
    }, 2800);
    return () => clearTimeout(t);
  }, [frame, line]);

  function copy() {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const cur = FRAMES[frame]!;

  return (
    <div style={{ fontFamily: T.mono, color: T.white, background: T.bgDeep, minHeight: '100vh' }}>

      {/* ══════════════════════════════════════════════════════════
          GLOBAL TERMINAL CHROME — top window bar
      ══════════════════════════════════════════════════════════ */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: T.bgPanel,
        borderBottom: `1px solid ${T.border}`,
      }}>
        {/* Title bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', height: 38,
          borderBottom: `1px solid ${T.border}`,
          background: T.bgDeep,
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            {['#ff5f57','#febc2e','#28c840'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, flexShrink: 0 }} />
            ))}
            <span style={{ marginLeft: 16, color: T.dim, fontSize: 11 }}>istack — v1.0.0</span>
          </div>
          <div style={{ color: T.dim, fontSize: 11 }}>
            <span style={{ color: T.cyan }}>istack.dev</span>
            {time && <span style={{ marginLeft: 20 }}>{time}</span>}
          </div>
          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <a href="mailto:gregoire@teech-golf.com" style={{
              color: T.dim2, fontSize: 11, textDecoration: 'none',
              padding: '3px 10px',
              border: `1px solid ${T.border}`, borderRadius: 3,
            }}>log in</a>
            <a href="mailto:gregoire@teech-golf.com?subject=iStack CLI License" style={{
              color: T.bgDeep, fontSize: 11, fontWeight: 700, textDecoration: 'none',
              padding: '3px 10px', background: T.cyan,
              borderRadius: 3,
            }}>get license →</a>
          </div>
        </div>

        {/* Tab bar / nav */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 0,
          padding: '0 20px', height: 36,
          fontSize: 12,
        }}>
          <span style={{ color: T.green, marginRight: 12 }}>●</span>
          <span style={{ color: T.dim2, marginRight: 4 }}>istack</span>
          <span style={{ color: T.dim }}>~</span>
          <span style={{ color: T.dim, margin: '0 4px' }}>$</span>
          <span style={{ color: T.white, marginRight: 32 }}>istack --help</span>
          <div style={{ display: 'flex', gap: 0, marginLeft: 'auto' }}>
            {[
              { key: 'S', label: 'skills',  href: '#skills'   },
              { key: 'I', label: 'install', href: '#install'  },
              { key: 'P', label: 'pricing', href: '#pricing'  },
            ].map(n => (
              <a key={n.key} href={n.href} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '0 14px', height: 36, textDecoration: 'none',
                fontSize: 11, color: T.dim2,
                borderLeft: `1px solid ${T.border}`,
              }}>
                <span style={{
                  color: T.dim, border: `1px solid ${T.border}`,
                  borderRadius: 2, padding: '0 3px', fontSize: 9,
                }}>{n.key}</span>
                {n.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          HERO — dark section (bgMain)
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: T.bgMain, borderBottom: `1px solid ${T.border}`, padding: '64px 40px 72px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          {/* Prompt line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28, fontSize: 12 }}>
            <span style={{ color: T.greenDim }}>greg@macbook</span>
            <span style={{ color: T.dim }}>:</span>
            <span style={{ color: T.blue }}>~/projects/my-app</span>
            <span style={{ color: T.dim }}>$</span>
            <span style={{ color: T.white }}>istack</span>
          </div>

          {/* Big headline as terminal output */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 11, color: T.dim, marginBottom: 8 }}>
              {'# ─────────────────────────────────────────────────────────'}
            </div>
            <div style={{ fontSize: 'clamp(32px,5.5vw,64px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -1, color: T.white }}>
              The CLI for iOS engineers.
            </div>
            <div style={{ fontSize: 11, color: T.dim, marginTop: 8 }}>
              {'# ─────────────────────────────────────────────────────────'}
            </div>
          </div>

          <div style={{ marginBottom: 40, fontSize: 14, color: T.dim2, lineHeight: 1.8, maxWidth: 600 }}>
            <span style={{ color: T.cyan }}># </span>
            29 AI-powered skills for architecture, code review,<br />
            <span style={{ color: T.cyan }}># </span>
            QA and App Store shipping — running locally,<br />
            <span style={{ color: T.cyan }}># </span>
            your keys, your code.
          </div>

          {/* Install box */}
          <div id="install" style={{
            background: T.bgDeep,
            border: `1px solid ${T.borderBright}`,
            borderRadius: 6, overflow: 'hidden',
            display: 'inline-block', maxWidth: '100%',
          }}>
            <div style={{
              padding: '6px 14px', fontSize: 10,
              background: T.bgPanel, borderBottom: `1px solid ${T.border}`,
              color: T.dim,
            }}>
              # install — paste this in your terminal
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px' }}>
              <span style={{ color: T.green, fontSize: 13 }}>$</span>
              <code style={{ color: T.cyan, fontSize: 13, flex: 1, wordBreak: 'break-all' }}>
                {INSTALL_CMD}
              </code>
              <button onClick={copy} style={{
                background: copied ? T.green : T.bgPanel,
                border: `1px solid ${copied ? T.green : T.border}`,
                color: copied ? '#000' : T.dim2,
                borderRadius: 4, padding: '4px 12px',
                cursor: 'pointer', fontSize: 11, fontFamily: T.mono,
                flexShrink: 0, transition: 'all .15s',
              }}>
                {copied ? '✓ copied' : 'copy'}
              </button>
            </div>
          </div>

          <div style={{ marginTop: 12, fontSize: 11, color: T.dim }}>
            <span style={{ color: T.dim }}>{'> '}</span>
            macOS arm64 · macOS x64 · Linux arm64 · Linux x64 — no runtime required
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TERMINAL DEMO — light blue section (bgLight)
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: T.bgLight, borderBottom: `1px solid ${T.border}`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <div style={{ marginBottom: 28 }}>
            <span style={{ color: T.dim, fontSize: 12 }}>
              {'# ── DEMO ── watch iStack work ─────────────────────────────'}
            </span>
          </div>

          {/* Terminal window */}
          <div style={{
            background: T.bgDeep,
            border: `1px solid ${T.border}`,
            borderRadius: 8, overflow: 'hidden',
            boxShadow: `0 32px 64px rgba(0,0,0,.5)`,
          }}>
            {/* Window bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 16px', borderBottom: `1px solid ${T.border}`,
              background: T.bgPanel,
            }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: 12, fontSize: 11, color: T.dim }}>
                istack — {cur.prompt}
              </span>
            </div>
            {/* Terminal body */}
            <div style={{ padding: '20px 24px', minHeight: 196, fontSize: 13, lineHeight: 2 }}>
              <div>
                <span style={{ color: T.greenDim }}>greg@macbook</span>
                <span style={{ color: T.dim }}>:</span>
                <span style={{ color: T.blue }}>~/projects/my-app</span>
                <span style={{ color: T.dim }}>$ </span>
                <span style={{ color: T.white }}>{cur.prompt}</span>
                <span style={{
                  display: 'inline-block', width: 7, height: 14,
                  background: T.white, marginLeft: 2, verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }} />
              </div>
              {cur.lines.slice(0, line).map((l, i) => (
                <div key={i} style={{ color: l.c, whiteSpace: 'pre' }}>{l.t}</div>
              ))}
            </div>
          </div>

          {/* Skill pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
            {FRAMES.map((f, i) => (
              <button key={i} onClick={() => { setFrame(i); setLine(0); }} style={{
                fontFamily: T.mono, fontSize: 11,
                padding: '4px 12px', borderRadius: 3,
                background: frame === i ? T.blue : T.bgPanel,
                border: `1px solid ${frame === i ? T.blue : T.border}`,
                color: frame === i ? '#fff' : T.dim2,
                cursor: 'pointer', transition: 'all .15s',
              }}>
                {f.prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SKILLS TABLE — dark section (bgMain)
      ══════════════════════════════════════════════════════════ */}
      <section id="skills" style={{ background: T.bgMain, borderBottom: `1px solid ${T.border}`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <div style={{ marginBottom: 28, fontSize: 12, color: T.dim }}>
            {'$ istack skills --list'}
          </div>
          <div style={{ marginBottom: 4, fontSize: 12 }}>
            <span style={{ color: T.dim }}>{'  '}</span>
            <span style={{ color: T.cyan }}>COMMAND</span>
            <span style={{ color: T.dim }}>{'               '}STAGE{'     '}</span>
            <span style={{ color: T.dim }}>DESCRIPTION</span>
          </div>
          <div style={{ marginBottom: 2, fontSize: 12, color: T.dim }}>
            {'  ─────────────────────────────────────────────────────────────────────────────'}
          </div>

          {SKILLS.map((s, i) => (
            <div key={s.cmd} style={{
              display: 'grid',
              gridTemplateColumns: '220px 90px 1fr',
              alignItems: 'center', gap: 0,
              padding: '7px 0',
              borderBottom: i < SKILLS.length - 1 ? `1px solid ${T.bgPanel}` : undefined,
              background: i % 2 === 0 ? 'transparent' : `${T.bgPanel}60`,
              paddingLeft: 2,
            }}>
              <code style={{ fontSize: 13, color: T.cyan }}>
                <span style={{ color: T.dim }}>  </span>{s.cmd}
              </code>
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: s.color,
                letterSpacing: 0.5,
              }}>
                [{s.stage}]
              </span>
              <span style={{ fontSize: 12, color: T.dim2 }}>{s.desc}</span>
            </div>
          ))}

          <div style={{ marginTop: 8, fontSize: 12, color: T.dim }}>
            {'  ─────────────────────────────────────────────────────────────────────────────'}
          </div>
          <div style={{ fontSize: 12, color: T.dim, paddingLeft: 2, marginTop: 4 }}>
            {'  '}<span style={{ color: T.dim2 }}>+ 19 more skills</span>{' included with every license'}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES — lighter blue section (bgLighter)
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: T.bgLighter, borderBottom: `1px solid ${T.border}`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <div style={{ marginBottom: 28, fontSize: 12, color: T.dim }}>
            {'$ istack config --show'}
          </div>

          <div style={{ marginBottom: 4, fontSize: 12, color: T.dim }}>
            {'  FLAG                      VALUE        DESCRIPTION'}
          </div>
          <div style={{ marginBottom: 2, fontSize: 12, color: T.dim }}>
            {'  ─────────────────────────────────────────────────────────────────────────────'}
          </div>

          {FEATURES.map((f, i) => (
            <div key={f.flag} style={{
              display: 'grid',
              gridTemplateColumns: '210px 100px 1fr',
              alignItems: 'center', gap: 0,
              padding: '8px 0',
              borderBottom: i < FEATURES.length - 1 ? `1px solid ${T.bgPanel}` : undefined,
              paddingLeft: 2,
            }}>
              <span style={{ fontSize: 13, color: T.blue }}>
                <span style={{ color: T.dim }}>  </span>{f.flag}
              </span>
              <span style={{ fontSize: 12, color: T.green }}>{f.val}</span>
              <span style={{ fontSize: 12, color: T.dim2 }}>{f.desc}</span>
            </div>
          ))}

          <div style={{ marginTop: 8, fontSize: 12, color: T.dim }}>
            {'  ─────────────────────────────────────────────────────────────────────────────'}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PRICING — dark section (bgMain) with bgLight panels
      ══════════════════════════════════════════════════════════ */}
      <section id="pricing" style={{ background: T.bgMain, borderBottom: `1px solid ${T.border}`, padding: '64px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>

          <div style={{ marginBottom: 28, fontSize: 12, color: T.dim }}>
            {'$ istack licenses --list-plans'}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}>
            {[
              {
                name: 'PRO',
                price: 'Contact us',
                prompt: '# plan: pro',
                features: [
                  { k: '--skills',    v: '29 iOS skills'         },
                  { k: '--providers', v: 'all (BYOK)'            },
                  { k: '--seats',     v: '1'                     },
                  { k: '--encrypted', v: 'aes-256'               },
                  { k: '--support',   v: 'email'                 },
                ],
                cta: '$ istack license --plan pro',
                primary: false,
              },
              {
                name: 'TEAM',
                price: 'Contact us',
                prompt: '# plan: team (recommended)',
                features: [
                  { k: '--skills',    v: '29 iOS skills + custom' },
                  { k: '--providers', v: 'all (BYOK)'             },
                  { k: '--seats',     v: 'up to 10'               },
                  { k: '--tokens',    v: 'autonomous mode'         },
                  { k: '--support',   v: 'priority'               },
                ],
                cta: '$ istack license --plan team',
                primary: true,
              },
            ].map(p => (
              <div key={p.name} style={{
                background: p.primary ? T.bgLight : T.bgPanel,
                border: `1px solid ${p.primary ? T.borderBright : T.border}`,
                borderRadius: 6, overflow: 'hidden',
              }}>
                {/* Panel header */}
                <div style={{
                  padding: '10px 20px',
                  borderBottom: `1px solid ${p.primary ? T.borderBright : T.border}`,
                  background: p.primary ? T.bgLighter : T.bgDeep,
                  fontSize: 11, color: T.dim,
                }}>
                  {p.prompt}
                </div>
                <div style={{ padding: '24px 20px' }}>
                  <div style={{ fontSize: 11, color: p.primary ? T.cyan : T.dim2, marginBottom: 4, letterSpacing: 1 }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, color: T.white }}>
                    {p.price}
                  </div>
                  {p.features.map(f => (
                    <div key={f.k} style={{
                      display: 'flex', gap: 0,
                      marginBottom: 8, fontSize: 12,
                    }}>
                      <span style={{ color: T.blue, width: 130, flexShrink: 0 }}>{f.k}</span>
                      <span style={{ color: T.green }}>{f.v}</span>
                    </div>
                  ))}
                  <a href="mailto:gregoire@teech-golf.com?subject=iStack CLI License" style={{
                    display: 'block', marginTop: 28,
                    padding: '10px 16px', borderRadius: 4,
                    textDecoration: 'none', fontSize: 12,
                    background: p.primary ? T.cyan : T.bgDeep,
                    color: p.primary ? T.bgDeep : T.dim2,
                    border: `1px solid ${p.primary ? T.cyan : T.border}`,
                    fontWeight: p.primary ? 700 : 400,
                    textAlign: 'center',
                  }}>
                    {p.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER — bgDeep
      ══════════════════════════════════════════════════════════ */}
      <footer style={{
        background: T.bgDeep,
        borderTop: `1px solid ${T.border}`,
        padding: '24px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 12,
      }}>
        <div style={{ color: T.dim }}>
          <span style={{ color: T.cyan }}>iStack</span>
          {' '}
          <span style={{ fontFamily: "'Georgia',serif", color: T.cyan, fontSize: 15 }}>1′</span>
          {' '}<span style={{ color: T.dim }}>—</span>{' '}
          made by <span style={{ color: T.white }}>imprimerie</span>
        </div>
        <div style={{ color: T.dim, display: 'flex', gap: 24, alignItems: 'center' }}>
          <a href="mailto:gregoire@teech-golf.com" style={{ color: T.dim, textDecoration: 'none' }}>contact</a>
          <span style={{ color: T.dim2 }}>project-9sli3.vercel.app</span>
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        * { box-sizing: border-box; }
        ::selection { background: ${T.blue}44; }
        html { scroll-behavior: smooth; }
        a:hover { opacity: .75; }
      `}</style>
    </div>
  );
}
