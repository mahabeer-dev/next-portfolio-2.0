"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, string | boolean>,
    ) => void;
  }
}

function GaPageView({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || !pathname) return;
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("config", gaId, { page_path: pagePath });
  }, [pathname, searchParams, gaId]);

  return null;
}

/** Sends page_path on App Router navigations (initial load is handled by gtag/config in layout). */
export function GaRouteReporter({ gaId }: { gaId: string }) {
  return (
    <Suspense fallback={null}>
      <GaPageView gaId={gaId} />
    </Suspense>
  );
}
