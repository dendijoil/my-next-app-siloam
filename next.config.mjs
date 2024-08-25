/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/my-next-app-siloam',
  assetPrefix: '/my-next-app-siloam/',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
