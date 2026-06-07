import { SectionVideoBackground } from "@/components/autoelevate/section-video-background";
import { SITE_IMAGES } from "@/data/site-images";
import { SITE_VIDEOS } from "@/data/site-videos";

export const StatementBand = (): React.ReactElement => (
  <section id="philosophy" className="statement-band" aria-labelledby="philosophy-heading">
    <SectionVideoBackground
      src={SITE_VIDEOS.philosophyBackground}
      poster={SITE_IMAGES.contact}
      priority={3}
    />
    <div className="statement-band-inner">
      <h2 id="philosophy-heading" className="statement-piece statement-eyebrow">
        Our Philosophy
      </h2>
      <blockquote className="statement-piece statement-quote">
        We don&apos;t build websites.
        <br />
        We build <em>desire.</em>
      </blockquote>
      <p className="statement-piece statement-sub">
        Every pixel, every interaction, every conversion path — engineered for brands
        that refuse to blend in.
      </p>
      <div className="statement-line" aria-hidden="true" />
    </div>
  </section>
);
