const BASE = "/assets/images";

export const SITE_IMAGES = {
  heroScenes: [
    `${BASE}/Black_Porsche_on_obsidian_floor_202606071731.jpeg`,
    `${BASE}/startegy.jpeg`,
    `${BASE}/Design.jpeg`,
    `${BASE}/702486655_984887874393620_5933982678827203144_n.jpg`,
    `${BASE}/714541445_18599934898032228_7729922358119254558_n.jpg`,
  ],
  designFrames: [
    `${BASE}/708959330_18597867088032228_5060838607141674680_n.jpg`,
    `${BASE}/709154706_18598608061032228_2567895004087057942_n.jpg`,
    `${BASE}/710447375_18597899845032228_4712168662689675004_n.jpg`,
  ],
  strategyCards: [
    `${BASE}/707357935_1526134869013669_2875947697207653629_n.jpg`,
    `${BASE}/704306838_18596005312032228_6093112112637296770_n.jpg`,
    `${BASE}/703726671_18595786963032228_3658821137218753079_n.jpg`,
    `${BASE}/705968189_18597475225032228_467517727496480128_n.jpg`,
  ],
  caseStudies: [
    `${BASE}/case-01.jpeg`,
    `${BASE}/case-02.jpeg`,
    `${BASE}/case-033.jpeg`,
  ],
  services: [
    `${BASE}/service-01.jpeg`,
    `${BASE}/service-02.jpeg`,
    `${BASE}/service-03.jpeg`,
    `${BASE}/service-04.jpeg`,
  ],
  positioning: `${BASE}/Agency%20Positioning.jpeg`,
  contact: `${BASE}/contact.jpeg`,
  devScene: `${BASE}/development.jpeg`,
  resultsScene: `${BASE}/results.jpeg`,
  gallery: [
    `${BASE}/709154706_18598608061032228_2567895004087057942_n.jpg`,
    `${BASE}/710447375_18597899845032228_4712168662689675004_n.jpg`,
    `${BASE}/708959330_18597867088032228_5060838607141674680_n.jpg`,
    `${BASE}/708967455_18598454383032228_1082559087565336138_n.jpg`,
  ],
} as const;

export type SiteImagePath = (typeof SITE_IMAGES)[keyof typeof SITE_IMAGES] extends readonly string[]
  ? (typeof SITE_IMAGES)[keyof typeof SITE_IMAGES][number]
  : string;
