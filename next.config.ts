import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Other Next.js configuration options can go here

    async rewrites() {
        return [
            {
                source: '/payload',
                destination: 'http://localhost:45000/payload',
            },
        ];
    },
};

export default nextConfig;
