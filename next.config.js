/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    env: {
        API_URL: process.env.API_URL,      
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET, 
    },
    images: {
        domains: [
            '127.0.0.1',
        ],
    },
    
    // redirects() {
    //     return [
    //         {
    //             source: '/:path((?!maintenance).*)',
    //             destination: '/maintenance',
    //             permanent: false,
    //         },
    //     ];
    //     return [
    //         process.env.MAINTENANCE_MODE === "1"
    //             ? { source: "/((?!maintenance).*)", destination: "/maintenance.html", permanent: false }
    //             : null,
    //     ].filter(Boolean);
    // },


}
module.exports = nextConfig
