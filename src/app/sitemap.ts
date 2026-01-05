import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://filezen-tool.vercel.app'

  // 1. ORIGINAL IMAGE CONVERTER LOGIC (UNCHANGED)
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

  // 2. PDF COMPRESSOR KEYWORDS (UNCHANGED)
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
    priority: 0.9,
  }))

  // 3. FINAL RETURN (With ALL Tools: Merge, Protect, Compress)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Tool 1: Merge PDF
    {
      url: `${baseUrl}/merge-pdf`, 
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, 
    },
    // Tool 2: Protect PDF (NEW ADDITION)
    {
      url: `${baseUrl}/protect-pdf`, 
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9, 
    },
    ...pdfUrls,        // PDF Compressor paths
    ...conversionUrls, // Image Converter paths
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
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]
}