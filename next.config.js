const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  images: {
    domains: ["dev-api.accumeo.com", "accumeo-media-dev.s3.amazonaws.com", "d190e604gdbcnz.cloudfront.net"],
    // formats: ['image/webp','image/png','image/jpg'],
    minimumCacheTTL: 31536000,
  },
  devIndicators: {
    autoPrerender: false,
    buildActivity: false,
  },
  i18n: {
    locales: ["en", "sv"],
    defaultLocale: "sv",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: '/about-us',
        destination: '/om-oss',
      },
      {
        source: '/investment-opportunities',
        destination: '/investeringsmojligheter',
      },
      {
        source: '/raise',
        destination: '/sok-kapital',
      },
      {
        source: '/company/:path',
        destination: '/foretag/:path',
      },
      {
        source: '/company',
        destination: '/foretag',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/investeringsmojligheter',
        has: [
          {
            type: 'cookie',
            key: 'NEXT_LOCALE',
            value: 'en',
          },
        ],
        permanent: false,
        destination: '/investment-opportunities',
      },
      {
        source: '/om-oss',
        has: [
          {
            type: 'cookie',
            key: 'NEXT_LOCALE',
            value: 'en',
          },
        ],
        permanent: false,
        destination: '/about-us',
      },
      {
        source: '/sok-kapital',
        has: [
          {
            type: 'cookie',
            key: 'NEXT_LOCALE',
            value: 'en',
          },
        ],
        permanent: false,
        destination: '/raise',
      },
      {
        source: '/foretag/:slug*',
        has: [
          {
            type: 'cookie',
            key: 'NEXT_LOCALE',
            value: 'en',
          },
        ],
        permanent: false,
        destination: '/company/:slug*',
      },
      {
        source: '/foretag',
        has: [
          {
            type: 'cookie',
            key: 'NEXT_LOCALE',
            value: 'en',
          },
        ],
        permanent: false,
        destination: '/company',
      },
    ]
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
