/**
 * GET /api/resume?market=international&profile=node
 *
 * Renders the (market x profile) resume variant to a PDF on the fly.
 * Unknown or missing params fall back to the defaults rather than erroring —
 * this endpoint is hit by a plain download link, so a 400 would just look broken.
 */

import { renderToBuffer } from "@react-pdf/renderer";
import {
  ResumeDocument,
  ensureAtsSafeTypography,
} from "@/components/resume-document";
import {
  buildResume,
  resumeFileName,
  isMarket,
  isProfile,
  DEFAULT_MARKET,
  DEFAULT_PROFILE,
} from "@/lib/resume";

// react-pdf needs Node APIs; it cannot run on the edge runtime.
export const runtime = "nodejs";
// Params are read per-request, and the PDF must reflect the current data.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const marketParam = searchParams.get("market");
  const profileParam = searchParams.get("profile");

  const market = isMarket(marketParam) ? marketParam : DEFAULT_MARKET;
  const profile = isProfile(profileParam) ? profileParam : DEFAULT_PROFILE;

  ensureAtsSafeTypography();

  const resume = buildResume(market, profile);
  const buffer = await renderToBuffer(<ResumeDocument resume={resume} />);
  const filename = resumeFileName(market, profile);

  // Buffer is a Uint8Array subclass, but the Web Response BodyInit type
  // doesn't accept it directly — re-wrap so TS and the runtime agree.
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "no-store",
    },
  });
}
