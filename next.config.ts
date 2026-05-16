import type { NextConfig } from 'next';

const config: NextConfig = {
  // Serve install.sh with correct content-type for curl | bash
  async headers() {
    return [
      {
        source: '/install',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ];
  },
  async rewrites() {
    return [
      // /install → /install.sh file in public/
      { source: '/install', destination: '/install.sh' },
    ];
  },
};

export default config;
