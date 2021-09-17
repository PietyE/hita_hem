const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    REACT_APP_API_BASE_URL: (() => {
      if (isDev) return "https://stage-api.accumeo.com/api";
      if (isProd) {
        return "https://api.accumeo.com/api";
      }
      if (isStaging) return "https://stage-api.accumeo.com/api";
      return "RESTURL_SPEAKERS:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
  };

  // next.config.js object
  return {
    ...env,
    images: {
      domains: ["dev-api.accumeo.com", "accumeo-media-dev.s3.amazonaws.com"],
    },
  };
};
