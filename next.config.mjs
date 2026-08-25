/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  serverExternalPackages: ["better-sqlite3", "nodemailer"],
};

export default nextConfig;
