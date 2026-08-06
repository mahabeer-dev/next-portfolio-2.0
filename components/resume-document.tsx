/**
 * ATS-safe resume PDF.
 *
 * Server-only — never add "use client" here. Layout rules that keep this
 * parseable by applicant tracking systems:
 *   - one column, normal document flow, no absolute positioning
 *   - text reading order == visual order
 *   - built-in Helvetica (no embedded subset that can break extraction)
 *   - no tables, no images, no text in headers/footers
 */

// This module lives among client components but must never reach the browser:
// react-pdf's renderer is Node-only, and a client import compiles fine and then
// 500s at request time. `server-only` turns that into a build error instead.
import "server-only";

import {
  Document,
  Page,
  Text,
  View,
  Link,
  Font,
  StyleSheet,
} from "@react-pdf/renderer";
import type { ResolvedResume } from "@/lib/resume";

/**
 * Disable hyphenation. react-pdf breaks words across lines by default, which
 * extracts as "serv-er-side rendering" / "notifica-tions" and destroys the
 * exact keyword matches an ATS scores on.
 *
 * `Font` is a module-level singleton, and a bare side effect here is lost if
 * the module graph is re-evaluated without it (observed under dev HMR). Call
 * this immediately before every render instead — it's idempotent and cheap.
 */
export function ensureAtsSafeTypography() {
  Font.registerHyphenationCallback((word) => [word]);
}

ensureAtsSafeTypography();

const COLORS = {
  text: "#1a1a1a",
  muted: "#4a4a4a",
  rule: "#c8c8c8",
  accent: "#1a1a1a",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.42,
    color: COLORS.text,
  },

  /* Header */
  // No letterSpacing anywhere: react-pdf writes each glyph at an explicit
  // offset, and extractors then read "M a h a b e e r" instead of "Mahabeer".
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 21,
    marginBottom: 3,
  },
  headline: {
    fontSize: 10,
    color: COLORS.muted,
    marginBottom: 5,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 8.8,
    color: COLORS.muted,
  },
  contactItem: { marginRight: 6 },
  contactSep: { marginRight: 6, color: COLORS.rule },

  /* Sections */
  section: { marginTop: 11 },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    textTransform: "uppercase",
    color: COLORS.accent,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.rule,
    paddingBottom: 2.5,
    marginBottom: 6,
  },

  summary: { textAlign: "left" },

  /* Skills */
  skillRow: { flexDirection: "row", marginBottom: 2.5 },
  skillLabel: { fontFamily: "Helvetica-Bold", width: 96 },
  skillItems: { flex: 1 },

  /* Experience */
  job: { marginBottom: 9 },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  jobTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.2, flex: 1 },
  jobPeriod: { fontSize: 8.8, color: COLORS.muted },
  jobMeta: { fontSize: 9, color: COLORS.muted, marginBottom: 3 },

  /* Bullets */
  bullet: { flexDirection: "row", marginBottom: 1.8 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1, textAlign: "left" },

  /* Projects + OSS */
  entry: { marginBottom: 5 },
  entryName: { fontFamily: "Helvetica-Bold" },
  entryUrl: { color: COLORS.muted, fontSize: 8.8 },
  entryStack: { color: COLORS.muted, fontSize: 8.8, marginTop: 0.5 },

  /* Education */
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  eduLeft: { flex: 1, paddingRight: 10 },
  eduDegree: { fontFamily: "Helvetica-Bold" },
  eduInst: { color: COLORS.muted, fontSize: 9 },
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function BulletLine({ children }: { children: string }) {
  return (
    <View style={styles.bullet} wrap={false}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

/** Strip the scheme so the printed URL stays short but still readable. */
const displayUrl = (url: string) => url.replace(/^https?:\/\//, "");

export function ResumeDocument({ resume }: { resume: ResolvedResume }) {
  const {
    name,
    headline,
    summary,
    contactLines,
    skills,
    experience,
    projects,
    openSource,
    education,
    languages,
    noticePeriod,
    preferredLocations,
  } = resume;

  return (
    <Document
      title={`${name} — ${headline}`}
      author={name}
      subject={headline}
      creator={name}
      producer={name}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.headline}>{headline}</Text>
          <View style={styles.contactRow}>
            {contactLines.map((line, i) => {
              const isLink = /\.(com|online|dev|io)/.test(line) && !line.includes("@");
              return (
                <View key={line} style={{ flexDirection: "row" }}>
                  {isLink ? (
                    <Link src={`https://${line}`} style={styles.contactItem}>
                      {line}
                    </Link>
                  ) : (
                    <Text style={styles.contactItem}>{line}</Text>
                  )}
                  {i < contactLines.length - 1 && (
                    <Text style={styles.contactSep}>|</Text>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <Section title="Professional Summary">
          <Text style={styles.summary}>{summary}</Text>
          {noticePeriod ? (
            <Text style={{ marginTop: 3 }}>Notice period: {noticePeriod}</Text>
          ) : null}
          {preferredLocations ? (
            <Text>Preferred locations: {preferredLocations}</Text>
          ) : null}
        </Section>

        <Section title="Skills">
          {skills.map((group) => (
            <View key={group.label} style={styles.skillRow} wrap={false}>
              <Text style={styles.skillLabel}>{group.label}</Text>
              <Text style={styles.skillItems}>{group.items.join(", ")}</Text>
            </View>
          ))}
        </Section>

        <Section title="Professional Experience">
          {experience.map((job) => (
            <View key={`${job.company}-${job.period}`} style={styles.job}>
              <View style={styles.jobHeader} wrap={false}>
                <Text style={styles.jobTitle}>
                  {job.title}, {job.company}
                </Text>
                <Text style={styles.jobPeriod}>{job.period}</Text>
              </View>
              <Text style={styles.jobMeta}>{job.location}</Text>
              {job.bullets.map((b, i) => (
                <BulletLine key={i}>{b}</BulletLine>
              ))}
            </View>
          ))}
        </Section>

        {projects.length > 0 && (
          <Section title="Selected Projects">
            {projects.map((p) => (
              <View key={p.name} style={styles.entry} wrap={false}>
                <Text>
                  <Text style={styles.entryName}>{p.name}</Text>
                  {p.url ? (
                    <Text style={styles.entryUrl}> — {displayUrl(p.url)}</Text>
                  ) : null}
                </Text>
                <Text>{p.summary}</Text>
                <Text style={styles.entryStack}>{p.stack.join(", ")}</Text>
              </View>
            ))}
          </Section>
        )}

        {openSource.length > 0 && (
          <Section title="Open Source">
            {openSource.map((o) => (
              <View key={o.name} style={styles.entry} wrap={false}>
                <Text>
                  <Text style={styles.entryName}>{o.name}</Text>
                  <Text> — {o.summary}</Text>
                </Text>
              </View>
            ))}
          </Section>
        )}

        <Section title="Education">
          {education.map((e) => (
            <View key={e.degree} style={styles.eduRow} wrap={false}>
              <View style={styles.eduLeft}>
                <Text style={styles.eduDegree}>{e.degree}</Text>
                <Text style={styles.eduInst}>{e.institution}</Text>
              </View>
              <Text style={styles.jobPeriod}>{e.period}</Text>
            </View>
          ))}
        </Section>

        {languages.length > 0 && (
          <Section title="Languages">
            {languages.map((l) => (
              <Text key={l.name}>
                {l.name} — {l.level}
              </Text>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
}
