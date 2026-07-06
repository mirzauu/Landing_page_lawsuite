import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/adminali", "/email-sender"],
    },
    sitemap: "https://verbalex.ai/sitemap.xml",
  }
}
