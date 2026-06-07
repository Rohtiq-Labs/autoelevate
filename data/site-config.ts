const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://autoelevate.rl";

export const SITE_CONFIG = {
  url: siteUrl,
  name: "AutoElevate",
  legalName: "AutoElevate",
  brandOf: "Rohtiq Labs",
  tagline: "Luxury Automotive Digital Agency",
  defaultTitle:
    "AutoElevate | Luxury Automotive Digital Agency — Web Design, SEO & Growth",
  defaultDescription:
    "AutoElevate builds high-converting websites, brand systems, and growth funnels for luxury auto detailing, ceramic coating, PPF, and tint studios. Strategy-led digital agency serving Pakistan, UAE & worldwide.",
  locale: "en_US",
  phone: "+923239675581",
  phoneDisplay: "+92 323 9675581",
  whatsappUrl: "https://wa.me/923239675581",
  email: "info@rohtiqlabs.com",
  parentOrganization: {
    name: "Rohtiq Labs",
    url: "https://www.rohtiqlabs.com/",
  },
  address: {
    streetAddress: "Street #08, H-block, North Nazimabad",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    postalCode: "74700",
    addressCountry: "PK",
  },
  geo: {
    latitude: 24.9297,
    longitude: 67.0386,
  },
  serviceAreas: [
    "Karachi, Pakistan",
    "Lahore, Pakistan",
    "Islamabad, Pakistan",
    "Dubai, UAE",
    "Abu Dhabi, UAE",
    "Riyadh, Saudi Arabia",
    "GCC",
    "United States",
    "United Kingdom",
    "Worldwide (Remote)",
  ],
  social: {
    instagram: "https://www.instagram.com/autoelevate.rl/",
  },
  keywords: [
    "luxury automotive digital agency",
    "auto detailing website design",
    "ceramic coating marketing agency",
    "PPF studio web design",
    "window tinting SEO",
    "luxury car detailing branding",
    "automotive digital marketing Pakistan",
    "auto studio lead generation",
  ],
  ogImage: "/assets/images/contact.jpeg",
} as const;

export const SITE_ROUTES = {
  home: "/",
  services: "/#services",
  work: "/#work",
  about: "/#about",
  philosophy: "/#philosophy",
  faq: "/#faq",
  contact: "/#contact",
} as const;
