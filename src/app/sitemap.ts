import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://filezen-tool.vercel.app'

  // 1. YOUR ORIGINAL IMAGE CONVERTER LOGIC (KEEPING THIS)
  const formats = ['png', 'jpg', 'webp', 'bmp']
  const conversions = []

  for (const from of formats) {
    for (const to of formats) {
      if (from !== to) {
        conversions.push(`${from}-to-${to}`)
      }
    }
  }

  const conversionUrls = conversions.map((slug) => ({
    url: `${baseUrl}/convert/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 2. NEW PDF GROWTH PATHS (ADDING THESE)
  const pdfKeywords = [
    'compress-pdf', 
    'pdf-reducer', 
    'pdf-size-optimizer', 
    'shrink-pdf', 
    'optimize-pdf'
  ]

  const pdfUrls = pdfKeywords.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9, // Higher priority for high-CPC business terms
  }))

  // 3. COMBINING EVERYTHING INTO THE FINAL RETURN
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...pdfUrls,        // Added PDF tools
    ...conversionUrls, // Kept all image tools
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`, // Critical for AdSense
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`, // Critical for AdSense
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}