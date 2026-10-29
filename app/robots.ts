import type { MetadataRoute } from "next";
import { site } from "@/data/resume";
import { stripPlaceholder } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const url = stripPlaceholder(site.url) ?? "http://localhost:3000";
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${url}/sitemap.xml`,
  };
}
