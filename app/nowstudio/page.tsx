"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ─── Sub-components ─────────────────────────────────────────── */

function SectionNumber({ num, label }: { num: string; label: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: "1rem",
        marginBottom: "2.5rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.6875rem",
          color: "#333333",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
        }}
      >
        {num}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 700,
          fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
          color: "#ffffff",
          letterSpacing: "-0.02em",
        }}
      >
        {label}
      </h2>
    </div>
  );
}

function QuoteBlock({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="quote-block cs-reveal"
      style={{ margin: "2.5rem 0" }}
    >
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(1rem, 1.8vw, 1.1875rem)",
          lineHeight: 1.7,
        }}
      >
        {children}
      </p>
    </blockquote>
  );
}

function InsightCard({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="cs-reveal"
      style={{
        background: "#111111",
        border: "1px solid rgba(255,255,255,0.06)",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.5625rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color,
        }}
      >
        {label}
      </span>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.9375rem",
          color: "#888888",
          lineHeight: 1.6,
        }}
      >
        {children}
      </p>
    </div>
  );
}

function StatBlock({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="cs-reveal"
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <span
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          color: "#ffffff",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.625rem",
          color: "#444444",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function IterationCard({
  option,
  text,
  isChosen,
}: {
  option: string;
  text: string;
  isChosen?: boolean;
}) {
  return (
    <div
      className="cs-reveal"
      style={{
        background: isChosen ? "#161616" : "#0d0d0d",
        border: isChosen
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(255,255,255,0.05)",
        padding: "1.5rem",
        position: "relative",
      }}
    >
      {isChosen && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "0.5625rem",
            color: "#555555",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          Chosen ✓
        </div>
      )}
      <span
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "0.625rem",
          color: "#444444",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "0.75rem",
        }}
      >
        {option}
      </span>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "0.9375rem",
          color: isChosen ? "#888888" : "#555555",
          lineHeight: 1.6,
        }}
      >
        {text}
      </p>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */

