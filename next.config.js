const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["dev-api.accumeo.com", "accumeo-media-dev.s3.amazonaws.com"],
  },
  devIndicators: {
    autoPrerender: false,
  },
});
