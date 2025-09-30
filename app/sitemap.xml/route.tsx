import { NextResponse } from "next/server"
import { headers } from "next/headers"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://cvfixaren.se"

function generateSiteMap() {
  const pages = [
    "",
    "/cv-mall",
    "/blogg",
    "/anvandarvillkor",
    "/marknadsforing",
    "/vanliga-fragor",
    "/kontakt",
    "/karriartips",
    "/intervjuguide",
    "/samarbetspartners",
  ]

  const blogPosts = [
    "sa-skriver-du-ett-cv-som-sticker-ut",
    "5-vanliga-misstag-att-undvika",
    "personligt-brev-guide",
    "linkedin-profil-optimering",
    "arbetsintervju-fragor-och-svar",
    "ai-och-framtidens-cv",
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${baseUrl}${page}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>${page === "" ? "1.0" : "0.8"}</priority>
            </url>
          `
        })
        .join("")}
      ${blogPosts
        .map((slug) => {
          return `
            <url>
              <loc>${baseUrl}/blogg/${slug}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>0.7</priority>
            </url>
          `
        })
        .join("")}
    </urlset>
  `

  return sitemap
}

export async function GET() {
  const headersList = headers()
  const host = headersList.get("host") || "cvfixaren.se"

  const sitemap = generateSiteMap()

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