export default function NowStudioPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = pageRef.current?.querySelectorAll(".cs-reveal");
      els?.forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    { scope: pageRef }
  );

  const bodyStyle: React.CSSProperties = {
    fontFamily: "var(--font-inter)",
    fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
    color: "#666666",
    lineHeight: 1.75,
    maxWidth: "680px",
  };

  const sectionStyle: React.CSSProperties = {
    padding: "80px 0",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  };

  return (
    <>
      <div
        ref={pageRef}
        style={{
          background: "#080808",
          minHeight: "100vh",
          paddingTop: "100px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 40px 120px",
          }}
        >
          {/* Back nav */}
          <div className="cs-reveal" style={{ marginBottom: "4rem" }}>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.6875rem",
                color: "#333333",
                textDecoration: "none",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#666666")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#333333")
              }
            >
              ← Back
            </Link>
          </div>

          {/* ─── HERO ─── */}
          <div style={{ marginBottom: "5rem" }}>
            <p
              className="cs-reveal"
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.6875rem",
                color: "#333333",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              now.gg Studio — Case Study
            </p>

            <h1
              className="cs-reveal"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: "2.5rem",
                maxWidth: "860px",
              }}
            >
              Built nowStudio to streamline app publishing, monetization, and
              growth for developers
            </h1>

            <p
              className="cs-reveal"
              style={{ ...bodyStyle, maxWidth: "720px", marginBottom: "3.5rem" }}
            >
              nowStudio is an all-in-one platform that helps app developers
              create, publish, monetize, and grow apps without getting bogged
              down in operational complexity. As Senior Product Designer, I led
              end-to-end product design and partnered closely with engineering to
              ship a cloud-first workflow spanning cloud publishing, payment
              management, traffic generation, and analytics.
            </p>

            {/* Essentials bar */}
            <div
              className="cs-reveal"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "2rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr repeat(3, 1fr)",
                gap: "2rem",
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.5625rem",
                    color: "#333333",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Role
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    color: "#888888",
                    lineHeight: 1.5,
                  }}
                >
                  Senior Product Designer — nowStudio. Led product design +
                  design-to-dev partnership.
                </p>
              </div>

              <div>
                <span
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.5625rem",
                    color: "#333333",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "0.5rem",
                  }}
                >
                  Timeframe
                </span>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.8125rem",
                    color: "#888888",
                  }}
                >
                  6 Months
                </p>
              </div>

              {[
                {
                  value: "-35%",
                  label: "Time-to-First-Publish",
                },
                {
                  value: "+22%",
                  label: "Monetization Setup Completion",
                },
                {
                  value: "+14%",
                  label: "Developer Satisfaction",
                },
              ].map((stat) => (
                <div key={stat.label}>
                  <span
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontWeight: 700,
                      fontSize: "1.75rem",
                      color: "#ffffff",
                      letterSpacing: "-0.03em",
                      display: "block",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "0.5625rem",
                      color: "#333333",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 01 CONTEXT ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="01" label="The Context" />

            <p className="cs-reveal" style={bodyStyle}>
              App developers were losing time and momentum to fragmented tooling
              across publishing, payments, traffic acquisition, and analytics.
              The business needed a cohesive platform that could drive activation
              (first publish), monetization adoption, and long-term retention —
              without requiring developers to become ops experts.
            </p>

            <QuoteBlock>
              "Developers described the workflow as 'death by dashboards' — too
              many tools, unclear next steps, and slow publishing iterations."
            </QuoteBlock>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5px",
                marginBottom: "2.5rem",
              }}
            >
              <div
                className="cs-reveal"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.5625rem",
                    color: "#333333",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Business Goals
                </p>
                {[
                  "Activation — drive first publish",
                  "Retention — recurring engagement",
                  "Revenue — monetization adoption",
                  "Efficiency — reduce ops burden",
                ].map((g) => (
                  <p
                    key={g}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      color: "#666666",
                      lineHeight: 2,
                    }}
                  >
                    — {g}
                  </p>
                ))}
              </div>

              <div
                className="cs-reveal"
                style={{
                  background: "#111111",
                  border: "1px solid rgba(255,255,255,0.06)",
                  padding: "1.5rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.5625rem",
                    color: "#333333",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  User Goals
                </p>
                {[
                  "Publish new versions quickly and reliably",
                  "Set up payments without ambiguity",
                  "Understand acquisition at a glance",
                  "Take clear actions to improve growth",
                ].map((g) => (
                  <p
                    key={g}
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      color: "#666666",
                      lineHeight: 2,
                    }}
                  >
                    — {g}
                  </p>
                ))}
              </div>
            </div>

            <div
              className="cs-reveal"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.5625rem",
                  color: "#333333",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Constraints
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  "Multi-module scope",
                  "Mixed audience maturity",
                  "Existing cloud pipeline constraints",
                  "Limited analytics instrumentation early on",
                ].map((c) => (
                  <span key={c} className="tag-pill">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ─── 02 RESEARCH ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="02" label="Research & Insight" />

            {[
              {
                finding:
                  "Developers couldn't tell where they were in the publish process or what would block release.",
                insight:
                  "Uncertainty, not difficulty, was the biggest driver of abandonment.",
                implication:
                  "Design a status-forward publishing flow with explicit preflight checks, clear stages, and recoverable errors.",
              },
              {
                finding:
                  "Payment setup required context switching across providers and unclear compliance requirements.",
                insight:
                  "Monetization fails when the system doesn't translate 'finance' into developer-ready tasks.",
                implication:
                  "Create a guided setup with progressive disclosure, validation, and a single 'ready to accept payments' state.",
              },
              {
                finding: "Analytics existed but didn't connect to decisions.",
                insight:
                  "Developers need actions tied to metrics, not more charts.",
                implication:
                  "Add insight-to-action modules: alerts, recommendations, and 'next best step' prompts per app.",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1.5px",
                  marginBottom: "1.5px",
                }}
              >
                <InsightCard label="Finding" color="#555555">
                  {item.finding}
                </InsightCard>
                <InsightCard label="Insight" color="#666666">
                  {item.insight}
                </InsightCard>
                <InsightCard label="Implication" color="#888888">
                  {item.implication}
                </InsightCard>
              </div>
            ))}
          </div>

          {/* ─── 03 STRATEGY ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="03" label="The Strategy" />

            <div
              className="cs-reveal"
              style={{
                background: "#0d0d0d",
                border: "1px solid rgba(255,255,255,0.06)",
                padding: "2rem",
                marginBottom: "2.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.5625rem",
                  color: "#333333",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                HMW
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                  color: "#888888",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                }}
              >
                "How might we reduce operational overhead so developers can
                publish faster, monetize confidently, and take growth actions
                from a single, coherent workspace?"
              </p>
            </div>

            {/* Prioritization table */}
            <div
              className="cs-reveal"
              style={{ marginBottom: "2rem" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "0.5625rem",
                  color: "#333333",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                Prioritization
              </p>
              <div style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  {
                    item: "Unified app workspace",
                    decision: "Included",
                    rationale: "Reduces cognitive load, sustainable expansion",
                  },
                  {
                    item: "Fully custom billing engine",
                    decision: "Deferred",
                    rationale: "Time-to-market and compliance risk",
                  },
                  {
                    item: "Automated growth recommendations",
                    decision: "Included (v1 rules-based)",
                    rationale: "Shipped explainable baseline quickly",
                  },
                  {
                    item: "Advanced cohort analysis",
                    decision: "Deferred",
                    rationale: "Power-user feature, high data dependencies",
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "2fr 1.5fr 3fr",
                      borderBottom:
                        i < 3
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                      padding: "1rem 1.5rem",
                      background: i % 2 === 0 ? "#0d0d0d" : "#111111",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.875rem",
                        color: "#777777",
                      }}
                    >
                      {row.item}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: "0.6875rem",
                        color:
                          row.decision.startsWith("Included")
                            ? "#666666"
                            : "#333333",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {row.decision}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.8125rem",
                        color: "#444444",
                      }}
                    >
                      {row.rationale}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── 04 DESIGN PROCESS ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="04" label="Design Process" />

            <p className="cs-reveal" style={{ ...bodyStyle, marginBottom: "2.5rem" }}>
              Siloed pages per tool → unified "App Workspace" with four pillars:
              Build/Publish, Monetize, Grow, Analyze.
            </p>

            {[
              {
                label: "Iteration 1: Publishing Flow",
                context:
                  "Publishing flow caused drop-off when errors appeared late.",
                options: [
                  {
                    option: "Option A",
                    text: "Linear wizard with locked steps",
                    chosen: false,
                  },
                  {
                    option: "Option B",
                    text: "Stage-based pipeline with parallel preflight checks and resumable states",
                    chosen: true,
                  },
                ],
                decision:
                  "Stage-based pipeline — matches real system behavior, errors recoverable without restarting.",
              },
              {
                label: "Iteration 2: Monetization Setup",
                context:
                  "Monetization setup overwhelmed users with compliance terminology.",
                options: [
                  {
                    option: "Option A",
                    text: "Expose provider fields directly",
                    chosen: false,
                  },
                  {
                    option: "Option B",
                    text: "Task-based checklist with inline explanations and validation",
                    chosen: true,
                  },
                ],
                decision:
                  "Task-based checklist — translates requirements into developer language.",
              },
              {
                label: "Iteration 3: Analytics",
                context: "Analytics didn't connect to decisions.",
                options: [
                  {
                    option: "Option A",
                    text: "Keep dashboards as pure reporting",
                    chosen: false,
                  },
                  {
                    option: "Option B",
                    text: "Add 'Insights' layer with alerts + recommended actions",
                    chosen: true,
                  },
                ],
                decision:
                  "Added insights layer — connects metrics to decisions, reduces time-to-diagnosis.",
              },
            ].map((iter, i) => (
              <div
                key={i}
                style={{ marginBottom: "3rem" }}
              >
                <p
                  className="cs-reveal"
                  style={{
                    fontFamily: "var(--font-space-grotesk)",
                    fontWeight: 600,
                    fontSize: "1.0625rem",
                    color: "#ffffff",
                    marginBottom: "0.75rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {iter.label}
                </p>
                <p
                  className="cs-reveal"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.9375rem",
                    color: "#555555",
                    marginBottom: "1.25rem",
                  }}
                >
                  {iter.context}
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1.5px",
                    marginBottom: "1rem",
                  }}
                >
                  {iter.options.map((opt) => (
                    <IterationCard
                      key={opt.option}
                      option={opt.option}
                      text={opt.text}
                      isChosen={opt.chosen}
                    />
                  ))}
                </div>
                <div
                  className="cs-reveal"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "1rem 1.5rem",
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "0.5625rem",
                      color: "#333333",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      flexShrink: 0,
                      paddingTop: "2px",
                    }}
                  >
                    Decision
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9375rem",
                      color: "#777777",
                    }}
                  >
                    {iter.decision}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── 05 FINAL SOLUTION ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="05" label="Final Solution" />

            <p className="cs-reveal" style={{ ...bodyStyle, marginBottom: "3rem" }}>
              Turn a fragmented set of developer tasks into a single, predictable
              workflow: publish with confidence, monetize with clarity, and grow
              with actionable insights.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5px",
              }}
            >
              {[
                {
                  title: "Unified App Workspace",
                  desc: "Single navigation across all modules",
                },
                {
                  title: "Testing & Publishing Pipeline",
                  desc: "Checklist-based onboarding, single readiness state",
                },
                {
                  title: "MultiStore Publishing",
                  desc: "Status-forward release stages with preflight checks",
                },
                {
                  title: "Traffic Generation Hub",
                  desc: "Centralized acquisition channels with visibility into outcomes",
                },
                {
                  title: "Actionable Analytics",
                  desc: "KPI overview plus alerts that map to next steps",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="cs-reveal"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "1.75rem",
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: "#ffffff",
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.875rem",
                      color: "#555555",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 06 IMPACT ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="06" label="The Impact" />

            {/* Big stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "3rem",
                marginBottom: "4rem",
              }}
            >
              <StatBlock value="-35%" label="Time-to-First-Publish" />
              <StatBlock value="+22%" label="Monetization Setup Completion" />
              <StatBlock value="-18%" label="Support Tickets" />
            </div>

            {/* Qualitative quotes */}
            <p
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "0.5625rem",
                color: "#333333",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Qualitative
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "1.5px",
              }}
            >
              {[
                "The publish pipeline finally tells me what's going on—no more guessing.",
                "Payment setup felt like a product, not a finance form.",
                "The insights call out what to fix instead of making me dig through charts.",
              ].map((q) => (
                <div
                  key={q}
                  className="cs-reveal"
                  style={{
                    background: "#111111",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9375rem",
                      color: "#666666",
                      lineHeight: 1.65,
                      fontStyle: "italic",
                    }}
                  >
                    &ldquo;{q}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 07 REFLECTION ─── */}
          <div style={sectionStyle}>
            <SectionNumber num="07" label="Reflection" />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2.5rem",
              }}
            >
              <div className="cs-reveal">
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.5625rem",
                    color: "#333333",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  Lesson
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
                    color: "#666666",
                    lineHeight: 1.75,
                  }}
                >
                  Developer platforms win on predictability and trust: clear
                  states, reversible actions, and honest error handling matter as
                  much as feature breadth.
                </p>
              </div>

              <div className="cs-reveal">
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: "0.5625rem",
                    color: "#333333",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    marginBottom: "1rem",
                  }}
                >
                  How I&apos;ve changed
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
                    color: "#666666",
                    lineHeight: 1.75,
                  }}
                >
                  This project reinforced designing to system reality (pipelines,
                  compliance, permissions) and using status + guidance patterns to
                  reduce cognitive load across complex multi-step workflows.
                </p>
              </div>
            </div>
          </div>

          {/* ─── Next project ─── */}
          <div
            className="cs-reveal"
            style={{
              paddingTop: "5rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              href="/#work"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontWeight: 700,
                fontSize: "clamp(1.125rem, 2.5vw, 1.75rem)",
                color: "#333333",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#333333")
              }
            >
              Next Project →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
