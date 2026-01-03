import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://filezen-tool.vercel.app/'

  // All your conversion combinations
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

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
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
    ...conversionUrls,
  ]
}