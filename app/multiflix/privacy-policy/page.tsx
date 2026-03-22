import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const pagePath = "/multiflix/privacy-policy";
const canonical = `${siteUrl.replace(/\/$/, "")}${pagePath}`;

/** Set in production to show a mailto on this page, e.g. privacy@yourdomain.com */

export const metadata: Metadata = {
  title: "Multiflix — Privacy Policy",
  description:
    "Privacy policy for the Multiflix mobile app: music streaming, reels, and social features.",
  alternates: { canonical },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: canonical,
    title: "Multiflix — Privacy Policy",
    description:
      "Privacy policy for the Multiflix mobile app: music streaming, reels, and social features.",
  },
};

export default function MultiflixPrivacyPolicyPage() {
  const effective = new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-background text-foreground">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <header className="border-b border-border pb-8">
          <p className="text-sm font-medium text-muted-foreground">Multiflix</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Effective date: {effective}
          </p>
        </header>

        <div className="mt-10 space-y-8 text-sm leading-relaxed sm:text-base">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              1. Introduction
            </h2>
            <p className="text-muted-foreground">
              This Privacy Policy describes how Multiflix (“we”, “us”, or “our”)
              collects, uses, stores, and shares information when you use the
              Multiflix mobile application (“App”). Multiflix is an all-in-one
              platform for on-demand music streaming, short-form video (reels)
              creation, and social discovery and interaction. By using the App,
              you agree to this policy. If you do not agree, please do not use
              the App.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              2. Information we collect
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Account and profile data.
                </strong>{" "}
                Information you provide when registering or updating your
                account, such as display name, username, email address, phone
                number (if requested), profile photo, bio, and other profile
                fields you choose to add.
              </li>
              <li>
                <strong className="text-foreground">
                  Content you create or upload.
                </strong>{" "}
                Reels, videos, audio, images, captions, hashtags, playlists, and
                other materials you post or store in the App, including metadata
                associated with that content (e.g. timestamps, edits).
              </li>
              <li>
                <strong className="text-foreground">
                  Music and playback activity.
                </strong>{" "}
                Listening history, playlists, likes, saves, skips, and related
                signals we use to operate streaming features and
                recommendations.
              </li>
              <li>
                <strong className="text-foreground">
                  Social and community activity.
                </strong>{" "}
                Follows, followers, likes, comments, shares, messages (if
                messaging is available), and other interactions with users or
                content.
              </li>
              <li>
                <strong className="text-foreground">
                  Device and technical data.
                </strong>{" "}
                Device type, operating system version, app version, language,
                time zone, identifiers we or our service providers use for
                security and analytics (such as advertising or device
                identifiers where permitted), IP address, and diagnostic data
                such as crash logs and performance metrics.
              </li>
              <li>
                <strong className="text-foreground">
                  Communications with us.
                </strong>{" "}
                Information you send when you contact support or report issues,
                including the content of your message and your contact details.
              </li>
            </ul>
            <p className="text-muted-foreground">
              We may also receive information from third-party services you
              connect to the App (for example, if you sign in with a social or
              identity provider), subject to their terms and your settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              3. How we use your information
            </h2>
            <p className="text-muted-foreground">
              We use the information above to:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>Provide, maintain, and improve the App and its features;</li>
              <li>
                Personalize content, music recommendations, and discovery
                (including trending reels, tracks, and creators);
              </li>
              <li>
                Enable creation, editing, publishing, and distribution of reels
                and related content, including pairing video with music where
                licensed or permitted;
              </li>
              <li>
                Operate social features such as follows, engagement, and
                community safety;
              </li>
              <li>
                Authenticate users, secure accounts, detect fraud and abuse, and
                enforce our terms and policies;
              </li>
              <li>
                Moderate content, investigate reports, and protect users and the
                platform;
              </li>
              <li>
                Analyze usage and performance, fix bugs, and develop new
                features;
              </li>
              <li>
                Communicate with you about the App, updates, security, or
                support;
              </li>
              <li>
                Comply with legal obligations and respond to lawful requests.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              4. Legal bases (where applicable)
            </h2>
            <p className="text-muted-foreground">
              Depending on your region, we may rely on one or more of the
              following: performance of a contract (providing the App),
              legitimate interests (security, improvement, and fraud
              prevention), consent (where required for specific processing such
              as certain notifications or optional analytics), and legal
              obligation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              5. Sharing of information
            </h2>
            <p className="text-muted-foreground">
              We do not sell your personal information. We may share information
              in these situations:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
              <li>
                <strong className="text-foreground">Service providers.</strong>{" "}
                Vendors who host data, deliver content, provide analytics, crash
                reporting, customer support tools, or security services, under
                contractual obligations to protect data and use it only for our
                instructions.
              </li>
              <li>
                <strong className="text-foreground">Other users.</strong>{" "}
                Content and profile elements you choose to make public (for
                example reels, likes, comments, or a public profile) are visible
                as designed by the App.
              </li>
              <li>
                <strong className="text-foreground">Legal and safety.</strong>{" "}
                When required by law, legal process, or government request, or
                when we believe disclosure is necessary to protect rights,
                safety, or the integrity of the App.
              </li>
              <li>
                <strong className="text-foreground">Business transfers.</strong>{" "}
                In connection with a merger, acquisition, or sale of assets,
                your information may be transferred subject to appropriate
                safeguards and notice where required.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              6. Retention
            </h2>
            <p className="text-muted-foreground">
              We retain information for as long as your account is active and as
              needed to provide the App, comply with law, resolve disputes, and
              enforce agreements. Content you delete may remain in backups for a
              limited period before being removed. Aggregated or de-identified
              data may be retained longer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              7. Security
            </h2>
            <p className="text-muted-foreground">
              We implement technical and organizational measures designed to
              protect your information, including secure authentication and
              access controls. No method of transmission or storage is
              completely secure; we encourage you to use a strong password and
              protect your device.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              8. Your choices and rights
            </h2>
            <p className="text-muted-foreground">
              Depending on applicable law, you may have the right to access,
              correct, delete, or export certain personal data, to object to or
              restrict certain processing, or to withdraw consent where
              processing is consent-based. You may be able to manage some
              settings inside the App (account, privacy, notifications). To
              exercise other rights, contact us using the details below. You may
              also lodge a complaint with a data protection authority in your
              country or region where applicable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              9. Children
            </h2>
            <p className="text-muted-foreground">
              Multiflix is not directed at children under the minimum age
              required by the laws of their country (including 13 in many
              jurisdictions) without appropriate parental consent where
              required. We do not knowingly collect personal information from
              children in violation of applicable law. If you believe we have
              done so, please contact us and we will take appropriate steps.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              10. International transfers
            </h2>
            <p className="text-muted-foreground">
              We may process and store information in India and other countries.
              Where we transfer personal data across borders, we use appropriate
              safeguards as required by applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              11. Third-party links and services
            </h2>
            <p className="text-muted-foreground">
              The App may contain links or integrations with third-party
              services. Their collection and use of information is governed by
              their own privacy policies. We encourage you to read those
              policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              12. Changes to this policy
            </h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will post
              the updated version on this page and update the effective date. If
              changes are material, we will provide additional notice as
              required by law (for example, in the App or by email).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              13. Contact
            </h2>
            <p className="text-muted-foreground">
              For privacy-related questions, requests, or complaints regarding
              Multiflix:
            </p>

            <p className="text-muted-foreground">
              Please contact us using the developer email address shown on the
              Multiflix app page in the Google Play Store.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
