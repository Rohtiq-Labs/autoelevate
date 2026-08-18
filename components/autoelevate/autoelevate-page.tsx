"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AmbientLayer } from "@/components/autoelevate/ambient-layer";
import { BrandMarquee } from "@/components/autoelevate/brand-marquee";
import { CtaSection } from "@/components/autoelevate/cta-section";
import { ScrollProgress } from "@/components/autoelevate/scroll-progress";
import { SceneVideoBackground } from "@/components/autoelevate/scene-video-background";
import { ServicesSection } from "@/components/autoelevate/services-section";
import { SiteImage } from "@/components/autoelevate/site-image";
import { TestimonialsSection } from "@/components/autoelevate/testimonials-section";
import { WorkSection } from "@/components/autoelevate/work-section";
import { WhyAutoElevateSection } from "@/components/autoelevate/why-autoelevate-section";
import { SITE_IMAGES } from "@/data/site-images";
import { SITE_VIDEOS } from "@/data/site-videos";
import {
  animateLoaderExit,
  animateSceneText,
  initPremiumMotion,
} from "@/lib/premium-motion";

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

const AutoElevatePage = (): React.ReactElement => {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [loaderExiting, setLoaderExiting] = useState(false);
  const [activeScene, setActiveScene] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const scrollSpacerRef = useRef<HTMLDivElement>(null);
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

    const loaderTimer = window.setTimeout(() => {
      setLoaderExiting(true);
      animateLoaderExit(() => setLoaderHidden(true));
    }, 2400);

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
      "a, button, .work-stage, .dot",
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

    const onResize = (): void => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    const cleanupMotion = initPremiumMotion({
      scrollSpacer: scrollSpacerRef.current,
    });

    return () => {
      cleanupMotion();
      window.clearTimeout(loaderTimer);
      finePointer.removeEventListener("change", applyCursorMode);
      document.body.classList.remove("has-custom-cursor");
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      interactiveEls.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [activateScene]);

  useEffect(() => {
    if (!loaderHidden) return;
    animateSceneText(activeScene);
  }, [activeScene, loaderHidden]);

  useEffect(() => {
    if (!loaderHidden) return;
    animateSceneText(0);
  }, [loaderHidden]);

  return (
    <>
      <AmbientLayer />
      <ScrollProgress />

      <div
        id="loader"
        className={`${loaderHidden ? "hidden" : ""}${loaderExiting ? " exiting" : ""}`}
      >
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
        <a className="nav-logo" href="#cinematic-hero" aria-label="AutoElevate home">
          <Image
            src="/assets/logo/logo.png"
            alt="AutoElevate"
            width={669}
            height={373}
            priority
          />
        </a>
        <ul className="nav-links">
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>
        <a href="#cta" className="nav-cta">
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
        <a href="#testimonials" onClick={handleNavLinkClick}>
          Testimonials
        </a>
        <a href="#about" onClick={handleNavLinkClick}>
          About
        </a>
        <a href="#cta" className="nav-cta" onClick={handleNavLinkClick}>
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

      <main id="main-content">
      <div id="scroll-spacer" ref={scrollSpacerRef}>
        <div id="cinematic-hero" className={loaderHidden ? "hero-ready" : "hero-locked"}>
          <div className="hero-frame hero-frame-tl" aria-hidden="true" />
          <div className="hero-frame hero-frame-tr" aria-hidden="true" />
          <div className="hero-frame hero-frame-bl" aria-hidden="true" />
          <div className="hero-frame hero-frame-br" aria-hidden="true" />
          <div className="hero-shimmer" aria-hidden="true" />
          <div className={`scene-canvas${activeScene === 0 ? " active" : ""}`} id="scene-0">
            <SceneVideoBackground
              src={SITE_VIDEOS.heroBackground}
              poster={SITE_IMAGES.heroScenes[0]}
              isActive={activeScene === 0}
            />
          </div>

          <div className={`scene-canvas${activeScene === 1 ? " active" : ""}`} id="scene-1">
            <SceneBackground
              src={SITE_IMAGES.heroScenes[1]}
              alt="Luxury automotive strategy notebook and market analytics"
            />
          </div>

          <div className={`scene-canvas${activeScene === 2 ? " active" : ""}`} id="scene-2">
            <SceneBackground
              src={SITE_IMAGES.heroScenes[2]}
              alt="Luxury automotive website design on laptop screen"
            />
          </div>

          <div className={`scene-canvas${activeScene === 3 ? " active" : ""}`} id="scene-3">
            <SceneBackground
              src={SITE_IMAGES.devScene}
              alt="High-performance circuit board development technology"
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
              alt="Performance hub dashboard showing revenue growth and conversion metrics"
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

      <BrandMarquee />

      <ServicesSection />

      <WorkSection />

      <TestimonialsSection />

      <WhyAutoElevateSection />

      <CtaSection />
      </main>

      <footer>
        <a className="footer-logo" href="#cinematic-hero" aria-label="AutoElevate home">
          <Image
            src="/assets/logo/logo.png"
            alt="AutoElevate"
            width={669}
            height={373}
          />
        </a>
        <p className="footer-copy">
          © 2026 AutoElevate, a brand of{" "}
          <a
            className="footer-brand-link"
            href="https://www.rohtiqlabs.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rohtiq Labs
          </a>
          . All rights reserved.
        </p>
        <div className="footer-nav">
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#about">About</a>
          <a href="#cta">Start Project</a>
        </div>
        <div className="footer-socials">
          <a
            href="https://www.instagram.com/autoelevate.rl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a href="#">LinkedIn</a>
        </div>
      </footer>
    </>
  );
};

export default AutoElevatePage;
