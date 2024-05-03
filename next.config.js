/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
  {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hvksgidgocdqltvbqxci.supabase.co',
      },
     
    ]

  }
};

module.exports = nextConfig;
