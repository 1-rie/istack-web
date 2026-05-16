'use client';
import { useState } from 'react';

const C = {
  cyan:   '#06b6d4',
  green:  '#22c55e',
  yellow: '#eab308',
  dim:    '#6b7280',
  border: '#1f2937',
  card:   '#111827',
  white:  '#f9fafb',
};

const INSTALL_CMD = 'curl -fsSL https://istack.dev/install | bash';

const FEATURES = [
  {
    icon: '⚡',
    title: 'Zero friction install',
    desc: 'One curl command. No Node, no Python, no Homebrew required. A single self-contained binary drops into your PATH.',
  },
  {
    icon: '🔐',
    title: 'Your key, your data',
    desc: 'BYOK — bring your own Anthropic, OpenAI or Gemini API key. We never see your code or your tokens.',
  },
  {
    icon: '🧠',
    title: '29 iOS-specialized skills',
    desc: '/review, /plan-eng-review, /qa-ios, /ship-ios and more. Each skill encodes years of iOS craftsmanship.',
  },
  {
    icon: '🛡',
    title: 'IP fully protected',
    desc: 'Skills are AES-256 encrypted and decrypted only in RAM. They never exist as plaintext on your machine.',
  },
  {
    icon: '🤖',
    title: 'AI agnostic',
    desc: 'Claude, GPT-4o, or Gemini — switch provider and model in seconds from the interactive login.',
  },
  {
    icon: '🍎',
    title: 'Native iOS only',
    desc: 'Built for SwiftUI, Xcode 15+, App Store submissions. No generic advice — this knows the platform.',
  },
];

const SKILLS = [
  ['/review',           'Catch retain cycles, concurrency bugs, App Store risks'],
  ['/plan-eng-review',  'Architecture, state machines, data flow diagrams'],
  ['/qa-ios',           'Build on simulator, run tests, fix bugs, regression tests'],
  ['/ship-ios',         'Version bump, archive, TestFlight via Fastlane'],
  ['/appstore-review',  'Every rejection reason caught before Apple does'],
  ['/design-swiftui',   'Production SwiftUI — Dark Mode, Dynamic Type, a11y'],
  ['/office-hours',     'YC partner mode — stress-test your product idea'],
  ['/onboarding',       'Paywall narrative, conversion funnel, screen contracts'],
];

