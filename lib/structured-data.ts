import { SEO_FAQ_ITEMS } from "@/data/seo-faq";
import { SITE_CONFIG, SITE_ROUTES } from "@/data/site-config";

const absoluteUrl = (path: string): string =>
  `${SITE_CONFIG.url}${path.startsWith("/") ? path : `/${path}`}`;

export const getOrganizationSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_CONFIG.url}/#organization`,
  name: SITE_CONFIG.displayName,
  alternateName: [SITE_CONFIG.name, "AutoElevate Luxury Automotive Digital Agency"],
  legalName: SITE_CONFIG.legalName,
  url: SITE_CONFIG.url,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/icon.svg"),
    width: 48,
    height: 48,
  },
  image: absoluteUrl("/apple-icon.svg"),
  description: SITE_CONFIG.defaultDescription,
  email: SITE_CONFIG.email,
  telephone: SITE_CONFIG.phone,
  parentOrganization: {
    "@type": "Organization",
    name: SITE_CONFIG.parentOrganization.name,
    url: SITE_CONFIG.parentOrganization.url,
  },
  sameAs: [SITE_CONFIG.social.instagram],
  brand: {
    "@type": "Brand",
    name: SITE_CONFIG.displayName,
  },
});

export const getLocalBusinessSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_CONFIG.url}/#localbusiness`,
  name: SITE_CONFIG.displayName,
  image: absoluteUrl("/apple-icon.svg"),
  logo: absoluteUrl("/icon.svg"),
  url: SITE_CONFIG.url,
  telephone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  priceRange: "$$$$",
  description: SITE_CONFIG.defaultDescription,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.addressLocality,
    addressRegion: SITE_CONFIG.address.addressRegion,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE_CONFIG.geo.latitude,
    longitude: SITE_CONFIG.geo.longitude,
  },
  areaServed: SITE_CONFIG.serviceAreas.map((area) => ({
    "@type": "Place",
    name: area,
  })),
  parentOrganization: {
    "@type": "Organization",
    name: SITE_CONFIG.parentOrganization.name,
    url: SITE_CONFIG.parentOrganization.url,
  },
  sameAs: [SITE_CONFIG.social.instagram],
  knowsAbout: [
    "Luxury automotive web design",
    "Auto detailing SEO",
    "Ceramic coating marketing",
    "PPF studio branding",
    "Window tinting lead generation",
  ],
});

export const getWebsiteSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_CONFIG.url}/#website`,
  name: SITE_CONFIG.displayName,
  alternateName: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description: SITE_CONFIG.defaultDescription,
  publisher: {
    "@id": `${SITE_CONFIG.url}/#organization`,
  },
  inLanguage: "en-US",
});

export const getServiceSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_CONFIG.url}/#services`,
  name: "Luxury Automotive Digital Marketing Services",
  provider: {
    "@id": `${SITE_CONFIG.url}/#organization`,
  },
  areaServed: SITE_CONFIG.serviceAreas.map((area) => ({
    "@type": "Place",
    name: area,
  })),
  serviceType: [
    "Luxury automotive web design and development",
    "Auto detailing brand identity",
    "Conversion funnel and CRM systems",
    "Automotive marketing creatives and paid media",
    "Local SEO for PPF and ceramic coating studios",
  ],
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(SITE_ROUTES.contact),
  },
});

export const getFaqSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_CONFIG.url}/#faq`,
  mainEntity: SEO_FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const getBreadcrumbSchema = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_CONFIG.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: absoluteUrl(SITE_ROUTES.services),
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Case Studies",
      item: absoluteUrl(SITE_ROUTES.work),
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: absoluteUrl(SITE_ROUTES.contact),
    },
  ],
});

export const getStructuredDataGraph = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@graph": [
    getOrganizationSchema(),
    getLocalBusinessSchema(),
    getWebsiteSchema(),
    getServiceSchema(),
    getFaqSchema(),
    getBreadcrumbSchema(),
  ],
});
