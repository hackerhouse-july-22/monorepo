/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withSvgr = require("next-svgr");

const nextConfig = withSvgr({
  reactStrictMode: true,
});

module.exports = nextConfig;
