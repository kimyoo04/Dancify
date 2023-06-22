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
            hostname: "dancify-bucket.s3.ap-northeast-2.amazonaws.com",
            port: "",
            pathname: "/**",
          },
        ],
      },
    };
  }

  return {
    reactStrictMode: false,
    output: "standalone",
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "dancify-bucket.s3.ap-northeast-2.amazonaws.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  };
};

module.exports = nextConfig;
