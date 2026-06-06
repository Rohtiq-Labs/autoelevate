"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteImage } from "@/components/autoelevate/site-image";
import { SITE_IMAGES } from "@/data/site-images";

const TOTAL_SCENES = 5;

const SCENE_LABELS = ["Intro", "Strategy", "Design", "Dev", "Results"];

const CODE_SNIPPETS = [
  "const client=",
  "ppf.coat()",
  "luxury++",
  "gsap.to(",
  "await fetch",
  "return elite",
  ".ceramic(",
  ".tint()",
  "brand.elevate",
  "new Brand()",
  "=> 4.2x",
  "function(){}",
  "0x171717",
  "const roi=",
  "detailing()",
  ".build(true)",
];

const ANALYTICS_HEIGHTS = [
  32, 48, 62, 40, 78, 57, 90, 72, 95, 68, 80, 96, 85, 70, 76, 62, 88, 92, 79, 90,
];

const CaseArrowIcon = (): React.ReactElement => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type SceneBackgroundProps = {
  src: string;
  alt: string;
  priority?: boolean;
};

const SceneBackground = ({
  src,
  alt,
  priority = false,
}: SceneBackgroundProps): React.ReactElement => (
  <>
    <div className="scene-bg-image">
      <SiteImage src={src} alt={alt} priority={priority} sizes="100vw" />
    </div>
    <div className="scene-bg-overlay" aria-hidden="true" />
  </>
);

const SERVICE_ITEMS = [
  {
    num: "01",
    name: "Web Design & Development",
    desc: "Cinematic, high-performance websites engineered to convert high-intent visitors. Built on Next.js with sub-1s load times and luxury aesthetics your clients expect.",
    tags: ["Next.js", "Animation", "CRO", "SEO"],
    image: SITE_IMAGES.services[0],
    imageAlt: "Luxury automotive web design showcase",
  },
  {
    num: "02",
    name: "Brand Identity",
    desc: "Full brand systems — logo, typography, color, and visual language — calibrated to command premium positioning in a saturated market.",
    tags: ["Logo", "Brand System", "Style Guide"],
    image: SITE_IMAGES.services[1],
    imageAlt: "Premium automotive brand identity",
  },
  {
    num: "03",
    name: "Conversion Systems",
    desc: "End-to-end lead generation and nurturing pipelines: landing pages, follow-up sequences, booking funnels, and CRM integration tailored to luxury auto services.",
    tags: ["Lead Gen", "Funnels", "CRM", "Automation"],
    image: SITE_IMAGES.services[2],
    imageAlt: "Automotive conversion funnel results",
  },
  {
    num: "04",
    name: "Marketing Creatives",
    desc: "Scroll-stopping social content, paid ad creatives, and video assets built with the visual authority that luxury automotive brands demand.",
    tags: ["Social Ads", "Video", "Content", "Paid Media"],
    image: SITE_IMAGES.services[3],
    imageAlt: "Luxury automotive marketing creative",
  },
] as const;

const CASE_STUDIES = [
  {
    client: "Ceramic Pro Studio — Dubai",
    title: "Complete Digital Rebrand + Conversion System",
    desc: "New identity, high-performance website, and a full paid ads funnel that tripled qualified bookings within 90 days.",
    image: SITE_IMAGES.caseStudies[0],
    imageAlt: "Ceramic Pro Studio luxury vehicle detail",
    metrics: [
      { value: "340%", label: "Lead Increase" },
      { value: "$48k", label: "Monthly Revenue Added" },
      { value: "4.2×", label: "ROAS on Paid Ads" },
    ],
    stacked: false,
  },
  {
    client: "PPF Elite — Karachi",
    title: "SEO-Driven Web Experience",
    desc: "Built an SEO-engineered website that captured dominant search real estate in a competitive market within 6 months.",
    image: SITE_IMAGES.caseStudies[1],
    imageAlt: "PPF Elite paint protection project",
    metrics: [
      { value: "+220%", label: "Organic Traffic" },
      { value: "#1", label: "Local SEO Ranking" },
    ],
    stacked: true,
  },
  {
    client: "LuxTint Studio — Lahore",
    title: "Brand Identity + Full Growth System",
    desc: "Ground-up brand identity paired with automated lead nurturing that delivered 5× revenue growth in under three months.",
    image: SITE_IMAGES.caseStudies[2],
    imageAlt: "LuxTint Studio window tinting project",
    metrics: [
      { value: "5.1×", label: "Revenue Multiplier" },
      { value: "12wk", label: "Time to Results" },
    ],
    stacked: true,
  },
] as const;

