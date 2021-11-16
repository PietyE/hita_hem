const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["dev-api.accumeo.com", "accumeo-media-dev.s3.amazonaws.com"],
  },
  devIndicators: {
    autoPrerender: false,
    buildActivity: false,
  },
  i18n: {
    locales: ["en", "sv"],
    defaultLocale: "sv",
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate",
          },
        ],
      },
    ];
  },
});
