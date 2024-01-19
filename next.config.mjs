/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sp-taskify-api.vercel.app/2-7"], // 나중에 주소 확인 후 재설정 필요
  },
};

export default nextConfig;
