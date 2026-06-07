import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/data/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.displayName,
    short_name: SITE_CONFIG.displayName,
    description: SITE_CONFIG.defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
