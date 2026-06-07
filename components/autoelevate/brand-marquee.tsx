import { BRAND_MARQUEE_ITEMS } from "@/data/brand-marquee";

const MARQUEE_ITEMS = [...BRAND_MARQUEE_ITEMS, ...BRAND_MARQUEE_ITEMS];

export const BrandMarquee = (): React.ReactElement => (
  <section className="brand-marquee" aria-label="Luxury automotive brands we work with">
    <div className="brand-marquee-track">
      <div className="brand-marquee-content">
        {MARQUEE_ITEMS.map((brand, index) => (
          <span className="brand-marquee-item" key={`${brand}-${index}`}>
            {brand}
          </span>
        ))}
      </div>
    </div>
  </section>
);
