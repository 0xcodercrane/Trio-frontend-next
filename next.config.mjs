/** @type {import('next').NextConfig} */

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public'
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com'
      },
      {
        protocol: 'https',
        hostname: 'ordinalsbot-prod.s3.amazonaws.com'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/mint/inners',
        destination: 'https://ordinalsbot.com/mint/inners?featured=true&trio=true',
        permanent: true
      }
    ];
  }
};

export default withPWA(nextConfig);
