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

  const statementBand = document.querySelector<HTMLElement>(".statement-band");
  if (statementBand) {
    const trigger = ScrollTrigger.create({
      trigger: statementBand,
      start: "top 75%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          statementBand.querySelectorAll(".statement-piece"),
          { y: 60, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.18,
            ease: "power3.out",
          },
        );
        gsap.fromTo(
          statementBand.querySelector(".statement-line"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "power2.inOut", delay: 0.4 },
        );
      },
    });
    cleanups.push(() => trigger.kill());
  }

  const posVisual = document.querySelector<HTMLElement>(".pos-visual");
  if (posVisual) {
    const trigger = ScrollTrigger.create({
      trigger: posVisual,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        gsap.set(posVisual, { y: (self.progress - 0.5) * -60 });
      },
    });
    cleanups.push(() => trigger.kill());
  }

  gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, index) => {
    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { y: 56, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          {
            y: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            delay: (index % 2) * 0.1,
            ease: "power3.out",
          },
        );
      },
    });
    cleanups.push(() => trigger.kill());
  });

  gsap.utils.toArray<HTMLElement>(".case-card").forEach((card, index) => {
    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.fromTo(
          card,
          { y: 64, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: index * 0.12,
            ease: "power3.out",
          },
        );

        const metrics = card.querySelectorAll<HTMLElement>(".metric-num span");
        gsap.fromTo(
          metrics,
          { scale: 0.6, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "back.out(1.6)",
            delay: 0.25,
          },
        );
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