const AutoElevatePage = (): React.ReactElement => {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [submitLabel, setSubmitLabel] = useState("Submit Inquiry →");
  const [navOpen, setNavOpen] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);
  const analBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  const codeColumns = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: i * 5.8,
        duration: 9 + Math.random() * 8,
        delay: -Math.random() * 12,
        text: Array.from(
          { length: 22 },
          () => CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
        ).join("  "),
      })),
    [],
  );

  const activateScene = useCallback((index: number) => {
    setActiveScene((prev) => {
      if (prev === index) return prev;

      if (index === 4) {
        analBarsRef.current.forEach((bar) => {
          if (!bar) return;
          bar.style.animation = "none";
          void bar.offsetHeight;
          bar.style.animation = "";
        });
      }

      return index;
    });
  }, []);

  const handleSubmit = (): void => {
    setSubmitLabel("✓ Message Received");
    setTimeout(() => setSubmitLabel("Submit Inquiry →"), 3000);
  };

  const handleDotClick = (index: number): void => {
    const spacer = scrollSpacerRef.current;
    if (!spacer) return;
    window.scrollTo({
      top: spacer.offsetHeight * (index / TOTAL_SCENES),
      behavior: "smooth",
    });
  };

  const handleNavLinkClick = (): void => {
    setNavOpen(false);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const finePointer = window.matchMedia("(pointer: fine)");
    const applyCursorMode = (): void => {
      document.body.classList.toggle("has-custom-cursor", finePointer.matches);
    };
    applyCursorMode();
    finePointer.addEventListener("change", applyCursorMode);

    const loaderTimer = window.setTimeout(() => setLoaderHidden(true), 2400);

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent): void => {
      if (!finePointer.matches) return;
      mx = e.clientX;
      my = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mx}px`;
        cursorDotRef.current.style.top = `${my}px`;
      }
    };

    const tick = (): void => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${rx}px`;
        cursorRingRef.current.style.top = `${ry}px`;
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMouseEnterInteractive = (): void => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = "translate(-50%, -50%) scale(2.2)";
      }
    };

    const onMouseLeaveInteractive = (): void => {
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    if (finePointer.matches) {
      rafId = requestAnimationFrame(tick);
    }

    const interactiveEls = document.querySelectorAll(
      "a, button, .service-card, .case-card, .spec-card, .dot",
    );
    interactiveEls.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: "#scroll-spacer",
      start: "top top",
      end: "bottom bottom",
      pin: "#cinematic-hero",
      pinSpacing: false,
      onUpdate: (self) => {
        activateScene(
          Math.min(Math.floor(self.progress * TOTAL_SCENES), TOTAL_SCENES - 1),
        );
      },
    });

    const onScroll = (): void => {
      if (gridLinesRef.current) {
        gridLinesRef.current.style.transform = `perspective(900px) rotateX(22deg) translateY(${-20 + window.scrollY * 0.008}%)`;
      }
    };

    window.addEventListener("scroll", onScroll);

    const onResize = (): void => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = [...el.parentElement!.querySelectorAll(".reveal")];
          window.setTimeout(
            () => el.classList.add("visible"),
            siblings.indexOf(el) * 85,
          );
          revealObs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

    return () => {
      window.clearTimeout(loaderTimer);
      finePointer.removeEventListener("change", applyCursorMode);
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      scrollTrigger.kill();
      revealObs.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activateScene]);

  return (
    <>
      <div id="loader" className={loaderHidden ? "hidden" : ""}>
        <div className="loader-logo">
          Auto<span>Elevate</span>
        </div>
        <div className="loader-bar-wrap">
          <div className="loader-bar" />
        </div>
        <div className="loader-sub">Luxury Automotive Digital Agency</div>
      </div>

      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />

      <nav>
        <div className="nav-logo">
          Auto<span>Elevate</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <a href="#contact" className="nav-cta">
          Start Project
        </a>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={navOpen}
          aria-controls="mobile-nav"
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`nav-mobile-panel${navOpen ? " open" : ""}`}
        aria-hidden={!navOpen}
      >
        <a href="#services" onClick={handleNavLinkClick}>
          Services
        </a>
        <a href="#work" onClick={handleNavLinkClick}>
          Work
        </a>
        <a href="#contact" onClick={handleNavLinkClick}>
          Contact
        </a>
        <a href="#contact" className="nav-cta" onClick={handleNavLinkClick}>
          Start Project
        </a>
      </div>

      <div className="scene-dots">
        {SCENE_LABELS.map((label, i) => (
          <div
            key={label}
            className={`dot${activeScene === i ? " active" : ""}`}
            data-scene={i}
            onClick={() => handleDotClick(i)}
            onKeyDown={(e) => e.key === "Enter" && handleDotClick(i)}
            role="button"
            tabIndex={0}
            aria-label={`Go to ${label} scene`}
          >
            <span className="dot-label">{label}</span>
          </div>
        ))}
      </div>

      <div id="scroll-spacer" ref={scrollSpacerRef}>
        <div id="cinematic-hero">
          <div className={`scene-canvas${activeScene === 0 ? " active" : ""}`} id="scene-0">
            <SceneBackground
              src={SITE_IMAGES.heroScenes[0]}
              alt="Orange Porsche GT3 RS on coastal road"
              priority
            />
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
            <div className="grid-lines" ref={gridLinesRef} />
            <div
              className="shimmer-line"
              style={{ top: "28%", animationDuration: "7s", animationDelay: "0s" }}
            />
            <div
              className="shimmer-line"
              style={{
                top: "55%",
                animationDuration: "9s",
                animationDelay: "2s",
                opacity: 0.6,
              }}
            />
            <div
              className="shimmer-line"
              style={{
                top: "72%",
                animationDuration: "11s",
                animationDelay: "4s",
                opacity: 0.4,
              }}
            />
          </div>

          <div className={`scene-canvas${activeScene === 1 ? " active" : ""}`} id="scene-1">
            <SceneBackground
              src={SITE_IMAGES.heroScenes[1]}
              alt="Silver Porsche at luxury estate"
            />
            <div className="ui-grid">
              <div className="ui-card-float">
                <div className="card-thumb">
                  <SiteImage
                    src={SITE_IMAGES.strategyCards[0]}
                    alt="Strategy analytics preview"
                    sizes="190px"
                  />
                </div>
                <div className="card-label">Strategy Score</div>
                <div className="card-num">94</div>
                <div className="card-bar accent" style={{ width: "94%" }} />
              </div>
              <div className="ui-card-float">
                <div className="card-thumb">
                  <SiteImage
                    src={SITE_IMAGES.strategyCards[1]}
                    alt="Lead quality dashboard preview"
                    sizes="240px"
                  />
                </div>
                <div className="card-label">Lead Quality</div>
                <div className="card-bar accent" />
                <div className="card-bar" style={{ width: "70%" }} />
                <div className="card-bar accent" style={{ width: "85%" }} />
              </div>
              <div className="ui-card-float">
                <div className="card-thumb">
                  <SiteImage
                    src={SITE_IMAGES.strategyCards[2]}
                    alt="Funnel ROI performance preview"
                    sizes="170px"
                  />
                </div>
                <div className="card-label">Funnel ROI</div>
                <div className="card-num">3.8×</div>
              </div>
              <div className="ui-card-float">
                <div className="card-thumb">
                  <SiteImage
                    src={SITE_IMAGES.strategyCards[3]}
                    alt="Market fit analysis preview"
                    sizes="210px"
                  />
                </div>
                <div className="card-label">Market Fit</div>
                <div className="card-bar accent" style={{ width: "88%" }} />
                <div className="card-bar" style={{ width: "60%" }} />
              </div>
            </div>
          </div>

          <div className={`scene-canvas${activeScene === 2 ? " active" : ""}`} id="scene-2">
            <SceneBackground
              src={SITE_IMAGES.heroScenes[2]}
              alt="Purple Porsche GT3 RS in forest setting"
            />
            <div className="mockup-frames">
              {SITE_IMAGES.designFrames.map((src, index) => (
                <div className="mock-frame" key={src}>
                  <SiteImage
                    src={src}
                    alt={`Luxury automotive design mockup ${index + 1}`}
                    sizes="(max-width: 640px) 100vw, 360px"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={`scene-canvas${activeScene === 3 ? " active" : ""}`} id="scene-3">
            <SceneBackground
              src={SITE_IMAGES.devScene}
              alt="Classic white Porsche in Paris at sunset"
            />
            <div className="code-rain">
              {codeColumns.map((col) => (
                <div
                  key={col.id}
                  className="code-col"
                  style={{
                    left: `${col.left}%`,
                    animationDuration: `${col.duration}s`,
                    animationDelay: `${col.delay}s`,
                  }}
                >
                  {col.text}
                </div>
              ))}
            </div>
            <div className="orb orb-1" style={{ opacity: 0.3, background: "#1a1a1a" }} />
          </div>

          <div className={`scene-canvas${activeScene === 4 ? " active" : ""}`} id="scene-4">
            <SceneBackground
              src={SITE_IMAGES.resultsScene}
              alt="Classic red Porsche at scenic lake overlook"
            />
            <div className="analytics-bg">
              {ANALYTICS_HEIGHTS.map((h, i) => (
                <div
                  key={h + i}
                  className="anal-bar"
                  ref={(el) => {
                    analBarsRef.current[i] = el;
                  }}
                  style={{ height: `${h}%`, animationDelay: `${i * 0.06}s` }}
                />
              ))}
            </div>
            <div className="anal-line" />
            <div
              className="orb orb-3"
              style={{
                background: "var(--silver)",
                opacity: 0.04,
                width: "500px",
                height: "500px",
              }}
            />
          </div>

          <div className={`scene-text${activeScene === 0 ? " active" : ""}`} id="text-0">
            <div className="scene-eyebrow">Luxury Automotive Digital Agency</div>
            <h1 className="scene-headline">
              We Build <em>Digital Power</em>
              <br />
              for Luxury Automotive
              <br />
              Brands
            </h1>
            <p className="scene-sub">
              Scroll to explore how we elevate automotive businesses beyond the competition.
            </p>
          </div>

          <div className={`scene-text${activeScene === 1 ? " active" : ""}`} id="text-1">
            <div className="scene-eyebrow">01 — Strategy</div>
            <h2 className="scene-headline">
              Strategy
              <br />
              <em>First</em> Approach
            </h2>
            <p className="scene-sub">
              Every campaign, funnel, and brand decision starts with deep market intelligence
              built exclusively for the luxury automotive space.
            </p>
          </div>

          <div className={`scene-text${activeScene === 2 ? " active" : ""}`} id="text-2">
            <div className="scene-eyebrow">02 — Design</div>
            <h2 className="scene-headline">
              Luxury
              <br />
              <em>Design</em> Systems
            </h2>
            <p className="scene-sub">
              Interfaces as refined as the vehicles your clients cherish — crafted with
              obsessive attention to every pixel, transition, and typographic moment.
            </p>
          </div>

          <div className={`scene-text${activeScene === 3 ? " active" : ""}`} id="text-3">
            <div className="scene-eyebrow">03 — Development</div>
            <h2 className="scene-headline">
              High Performance
              <br />
              <em>Web</em> Experiences
            </h2>
            <p className="scene-sub">
              Sub-second load times. 99+ Lighthouse scores. Technology engineered to match
              the performance pedigree of the brands we represent.
            </p>
          </div>

          <div className={`scene-text${activeScene === 4 ? " active" : ""}`} id="text-4">
            <div className="scene-eyebrow">04 — Results</div>
            <h2 className="scene-headline">
              Conversion
              <br />
              <em>Driven</em> Growth
            </h2>
            <p className="scene-sub">
              Every decision traces back to revenue. We engineer systems that turn
              high-intent visitors into high-value clients — consistently.
            </p>
          </div>

          <div className={`scroll-indicator${activeScene > 0 ? " hidden" : ""}`}>
            <span className="scroll-label">Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </div>

      <section id="positioning" className="section">
        <div className="pos-grid">
          <div>
            <p className="pos-eyebrow reveal">About AutoElevate</p>
            <h2 className="pos-headline reveal">
              The Agency Built
              <br />
              for <em>Automotive</em>
              <br />
              Luxury Brands
            </h2>
            <p className="pos-body reveal">
              We don&apos;t serve everyone. We serve the most discerning sector in the
              automotive world — luxury detailing, ceramic coating, PPF, and window tinting
              studios that refuse to be ordinary. Our niche is your advantage.
            </p>
            <p className="pos-body reveal">
              While generalist agencies dilute their expertise across dozens of industries,
              every tool, template, and strategy we deploy has been refined exclusively in
              the luxury automotive arena.
            </p>
            <div className="pos-visual reveal">
              <SiteImage
                src={SITE_IMAGES.positioning}
                alt="Luxury automotive studio craftsmanship"
                sizes="(max-width: 640px) 100vw, 600px"
              />
            </div>
          </div>
          <div className="pos-right">
            <div className="spec-card reveal">
              <div className="spec-num">100%</div>
              <div className="spec-label">Automotive Niche Focus</div>
            </div>
            <div className="spec-card reveal">
              <div className="spec-num">4× Avg</div>
              <div className="spec-label">Revenue Growth for Clients</div>
            </div>
            <div className="spec-card reveal">
              <div className="spec-num">72hr</div>
              <div className="spec-label">Project Onboarding Turnaround</div>
            </div>
            <div className="spec-card reveal">
              <div className="spec-num">48+</div>
              <div className="spec-label">Luxury Auto Brands Elevated</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="section-header">
          <p className="section-eyebrow reveal">What We Do</p>
          <h2 className="section-title reveal">
            Services Built for
            <br />
            <em>Premium</em> Brands
          </h2>
        </div>
        <div className="services-grid">
          {SERVICE_ITEMS.map((service) => (
            <div className="service-card reveal" key={service.num}>
              <div className="service-num">{service.num}</div>
              <div className="service-visual">
                <SiteImage
                  src={service.image}
                  alt={service.imageAlt}
                  sizes="(max-width: 640px) 100vw, 600px"
                />
              </div>
              <h3 className="service-name">{service.name}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-tags">
                {service.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="section">
        <div className="section-header">
          <p className="section-eyebrow reveal">Case Studies</p>
          <h2 className="section-title reveal">
            Brands We&apos;ve
            <br />
            <em>Transformed</em>
          </h2>
        </div>
        <div className="cases-grid">
          {CASE_STUDIES.map((study) => (
            <div className="case-card reveal" key={study.client}>
              <div className="case-visual">
                <div className="case-bg">
                  <SiteImage
                    src={study.image}
                    alt={study.imageAlt}
                    sizes="(max-width: 640px) 100vw, 800px"
                  />
                  <div className="case-bg-overlay" aria-hidden="true" />
                </div>
                <div
                  className="case-metrics"
                  style={
                    study.stacked
                      ? { flexDirection: "column", gap: "18px" }
                      : undefined
                  }
                >
                  {study.metrics.map((metric) => (
                    <div className="metric" key={metric.label}>
                      <div
                        className="metric-num"
                        style={study.stacked ? { fontSize: "50px" } : undefined}
                      >
                        <span>{metric.value}</span>
                      </div>
                      <div className="metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="case-info">
                <p className="case-client">{study.client}</p>
                <h3 className="case-title">{study.title}</h3>
                <p className="case-desc">{study.desc}</p>
                <div className="case-arrow">
                  <CaseArrowIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="section">
        <div className="cta-grid">
          <div className="cta-left">
            <div className="contact-visual reveal">
              <SiteImage
                src={SITE_IMAGES.contact}
                alt="Luxury automotive client consultation"
                sizes="(max-width: 640px) 100vw, 600px"
              />
            </div>
            <p className="cta-eyebrow reveal">Ready to Grow?</p>
            <h2 className="cta-headline reveal">
              Let&apos;s <em>Elevate</em>
              <br />
              Your Brand
            </h2>
            <p className="cta-sub reveal">
              We take on a limited number of new clients each quarter. If you&apos;re serious
              about transforming your luxury automotive business, let&apos;s start the
              conversation.
            </p>
            <a
              href="https://wa.me/1234567890"
              className="whatsapp-btn reveal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="cta-form reveal">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="first-name">
                  First Name
                </label>
                <input className="form-input" id="first-name" type="text" placeholder="Ahmad" />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="last-name">
                  Last Name
                </label>
                <input className="form-input" id="last-name" type="text" placeholder="Khan" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="business-name">
                Business Name
              </label>
              <input
                className="form-input"
                id="business-name"
                type="text"
                placeholder="Your Studio Name"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                placeholder="you@studio.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="service">
                Service Needed
              </label>
              <select className="form-select" id="service" defaultValue="">
                <option value="">Select a service...</option>
                <option>Web Design & Development</option>
                <option>Brand Identity</option>
                <option>Conversion Systems</option>
                <option>Marketing Creatives</option>
                <option>Full Growth Package</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="goals">
                Tell Us About Your Goals
              </label>
              <textarea
                className="form-textarea"
                id="goals"
                placeholder="What does success look like for your brand in 12 months?"
              />
            </div>
            <button className="submit-btn" type="button" onClick={handleSubmit}>
              {submitLabel}
            </button>
          </div>
        </div>
      </section>

      <section className="gallery-section" aria-label="Automotive portfolio gallery">
        <div className="gallery-track">
          {[...SITE_IMAGES.gallery, ...SITE_IMAGES.gallery].map((src, index) => (
            <div className="gallery-item" key={`${src}-${index}`}>
              <SiteImage
                src={src}
                alt={`Luxury automotive portfolio image ${(index % SITE_IMAGES.gallery.length) + 1}`}
                sizes="320px"
              />
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          Auto<span>Elevate</span>
        </div>
        <p className="footer-copy">© 2025 AutoElevate. All rights reserved.</p>
        <div className="footer-socials">
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Behance</a>
        </div>
      </footer>
    </>
  );
};

export default AutoElevatePage;
