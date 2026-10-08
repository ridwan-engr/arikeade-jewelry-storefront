/*
 * Arikeade runtime configuration.
 *
 * V13 ships with API mode disabled so the Vercel storefront keeps working
 * until the backend is deployed. After V13 backend deployment, set this to:
 *   https://YOUR-API-DOMAIN/api
 */
window.ARIKADE_CONFIG = Object.freeze({
  API_BASE_URL: ""
});
