import type { ServiceId } from "@/data/services";

type ServiceVisualProps = {
  id: ServiceId;
};

const CarMark = (): React.ReactElement => (
  <svg className="svc-car" viewBox="0 0 320 90" fill="none" aria-hidden="true">
    <path
      d="M24 60C32 48 44 36 72 30L98 12h86l36 18c28 4 54 16 68 30H24Z"
      fill="currentColor"
      opacity="0.16"
    />
    <path
      d="M98 14h70l28 16H86l12-16Z"
      fill="currentColor"
      opacity="0.08"
    />
    <path d="M18 78h284" stroke="currentColor" strokeWidth="0.7" opacity="0.35" />
    <circle cx="78" cy="64" r="13" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="78" cy="64" r="4.5" fill="currentColor" opacity="0.4" />
    <circle cx="236" cy="64" r="13" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="236" cy="64" r="4.5" fill="currentColor" opacity="0.4" />
  </svg>
);

const SearchMark = (): React.ReactElement => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.1" />
    <path d="M10.4 10.4 14 14" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
  </svg>
);

const WebsitesVisual = (): React.ReactElement => (
  <div className="svc-visual svc-visual--websites">
    <div className="svc-browser">
      <div className="svc-browser-bar">
        <span className="svc-browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="svc-browser-url">apex-detail.com</span>
      </div>
      <div className="svc-browser-page">
        <div className="svc-browser-nav">
          <span>APEX</span>
          <span>Ceramic · PPF · Tint</span>
          <span>Book</span>
        </div>
        <p className="svc-browser-kicker">Studio / Karachi</p>
        <p className="svc-browser-hero">
          Ceramic
          <br />
          Protection
        </p>
        <CarMark />
        <div className="svc-browser-meta">
          <span>PPF</span>
          <span>Tint</span>
          <span>Detail</span>
          <span>Coating</span>
        </div>
      </div>
    </div>
  </div>
);

const BookingVisual = (): React.ReactElement => (
  <div className="svc-visual svc-visual--booking">
    <div className="svc-phone">
      <div className="svc-phone-cap" aria-hidden="true" />
      <div className="svc-phone-screen">
        <p className="svc-phone-brand">APEX</p>
        <p className="svc-phone-title">Reserve a bay</p>
        <p className="svc-phone-service">Ceramic Pro · 90 min</p>
        <ul className="svc-slots">
          <li>10:00</li>
          <li>11:30</li>
          <li className="is-selected">14:30</li>
          <li>16:00</li>
        </ul>
        <div className="svc-phone-cta">Confirm bay</div>
      </div>
    </div>
    <div className="svc-ticket">
      <p className="svc-ticket-label">Inquiry</p>
      <p className="svc-ticket-id">AE — 0142</p>
      <p className="svc-ticket-body">Ceramic Pro</p>
      <p className="svc-ticket-meta">Today · 14:30</p>
      <p className="svc-ticket-status">Confirmed</p>
    </div>
  </div>
);

const GoogleVisual = (): React.ReactElement => (
  <div className="svc-visual svc-visual--google">
    <div className="svc-search">
      <SearchMark />
      <span>ceramic coating near me</span>
    </div>
    <div className="svc-local">
      <div className="svc-map" aria-hidden="true">
        {Array.from({ length: 48 }, (_, index) => (
          <span
            key={index}
            className={index === 21 ? "svc-map-cell is-pin" : "svc-map-cell"}
          />
        ))}
        <span className="svc-map-pin" />
      </div>
      <div className="svc-listing">
        <p className="svc-listing-name">Apex Detail</p>
        <p className="svc-listing-rating">4.9 · 214 reviews</p>
        <p className="svc-listing-meta">Open · 1.2 km · Book online</p>
        <p className="svc-listing-tags">Ceramic · PPF · Tint</p>
      </div>
    </div>
  </div>
);

const SOCIAL_TILES = [
  { id: "ppf", label: "PPF" },
  { id: "date", label: "04.12" },
  { id: "car", label: "CAR" },
  { id: "ceramic", label: "CERAMIC" },
  { id: "rating", label: "4.9" },
  { id: "tint", label: "TINT" },
] as const;

const SocialVisual = (): React.ReactElement => (
  <div className="svc-visual svc-visual--social">
    <div className="svc-social-head">
      <div className="svc-social-avatar" aria-hidden="true" />
      <div>
        <p className="svc-social-name">apex.detail</p>
        <p className="svc-social-stats">
          <span>12.4k</span> followers · <span>186</span> posts
        </p>
      </div>
      <span className="svc-social-follow">Follow</span>
    </div>
    <div className="svc-social-grid">
      {SOCIAL_TILES.map((tile) => (
        <div className={`svc-social-tile svc-social-tile--${tile.id}`} key={tile.id}>
          {tile.id === "car" ? <CarMark /> : tile.label}
        </div>
      ))}
    </div>
  </div>
);

const AdsVisual = (): React.ReactElement => (
  <div className="svc-visual svc-visual--ads">
    <div className="svc-ad">
      <p className="svc-ad-live">Live · Local 10 km</p>
      <p className="svc-ad-title">
        Protected.
        <br />
        Booked.
      </p>
      <p className="svc-ad-sub">Ceramic coating · Karachi</p>
      <div className="svc-ad-credits">
        <span>
          <em>18.4k</em> Reach
        </span>
        <span>
          <em>47</em> Leads
        </span>
        <span>
          <em>4.8×</em> ROAS
        </span>
      </div>
    </div>
  </div>
);

export const ServiceVisual = ({ id }: ServiceVisualProps): React.ReactElement => {
  switch (id) {
    case "websites":
      return <WebsitesVisual />;
    case "booking":
      return <BookingVisual />;
    case "google":
      return <GoogleVisual />;
    case "social":
      return <SocialVisual />;
    case "ads":
      return <AdsVisual />;
  }
};
