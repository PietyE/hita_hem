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
        destination: '/sök-kapital',
      },
      {
        source: '/company',
        destination: '/foretag',
      },
    ]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/investeringsmojligheter',
  //       has: [
  //         {
  //           type: 'cookie',
  //           key: 'NEXT_LOCALE',
  //           value: 'en',
  //         },
  //       ],
  //       permanent: false,
  //       destination: '/investment-opportunities',
  //     },
  //
  //   ]
  // },
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
