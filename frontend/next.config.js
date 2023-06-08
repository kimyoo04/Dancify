const { PHASE_DEVELOPMENT_SERVER } = require("next/dist/shared/lib/constants");

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: false,
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
          },
        ],
      },
      env: {
        NEXT_PUBLIC_ENV_API_DOMAIN: "http://localhost:8000",
        NEXT_PUBLIC_ENV_API_URL: "http://localhost:8000/api",
        NEXT_PUBLIC_ENV_DOMAIN: "http://localhost:3000",
      },
    };
  }

  return {
    reactStrictMode: false,
    output: "standalone",
    images: {
      loader: "custom",
      loaderFile: "./src/util/localImageLoader.ts",
    },
  };
};

module.exports = nextConfig;
