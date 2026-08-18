import { SiteImage } from "@/components/autoelevate/site-image";
import { SITE_IMAGES } from "@/data/site-images";

export const WhyAutoElevateSection = (): React.ReactElement => (
  <section id="about" className="why-ae" aria-labelledby="why-ae-heading">
    <svg
      className="why-ae-mark"
      viewBox="0 0 240 160"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M28 148 L96 18 L164 148"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M18 118 C78 118 78 78 132 78 L214 78"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M164 18 H214 M164 78 H214 M164 148 H214"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
      />
    </svg>

    <div className="why-ae-inner">
      <div className="why-ae-stage">
        <div className="why-ae-copy">
          <p className="why-ae-label">Why AutoElevate</p>
          <h2 id="why-ae-heading" className="why-ae-headline">
            <span className="why-ae-line">
              <span>Built for Automotive.</span>
            </span>
            <span className="why-ae-line">
              <span>Not Built for Everyone.</span>
            </span>
          </h2>
          <p className="why-ae-support">
            Websites and digital experiences designed around the way automotive
            businesses actually sell — their work, their services, and their
            customers.
          </p>
        </div>

        <div className="why-ae-visual">
          <div className="why-ae-frame">
            <div className="why-ae-chrome" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <div className="why-ae-shot">
              <SiteImage
                src={SITE_IMAGES.work[0]}
                alt="Prestige Auto Salon website — an AutoElevate digital experience for a luxury automotive studio"
                sizes="(max-width: 640px) 100vw, 58vw"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="why-ae-base">
        <p className="why-ae-industries">
          Detailing · PPF · Ceramic · Tint · Wraps
        </p>
        <div className="why-ae-rule" aria-hidden="true" />
        <p className="why-ae-close">Custom by Design / Automotive by Focus</p>
      </div>
    </div>
  </section>
);
