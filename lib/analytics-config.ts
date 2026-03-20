/**
 * GA4 Measurement ID must use NEXT_PUBLIC_* so it is embedded in the client bundle
 * at build time. Set it in Vercel (etc.) under Environment Variables and redeploy.
 *
 * Supported names (first match wins):
 * - NEXT_PUBLIC_GA_MEASUREMENT_ID (recommended)
 * - NEXT_PUBLIC_GTAG_ID
 * - NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
 */
export function getGaMeasurementId(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_GTAG_ID?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();

  if (!raw) return undefined;
  return raw;
}

/** Skip GA in local dev unless NEXT_PUBLIC_GA_ENABLE_IN_DEV=true (keeps metrics clean). */
export function shouldInjectGoogleAnalytics(): boolean {
  const id = getGaMeasurementId();
  if (!id) return false;
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_GA_ENABLE_IN_DEV === "true";
  }
  return true;
}
