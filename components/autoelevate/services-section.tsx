"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { ServiceVisual } from "@/components/autoelevate/service-visuals";
import { SERVICES } from "@/data/services";

import "./services-section.css";

const selectServiceOnHover = (): boolean =>
  window.matchMedia("(pointer: fine)").matches;

export const ServicesSection = (): React.ReactElement => {
  const [activeIndex, setActiveIndex] = useState(0);
  const indexRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeService = SERVICES[activeIndex] ?? SERVICES[0];

  const moveIndicator = useCallback((index: number): void => {
    const item = itemRefs.current[index];
    const indicator = indicatorRef.current;
    const list = indexRef.current;
    if (!item || !indicator || !list) return;

    indicator.style.transform = `translateY(${item.offsetTop}px)`;
    indicator.style.height = `${item.offsetHeight}px`;
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => moveIndicator(activeIndex));
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, moveIndicator]);

  useEffect(() => {
    const onResize = (): void => moveIndicator(activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeIndex, moveIndicator]);

  const activate = (index: number): void => {
    setActiveIndex(index);
  };

  const handleIndexKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ): void => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Home" && event.key !== "End") {
      return;
    }

    event.preventDefault();
    const last = SERVICES.length - 1;
    let next = index;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    activate(next);
    itemRefs.current[next]?.focus();
  };

  return (
    <section id="services" className="section services-section">
      <div className="services-desktop">
        <div className="services-copy">
          <p className="services-eyebrow reveal">Services / 01—05</p>
          <h2 className="services-headline reveal">
            What We Build.
            <br />
            What We <em>Grow.</em>
          </h2>

          <div
            className="services-index reveal"
            ref={indexRef}
            role="tablist"
            aria-label="Services"
            aria-orientation="vertical"
          >
            <span className="services-index-indicator" ref={indicatorRef} aria-hidden="true" />
            {SERVICES.map((service, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  id={`services-tab-${service.id}`}
                  className={`services-index-item${selected ? " is-active" : ""}`}
                  aria-selected={selected}
                  aria-controls="services-panel"
                  tabIndex={selected ? 0 : -1}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  onMouseEnter={() => {
                    if (selectServiceOnHover()) activate(index);
                  }}
                  onFocus={() => activate(index)}
                  onClick={() => activate(index)}
                  onKeyDown={(event) => handleIndexKeyDown(event, index)}
                >
                  <span className="services-index-num">{service.num}</span>
                  <span className="services-index-name">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="services-stage reveal"
          role="tabpanel"
          id="services-panel"
          aria-labelledby={`services-tab-${activeService.id}`}
        >
          <div className="services-stage-copy" key={activeService.id} aria-live="polite">
            <p className="services-stage-kicker">
              <span>{activeService.num}</span>
              <span aria-hidden="true">/</span>
              <span>05</span>
            </p>
            <h3 className="services-stage-title">
              {activeService.titleLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p className="services-stage-desc">{activeService.description}</p>
          </div>

          <div className="services-visual" aria-hidden="true">
            <span className="services-visual-frame services-visual-frame--tl" />
            <span className="services-visual-frame services-visual-frame--tr" />
            <span className="services-visual-frame services-visual-frame--bl" />
            <span className="services-visual-frame services-visual-frame--br" />
            {SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`services-visual-slide${index === activeIndex ? " is-active" : ""}`}
              >
                <ServiceVisual id={service.id} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="services-mobile">
        <p className="services-eyebrow reveal">Services / 01—05</p>
        <h2 className="services-headline reveal">
          What We Build.
          <br />
          What We <em>Grow.</em>
        </h2>

        <ol className="services-chapters">
          {SERVICES.map((service) => (
            <li className="services-chapter reveal" key={service.id}>
              <p className="services-chapter-num">{service.num}</p>
              <h3 className="services-chapter-title">
                {service.titleLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h3>
              <div className="services-chapter-visual" aria-hidden="true">
                <ServiceVisual id={service.id} />
              </div>
              <p className="services-chapter-desc">{service.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
