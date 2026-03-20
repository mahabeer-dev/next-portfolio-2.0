import type { BlogPost } from "@/lib/blogs";

const post: BlogPost = {
  id: 9,
  slug: "enable-google-analytics-4-nextjs",
  title:
    "How to Enable Google Analytics 4 (GA4) on Your Website: Full Setup Guide + Next.js",
  excerpt:
    "Step-by-step: create a Google Analytics 4 property, add a web data stream, copy your Measurement ID, and implement gtag.js in a Next.js App Router project with environment variables and production-safe loading.",
  date: "2026-03-11",
  readTime: "12 min read",
  tags: [
    "Google Analytics",
    "GA4",
    "Next.js",
    "Web Analytics",
    "gtag.js",
    "SEO",
  ],
  platform: "personal",
  coverImage: "/blogs/enable-google-analytics-nextjs/cover.webp",
  content: [
    {
      type: "paragraph",
      text: "Google Analytics 4 (GA4) helps you understand who visits your site, what they do, and which content or pages drive results. This guide walks you through creating an Analytics account and property in the Google UI, then wiring the official ==Google tag (gtag.js)== into a ==Next.js== app so Tag Assistant and GA’s setup flow can detect your implementation. Screenshots use placeholder images — replace them under ==public/blogs/enable-google-analytics-nextjs/== with your own captures for a polished publish.",
    },
    {
      type: "heading",
      text: "What you’ll need",
    },
    {
      type: "paragraph",
      text: "A [Google account](https://accounts.google.com/), access to your site’s production domain, and a Next.js project using the [App Router](https://nextjs.org/docs/app). Your Measurement ID looks like ==G-XXXXXXXXXX== — you’ll copy it from Analytics after you create a web data stream.",
    },
    {
      type: "heading",
      text: "Part 1 — Create your Google Analytics account and property",
    },
    {
      type: "paragraph",
      text: "If you don’t already use Analytics, open [Google Analytics](https://analytics.google.com/analytics/web/) and start the setup flow. You can also go directly to the [provision / create](https://analytics.google.com/analytics/web/#/provision/create) experience when signed in.",
    },
    {
      type: "heading",
      text: "Step 1 — Create an account",
    },
    {
      type: "paragraph",
      text: "Enter an ==Account name== (often your company or personal name). This is the top-level container; you can hold multiple properties under one account. Complete any account data-sharing options Google presents, then continue.",
    },
    {
      type: "image",
      src: "/blogs/enable-google-analytics-nextjs/1.webp",
      alt: "Google Analytics interface showing account creation with account name field and navigation to next step",
      caption:
        "Step 1 — Create your Analytics account and proceed with the guided setup",
    },
    {
      type: "heading",
      text: "Step 2 — Create a property",
    },
    {
      type: "paragraph",
      text: "A ==property== groups the websites and apps you want to measure together for reporting. Enter a ==Property name== (required), choose your ==Reporting time zone== and ==Currency==, then move to the next step. Most solo developers and small teams choose a single property per main product or site.",
    },
    {
      type: "image",
      src: "/blogs/enable-google-analytics-nextjs/2.webp",
      alt: "Google Analytics property setup form with property name, time zone, and currency fields",
      caption:
        "Step 2 — Name your property and set timezone and currency for reports",
    },
    {
      type: "heading",
      text: "Step 3 — Describe your business",
    },
    {
      type: "paragraph",
      text: "Google uses ==Industry category== and ==Business size== to tailor default reports and benchmarks. Pick the options that best match your situation — for example, ==Technology== and ==Small business (1–10 employees)== — then continue.",
    },
    {
      type: "image",
      src: "/blogs/enable-google-analytics-nextjs/3.webp",
      alt: "Business details step in Google Analytics with industry category and organization size selectors",
      caption:
        "Step 3 — Industry and organization size help Google personalize your experience",
    },
    {
      type: "heading",
      text: "Step 4 — Choose your business objectives",
    },
    {
      type: "paragraph",
      text: "Select objectives that match how you’ll use Analytics — for example ==Generate leads==, ==Understand web and/or app traffic==, and/or ==View user engagement & retention==. You can adjust reporting later; these choices tune the initial UI. Accept the terms if prompted.",
    },
    {
      type: "image",
      src: "/blogs/enable-google-analytics-nextjs/4.webp",
      alt: "Google Analytics business objectives screen with multiple selectable goals like leads and engagement",
      caption:
        "Step 4 — Pick objectives aligned with how you measure success",
    },
    {
      type: "heading",
      text: "Step 5 — Start collecting data (web stream)",
    },
    {
      type: "paragraph",
      text: "When asked for your platform, choose ==Web==. Enter your ==Website URL== (use your canonical production URL, including https://) and a ==Stream name== (e.g. ==Production site==). Create the stream — this is what exposes your ==Measurement ID== for the Google tag.",
    },
    {
      type: "image",
      src: "/blogs/enable-google-analytics-nextjs/5.webp",
      alt: "Google Analytics add web stream form with website URL and stream name fields",
      caption:
        "Step 5 — Add a web data stream with your live site URL",
    },
    {
      type: "heading",
      text: "Step 6 — Copy your Measurement ID",
    },
    {
      type: "paragraph",
      text: "After the stream is created, open the stream details. Copy the ==Measurement ID== (format ==G-XXXXXXXXXX==). You’ll paste this into an environment variable in your Next.js project. Treat it as non-secret but don’t rotate it casually — changing streams changes historical continuity in reporting.",
    },
    {
      type: "image",
      src: "/blogs/enable-google-analytics-nextjs/6.webp",
      alt: "Google Analytics web stream details showing Measurement ID G- format and stream configuration",
      caption:
        "Step 6 — Copy the Measurement ID from your web stream details",
    },
    {
      type: "heading",
      text: "Part 2 — Configure environment variables",
    },
    {
      type: "paragraph",
      text: "In Next.js, values exposed to the browser must use the ==NEXT_PUBLIC_ prefix== so they are inlined at ==build time==. Use ==.env.local== locally (and never commit secrets there). On [Vercel](https://vercel.com/docs/projects/environment-variables), Netlify, or your host, add the same variables for ==Production== and trigger a ==new deployment== after saving.",
    },
    {
      type: "code",
      language: "bash",
      text: `# .env.local (example)\n# Required for GA4 in production builds\nNEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX\n\n# Optional: send events from \`next dev\` (default is off)\nNEXT_PUBLIC_GA_ENABLE_IN_DEV=false`,
    },
    {
      type: "paragraph",
      text: "Aliases such as ==NEXT_PUBLIC_GTAG_ID== or ==NEXT_PUBLIC_GOOGLE_ANALYTICS_ID== can be supported if your codebase reads them — the important rule is the ==public== prefix and a ==redeploy== after changing values.",
    },
    {
      type: "heading",
      text: "Part 3 — Centralize GA config in lib/analytics-config.ts",
    },
    {
      type: "paragraph",
      text: "Keep environment reads in one module so your ==root layout== stays readable and you can gate development traffic (avoid polluting real data during local development).",
    },
    {
      type: "code",
      language: "typescript",
      text: `export function getGaMeasurementId(): string | undefined {\n  const raw =\n    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ||\n    process.env.NEXT_PUBLIC_GTAG_ID?.trim() ||\n    process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID?.trim();\n  if (!raw) return undefined;\n  return raw;\n}\n\nexport function shouldInjectGoogleAnalytics(): boolean {\n  const id = getGaMeasurementId();\n  if (!id) return false;\n  if (process.env.NODE_ENV === \"development\") {\n    return process.env.NEXT_PUBLIC_GA_ENABLE_IN_DEV === \"true\";\n  }\n  return true;\n}`,
    },
    {
      type: "heading",
      text: "Part 4 — Add the Google tag in app/layout.tsx",
    },
    {
      type: "paragraph",
      text: "Use Next.js [next/script](https://nextjs.org/docs/app/building-your-application/optimizing/scripts) with strategy ==afterInteractive== so the tag loads after hydration without blocking first paint. The inline snippet must match Google’s recommended ==dataLayer== + ==gtag== bootstrap so Tag Assistant recognizes the installation.",
    },
    {
      type: "paragraph",
      text: "Import ==Script== from ==next/script==, your helpers from ==@/lib/analytics-config==, and a small client component (e.g. ==GaRouteReporter==) that sends ==page_path== on App Router navigations, since GA’s default first page_view does not always cover client-side route changes.",
    },
    {
      type: "code",
      language: "tsx",
      text: [
        'import Script from "next/script";',
        "import {",
        "  getGaMeasurementId,",
        "  shouldInjectGoogleAnalytics,",
        '} from "@/lib/analytics-config";',
        'import { GaRouteReporter } from "@/components/ga-route-reporter";',
        "",
        "// Inside RootLayout component, before closing </body>:",
        "const gaId = getGaMeasurementId();",
        "const loadGa = shouldInjectGoogleAnalytics();",
        "",
        "return (",
        "  <html>…",
        "    <body>…",
        "      {loadGa && gaId ? (",
        "        <>",
        "          <Script",
        '            src={"https://www.googletagmanager.com/gtag/js?id=" + gaId}',
        '            strategy="afterInteractive"',
        "          />",
        '          <Script id="google-gtag-init" strategy="afterInteractive">',
        "            {`",
        "window.dataLayer = window.dataLayer || [];",
        "function gtag(){dataLayer.push(arguments);}",
        "gtag('js', new Date());",
        "gtag('config', '${gaId}');",
        "            `.trim()}",
        "          </Script>",
        "          <GaRouteReporter gaId={gaId} />",
        "        </>",
        "      ) : null}",
        "    </body>",
        "  </html>",
        ");",
      ].join("\n"),
    },
    {
      type: "heading",
      text: "Part 5 — Deploy and verify",
    },
    {
      type: "paragraph",
      text: "1. Set ==NEXT_PUBLIC_GA_MEASUREMENT_ID== on your hosting provider. 2. Run a ==production build== and deploy. 3. Open your live site, view ==page source== or the Network tab, and confirm ==googletagmanager.com/gtag/js== loads with your ID. 4. In GA4, open ==Reports → Realtime== or ==Admin → DebugView== (with Google’s debug extension if needed). Disable ad blockers while testing.",
    },
    {
      type: "heading",
      text: "Common reasons GA says “tag not detected”",
    },
    {
      type: "paragraph",
      text: "- Variable name missing the ==NEXT_PUBLIC_ prefix== — the browser bundle never receives an ID.\n- Env added ==after== build without ==redeploying== — rebuild to embed the value.\n- Testing only on ==localhost== with ==NEXT_PUBLIC_GA_ENABLE_IN_DEV== left false — enable it or test on production.\n- ==Consent mode== or CMP blocking the tag before consent — adjust your consent flow if you use one.\n- ==Ad blockers== stripping the request — use Realtime with blockers off.",
    },
    {
      type: "heading",
      text: "Privacy and compliance",
    },
    {
      type: "paragraph",
      text: "If you serve users in the ==EU==, UK, or other regions with strict privacy rules, pair Analytics with a proper ==cookie / consent== strategy and document processing in your privacy policy. This article focuses on technical setup, not legal advice.",
    },
    {
      type: "heading",
      text: "Conclusion",
    },
    {
      type: "paragraph",
      text: "You’ve created a GA4 property, added a ==web data stream==, copied your ==Measurement ID==, and mirrored Google’s ==gtag.js== implementation in ==Next.js== using environment-driven configuration. Replace the placeholder images in ==public/blogs/enable-google-analytics-nextjs/== with real screenshots to strengthen trust and SEO, then submit updated URLs in ==Google Search Console== if you track indexing separately.",
    },
  ],
};

export default post;
