"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { TESTIMONIALS } from "@/data/testimonials";

import "./testimonials-section.css";

const TOTAL = TESTIMONIALS.length;

const padIndex = (index: number): string => String(index + 1).padStart(2, "0");

const getInitials = (name: string): string =>
  (name.trim().charAt(0) || "").toUpperCase();

export const TestimonialsSection = (): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const skipScrollSync = useRef(false);

  const active = TESTIMONIALS[activeIndex] ?? TESTIMONIALS[0];

  const scrollToSlide = useCallback((index: number): void => {
    const track = trackRef.current;
    const slide = slideRefs.current[index];
    if (!track || !slide) return;
    skipScrollSync.current = true;
    track.scrollTo({ left: slide.offsetLeft, behavior: "smooth" });
    window.setTimeout(() => {
      skipScrollSync.current = false;
    }, 420);
  }, []);

  const activate = (index: number): void => {
    setActiveIndex(index);
    scrollToSlide(index);
  };

  const step = (direction: -1 | 1): void => {
    const next = (activeIndex + direction + TOTAL) % TOTAL;
    activate(next);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = (): void => {
      if (skipScrollSync.current) return;
      const slides = slideRefs.current.filter(Boolean) as HTMLElement[];
      if (slides.length === 0) return;

      const midpoint = track.scrollLeft + track.clientWidth / 2;
      let nearest = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      slides.forEach((slide, index) => {
        const center = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(center - midpoint);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = index;
        }
      });

      setActiveIndex((current) => (current === nearest ? current : nearest));
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const handleIndexKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Home" && event.key !== "End") {
      return;
    }

    event.preventDefault();
    const last = TOTAL - 1;
    let next = index;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    setActiveIndex(next);
  };

  return (
    <section id="testimonials" className="section testimonials-section">
      <header className="testimonials-header">
        <p className="testimonials-eyebrow reveal">Testimonials / 01—{padIndex(TOTAL - 1)}</p>
        <h2 className="testimonials-title reveal">
          Trusted by Studios That
          <br />
          <em>Refuse Ordinary</em>
        </h2>
      </header>

      <div className="testimonials-desktop">
        <div className="testimonials-index reveal" role="tablist" aria-label="Client testimonials" aria-orientation="vertical">
          {TESTIMONIALS.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`testimonial-tab-${index}`}
                className={`testimonials-index-item${selected ? " is-active" : ""}`}
                aria-selected={selected}
                aria-controls="testimonial-panel"
                tabIndex={selected ? 0 : -1}
                onMouseEnter={() => {
                  if (window.matchMedia("(pointer: fine)").matches) setActiveIndex(index);
                }}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleIndexKeyDown(event, index)}
              >
                <span className="testimonials-index-num">{padIndex(index)}</span>
                <span className="testimonials-index-copy">
                  <span className="testimonials-index-name">{item.name}</span>
                  {item.role ? <span className="testimonials-index-role">{item.role}</span> : null}
                </span>
              </button>
            );
          })}
        </div>

        <figure
          className="testimonials-stage reveal"
          role="tabpanel"
          id="testimonial-panel"
          aria-labelledby={`testimonial-tab-${activeIndex}`}
        >
          <p className="testimonials-count">
            {padIndex(activeIndex)} <span aria-hidden="true">/</span> {padIndex(TOTAL - 1)}
          </p>
          <blockquote className="testimonials-quote" key={active.name} aria-live="polite">
            {active.quote}
          </blockquote>
          <figcaption className="testimonials-person">
            <span className="testimonials-mono" aria-hidden="true">
              {getInitials(active.name)}
            </span>
            <span>
              <span className="testimonials-name">{active.name}</span>
              {active.role ? <span className="testimonials-role">{active.role}</span> : null}
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="testimonials-mobile">
        <div
          className="testimonials-track"
          ref={trackRef}
          tabIndex={0}
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              step(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              step(-1);
            }
          }}
        >
          {TESTIMONIALS.map((item, index) => (
            <article
              className="testimonials-slide"
              key={item.name}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              aria-hidden={index !== activeIndex}
              aria-label={`${index + 1} of ${TOTAL}`}
            >
              <p className="testimonials-count">
                {padIndex(index)} <span aria-hidden="true">/</span> {padIndex(TOTAL - 1)}
              </p>
              <blockquote className="testimonials-quote">{item.quote}</blockquote>
              <div className="testimonials-person">
                <span className="testimonials-mono" aria-hidden="true">
                  {getInitials(item.name)}
                </span>
                <span>
                  <span className="testimonials-name">{item.name}</span>
                  {item.role ? <span className="testimonials-role">{item.role}</span> : null}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="testimonials-controls">
          <button type="button" className="testimonials-nav" onClick={() => step(-1)} aria-label="Previous testimonial">
            Prev
          </button>
          <div className="testimonials-dots" role="tablist" aria-label="Testimonial slides">
            {TESTIMONIALS.map((item, index) => (
              <button
                key={item.name}
                type="button"
                className={`testimonials-dot${index === activeIndex ? " is-active" : ""}`}
                aria-label={`Show testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => activate(index)}
              />
            ))}
          </div>
          <button type="button" className="testimonials-nav" onClick={() => step(1)} aria-label="Next testimonial">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
