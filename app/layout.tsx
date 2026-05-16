import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iStack CLI — iOS AI Builder',
  description: 'The AI-powered CLI for shipping native iOS apps. Built by imprimerie.',
  metadataBase: new URL('https://istack.dev'),
  openGraph: {
    title: 'iStack CLI',
    description: 'The AI-powered CLI for shipping native iOS apps.',
    url: 'https://istack.dev',
    siteName: 'iStack',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body style={{
        margin: 0,
        background: '#0a0a0a',
        color: '#e5e5e5',
        fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace",
        lineHeight: 1.6,
      }}>
        {children}
      </body>
    </html>
  );
}
