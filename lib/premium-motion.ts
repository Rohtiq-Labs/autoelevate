import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type PremiumMotionOptions = {
  scrollSpacer: HTMLElement | null;
  onHeroProgress?: (progress: number) => void;
};

const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const initPremiumMotion = ({
  scrollSpacer,
  onHeroProgress,
}: PremiumMotionOptions): (() => void) => {
  if (prefersReducedMotion()) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    document
      .querySelectorAll<HTMLElement>(
        ".why-ae-label, .why-ae-support, .why-ae-visual, .why-ae-base, .why-ae-line span",
      )
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
    return () => undefined;
  }

  gsap.registerPlugin(ScrollTrigger);

  const cleanups: Array<() => void> = [];
  const progressBar = document.querySelector<HTMLElement>(".scroll-progress-bar");
  const heroRailFill = document.querySelector<HTMLElement>(".hero-scroll-rail-fill");
  const nav = document.querySelector("nav");

  const setScrollProgress = (progress: number): void => {
    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`;
    }
  };

  const onPageScroll = (): void => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    setScrollProgress(progress);

    if (nav) {
      nav.classList.toggle("scrolled", window.scrollY > 48);
    }
  };

  window.addEventListener("scroll", onPageScroll, { passive: true });
  onPageScroll();
  cleanups.push(() => window.removeEventListener("scroll", onPageScroll));

  if (scrollSpacer) {
    const heroTrigger = ScrollTrigger.create({
      trigger: scrollSpacer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress;
        onHeroProgress?.(progress);
        if (heroRailFill) {
          heroRailFill.style.transform = `scaleY(${progress})`;
        }

        const activeCanvas = document.querySelector<HTMLElement>(".scene-canvas.active");
        const bgImage = activeCanvas?.querySelector<HTMLElement>(".scene-bg-image, .scene-bg-video");
        if (bgImage) {
          gsap.set(bgImage, { y: progress * 42 - 21 });
        }
      },
    });
    cleanups.push(() => heroTrigger.kill());
  }

  gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          overwrite: true,
        });
      },
    });
    cleanups.push(() => trigger.kill());
  });

  gsap.utils.toArray<HTMLElement>(".reveal-group").forEach((group) => {
    const items = group.querySelectorAll<HTMLElement>(".reveal-item");
    const trigger = ScrollTrigger.create({
      trigger: group,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          items,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.14,
            ease: "power3.out",
          },
        );
      },
    });
    cleanups.push(() => trigger.kill());
  });

  const whySection = document.querySelector<HTMLElement>("#about.why-ae");
  if (whySection) {
    const label = whySection.querySelector<HTMLElement>(".why-ae-label");
    const lines = whySection.querySelectorAll<HTMLElement>(".why-ae-line span");
    const support = whySection.querySelector<HTMLElement>(".why-ae-support");
    const visual = whySection.querySelector<HTMLElement>(".why-ae-visual");
    const base = whySection.querySelector<HTMLElement>(".why-ae-base");

    const whyTrigger = ScrollTrigger.create({
      trigger: whySection,
      start: "top 78%",
      once: true,
      onEnter: () => {
        if (label) {
          gsap.fromTo(
            label,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          );
        }
        if (lines.length) {
          gsap.fromTo(
            lines,
            { y: "108%" },
            { y: "0%", duration: 1.05, stagger: 0.1, ease: "power3.out", delay: 0.08 },
          );
        }
        if (support) {
          gsap.fromTo(
            support,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, delay: 0.28, ease: "power2.out" },
          );
        }
        if (visual) {
          gsap.fromTo(
            visual,
            { y: 28, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.15, delay: 0.16, ease: "power3.out" },
          );
        }
        if (base) {
          gsap.fromTo(
            base,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, delay: 0.38, ease: "power2.out" },
          );
        }
      },
    });
    cleanups.push(() => whyTrigger.kill());
  }

  gsap.utils.toArray<HTMLElement>(".work-piece").forEach((piece) => {
    const copy = piece.querySelector<HTMLElement>(".work-copy");
    const stage = piece.querySelector<HTMLElement>(".work-stage");
    const trigger = ScrollTrigger.create({
      trigger: piece,
      start: "top 82%",
      once: true,
      onEnter: () => {
        if (copy) {
          gsap.fromTo(
            copy,
            { y: 36, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.05, ease: "power3.out" },
          );
        }
        if (stage) {
          gsap.fromTo(
            stage,
            { y: 48, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, delay: 0.12, ease: "power3.out" },
          );
        }
      },
    });
    cleanups.push(() => trigger.kill());
  });

  return () => {
    cleanups.forEach((cleanup) => cleanup());
  };
};

export const animateSceneText = (sceneIndex: number): void => {
  if (prefersReducedMotion()) return;

  const activeText = document.querySelector<HTMLElement>(`#text-${sceneIndex}`);
  if (!activeText) return;

  const pieces = activeText.querySelectorAll<HTMLElement>(
    ".scene-eyebrow, .scene-headline, .scene-sub",
  );

  gsap.fromTo(
    pieces,
    { y: 48, opacity: 0, filter: "blur(12px)" },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.05,
      stagger: 0.14,
      ease: "power3.out",
      overwrite: true,
    },
  );
};

export const animateLoaderExit = (onComplete: () => void): void => {
  const loader = document.getElementById("loader");
  if (!loader || prefersReducedMotion()) {
    onComplete();
    return;
  }

  gsap
    .timeline({
      onComplete,
    })
    .to(".loader-logo", { scale: 1.08, duration: 0.4, ease: "power2.out" })
    .to(
      loader,
      {
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
      },
      0.2,
    )
    .to(
      "#cinematic-hero",
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      0.35,
    );
};