export default function Home() {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>

      {/* ── Nav ── */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 0', borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <span style={{ color: C.cyan, fontWeight: 700, fontSize: 20 }}>iStack</span>
          <span style={{ color: C.dim, fontSize: 12 }}>by imprimerie</span>
        </div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13, color: C.dim }}>
          <a href="#features" style={{ color: C.dim, textDecoration: 'none' }}>Features</a>
          <a href="#skills"   style={{ color: C.dim, textDecoration: 'none' }}>Skills</a>
          <a href="#install"  style={{ color: C.dim, textDecoration: 'none' }}>Install</a>
          <a href="mailto:gregoire@teech-golf.com"
             style={{ color: C.cyan, textDecoration: 'none' }}>Get a license →</a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: '80px 0 64px', textAlign: 'center' }}>

        {/* Big "1'" logo */}
        <div style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: 96,
          fontWeight: 700,
          lineHeight: 1,
          color: C.white,
          marginBottom: 8,
          letterSpacing: -4,
        }}>
          1<span style={{ color: C.cyan }}>′</span>
        </div>

        <div style={{ color: C.dim, fontSize: 12, marginBottom: 48, letterSpacing: 2 }}>
          MADE BY IMPRIMERIE
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          margin: '0 0 16px',
          color: C.white,
          letterSpacing: -1,
        }}>
          The AI CLI for iOS builders
        </h1>

        <p style={{
          fontSize: 18, color: C.dim, maxWidth: 560, margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          29 specialized skills for architecture, code review, QA, App Store submission
          and shipping — running locally, your keys, your code.
        </p>

        {/* Install command */}
        <div id="install" style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: '20px 28px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 20,
          maxWidth: '100%',
        }}>
          <span style={{ color: C.dim, userSelect: 'none' }}>$</span>
          <code style={{ color: C.green, fontSize: 15, flex: 1, textAlign: 'left' }}>
            {INSTALL_CMD}
          </code>
          <button
            onClick={copy}
            style={{
              background: copied ? C.green : 'transparent',
              border: `1px solid ${copied ? C.green : C.border}`,
              color: copied ? '#000' : C.dim,
              borderRadius: 6,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: 'inherit',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <p style={{ color: C.dim, fontSize: 12, marginTop: 16 }}>
          macOS Apple Silicon · macOS Intel · Linux ARM64 · Linux x64
        </p>
      </section>

      {/* ── Terminal preview ── */}
      <section style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: '24px 28px',
        marginBottom: 80,
        fontSize: 13,
        lineHeight: 1.8,
      }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
          ))}
          <span style={{ color: C.dim, marginLeft: 8, fontSize: 12 }}>iStack CLI v1.0.0</span>
        </div>

        <div style={{ color: C.dim }}>
          <span style={{ color: C.cyan }}>◆  iStack</span> — iOS AI Builder
        </div>
        <div style={{ color: C.dim, marginTop: 4 }}>
          Type <span style={{ color: C.white }}>/help</span> for skills  ·  /exit to quit
        </div>
        <div style={{ marginTop: 16 }}>
          <span style={{ color: C.green }}>▶  </span>
          <span style={{ color: C.white }}>/review</span>
        </div>
        <div style={{ color: C.cyan, marginTop: 8 }}>◆  iStack</div>
        <div style={{ color: C.dim, marginTop: 4 }}>
          Running code review on <span style={{ color: C.white }}>git diff main…HEAD</span>…
        </div>
        <div style={{ marginTop: 8 }}>
          <span style={{ color: C.yellow }}>⚠</span>
          {'  '}
          <span style={{ color: C.white }}>ContentView.swift:42</span>
          <span style={{ color: C.dim }}> — potential retain cycle: </span>
          <span style={{ color: C.white }}>closure captures self strongly</span>
        </div>
        <div style={{ marginTop: 4 }}>
          <span style={{ color: C.green }}>✓</span>
          {'  '}
          <span style={{ color: C.dim }}>3 files reviewed  ·  1 issue found  ·  0 App Store risks</span>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" style={{ marginBottom: 80 }}>
        <h2 style={{ color: C.white, fontSize: 28, fontWeight: 700, marginBottom: 40, textAlign: 'center' }}>
          Built different
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20,
        }}>
          {FEATURES.map(f => (
            <div key={f.title} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '24px',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ color: C.white, fontWeight: 600, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: C.dim, fontSize: 13, lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" style={{ marginBottom: 80 }}>
        <h2 style={{ color: C.white, fontSize: 28, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          29 skills. One pipeline.
        </h2>
        <p style={{ color: C.dim, textAlign: 'center', marginBottom: 40, fontSize: 14 }}>
          Think → Plan → Build → Review → Test → Ship → Reflect
        </p>
        <div style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {SKILLS.map(([cmd, desc], i) => (
            <div key={cmd} style={{
              display: 'flex', alignItems: 'center', gap: 20,
              padding: '16px 24px',
              borderBottom: i < SKILLS.length - 1 ? `1px solid ${C.border}` : undefined,
            }}>
              <code style={{ color: C.cyan, minWidth: 200, fontSize: 13 }}>{cmd}</code>
              <span style={{ color: C.dim, fontSize: 13 }}>{desc}</span>
            </div>
          ))}
          <div style={{ padding: '16px 24px', color: C.dim, fontSize: 13 }}>
            + 21 more skills included with every license…
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        textAlign: 'center',
        padding: '64px 0',
        borderTop: `1px solid ${C.border}`,
        marginBottom: 64,
      }}>
        <h2 style={{ color: C.white, fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          Ready to ship faster?
        </h2>
        <p style={{ color: C.dim, marginBottom: 32 }}>
          Get a license key and start using iStack CLI today.
        </p>
        <a
          href="mailto:gregoire@teech-golf.com?subject=iStack CLI License"
          style={{
            display: 'inline-block',
            background: C.cyan,
            color: '#000',
            fontWeight: 700,
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 15,
            fontFamily: 'inherit',
          }}
        >
          Get a license →
        </a>
      </section>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        padding: '32px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
        color: C.dim,
      }}>
        <div>
          <span style={{ color: C.cyan }}>iStack</span>
          {' '}· Made by{' '}
          <span style={{ color: C.white }}>imprimerie</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="mailto:gregoire@teech-golf.com" style={{ color: C.dim, textDecoration: 'none' }}>
            Contact
          </a>
          <span>istack.dev</span>
        </div>
      </footer>

    </main>
  );
}
