import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/data/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_CONFIG.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
