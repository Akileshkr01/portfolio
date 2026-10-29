import type { MetadataRoute } from "next";
import { site } from "@/data/resume";
import { stripPlaceholder } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = stripPlaceholder(site.url) ?? "http://localhost:3000";
  return [{ url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
