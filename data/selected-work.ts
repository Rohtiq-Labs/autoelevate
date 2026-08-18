import { SITE_IMAGES } from "@/data/site-images";

export type SelectedWorkItem = {
  name: string;
  description: string;
  screenshot: string;
  screenshotAlt: string;
  previewUrl: string;
  domain: string;
};

export const SELECTED_WORK: SelectedWorkItem[] = [
  {
    name: "Prestige Auto Salon",
    description:
      "A modern, luxury-focused digital experience designed to reflect Prestige Auto Salon’s 25+ years of automotive expertise.",
    screenshot: SITE_IMAGES.work[0],
    screenshotAlt: "Prestige Auto Salon website hero with luxury vehicle and precision protection headline",
    previewUrl: "https://prestige-auto-salon.vercel.app/",
    domain: "prestige-auto-salon.vercel.app",
  },
  {
    name: "MZ Extraordinary Details",
    description:
      "A premium, booking-focused website crafted for MZ Extraordinary Details, showcasing their luxury detailing services with a clean, modern digital experience built around their brand.",
    screenshot: SITE_IMAGES.work[1],
    screenshotAlt: "MZ Extraordinary Details website hero with luxury detailing studio photography",
    previewUrl: "https://mz-extraordinary-details.vercel.app/",
    domain: "mz-extraordinary-details.vercel.app",
  },
  {
    name: "831 Ricardo Detailing",
    description:
      "A bold black-and-white digital experience crafted to reflect 831 Ricardo Detailing’s premium approach to automotive care.",
    screenshot: SITE_IMAGES.work[2],
    screenshotAlt: "831 Ricardo Detailing website hero with black-and-white luxury automotive photography",
    previewUrl: "https://831-ricardo-detailing.vercel.app/",
    domain: "831-ricardo-detailing.vercel.app",
  },
];
