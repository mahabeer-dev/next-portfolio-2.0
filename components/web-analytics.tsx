"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, string | boolean>
    ) => void;
  }
}

const rawId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const enableInDev = process.env.NEXT_PUBLIC_GA_ENABLE_IN_DEV === "true";
const gaId =
  rawId &&
  (process.env.NODE_ENV === "production" || enableInDev)
    ? rawId
    : undefined;

function GaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || !pathname) return;
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("config", gaId, { page_path: pagePath });
  }, [pathname, searchParams]);

  return null;
}

/**
 * GA4 via @next/third-parties (Next.js–recommended): optimized Script loading.
 * Set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX). Omit in dev if you want zero calls.
 */
export function WebAnalytics() {
  if (!gaId) return null;

  return (
    <>
      <GoogleAnalytics gaId={gaId} />
      <Suspense fallback={null}>
        <GaPageView />
      </Suspense>
    </>
  );
}
