import { createClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export const dynamic = 'force-dynamic'

// Function to determine priority and changefreq based on route
function getRouteMetadata(route) {
  // Default values
  let priority = '0.5'
  let changefreq = 'weekly'

  // Set higher priority for main pages
  if (route === '/') {
    priority = '1.0'
    changefreq = 'daily'
  } else if (['/blog', '/sermons', '/events'].includes(route)) {
    priority = '0.8'
    changefreq = 'daily'
  } else if (['/first-time-here', '/beliefs'].includes(route)) {
    priority = '0.9'
    changefreq = 'monthly'
  } else if (route.startsWith('/blog/')) {
    priority = '0.6'
    changefreq = 'monthly'
  } else if (route.startsWith('/sermons/')) {
    priority = '0.7'
    changefreq = 'monthly'
  } else if (route.includes('admin')) {
    // Skip admin routes
    return null
  }

  return { priority, changefreq }
}

// Function to fetch all sermons from YouTube
async function fetchAllSermons() {
  try {
    // Use the cached YouTube API endpoint with environment variable
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/youtube`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.items || []
  } catch (error) {
    console.error('Error fetching sermons:', error)
    return []
  }
}

export default async function sitemap() {
  try {
    const supabase = await createClient()
    
    // Get custom sitemap entries from Supabase
    const { data: customSitemap } = await supabase
      .from('site_maps')
      .select('content')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single()

    // Get all published blog posts
    const { data: blogs } = await supabase
      .from('blogs')
      .select('slug, updated_at')
      .order('updated_at', { ascending: false })

    // Get all sermons from YouTube
    const sermons = await fetchAllSermons()

    // Define known routes
    const knownRoutes = [
      '/',
      '/blog',
      '/sermons',
      '/events',
      '/first-time-here',
      '/beliefs',
      '/refresh-youth',
      '/womens-ministry',
      '/stories',
      '/privacy-policy',
      '/contact',
      '/give',
      '/leadership',
      '/missions-and-outreach',
      '/refresh-grants',
      '/mens-ministry',
      '/r-kids',
      '/discovery',
      '/visit-us',
      '/copyright',
      '/disclaimer',
      '/terms-and-conditions'
    ]

    // Start building the sitemap entries
    const sitemapEntries = []

    // Add static routes
    for (const route of knownRoutes) {
      const metadata = getRouteMetadata(route)
      if (metadata) {
        sitemapEntries.push({
          url: `https://refresh.church${route}`,
          lastModified: new Date(),
          changeFrequency: metadata.changefreq,
          priority: parseFloat(metadata.priority)
        })
      }
    }

    // Add blog posts
    if (blogs) {
      for (const blog of blogs) {
        sitemapEntries.push({
          url: `https://refresh.church/blog/${blog.slug}`,
          lastModified: new Date(blog.updated_at),
          changeFrequency: 'monthly',
          priority: 0.6
        })
      }
    }

    // Add sermons
    if (sermons) {
      for (const sermon of sermons) {
        sitemapEntries.push({
          url: `https://refresh.church/sermons/${slugify(sermon.snippet.title)}`,
          lastModified: new Date(sermon.snippet.publishedAt),
          changeFrequency: 'monthly',
          priority: 0.7
        })
      }
    }

    // Add custom sitemap entries if they exist
    if (customSitemap?.content) {
      // Extract URLs from custom sitemap content
      const customUrls = customSitemap.content.match(/<url>[\s\S]*?<\/url>/g) || []
      for (const url of customUrls) {
        const locMatch = url.match(/<loc>(.*?)<\/loc>/)
        const lastmodMatch = url.match(/<lastmod>(.*?)<\/lastmod>/)
        const changefreqMatch = url.match(/<changefreq>(.*?)<\/changefreq>/)
        const priorityMatch = url.match(/<priority>(.*?)<\/priority>/)

        if (locMatch) {
          sitemapEntries.push({
            url: locMatch[1],
            lastModified: lastmodMatch ? new Date(lastmodMatch[1]) : new Date(),
            changeFrequency: changefreqMatch ? changefreqMatch[1] : 'weekly',
            priority: priorityMatch ? parseFloat(priorityMatch[1]) : 0.5
          })
        }
      }
    }

    return sitemapEntries
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return a basic sitemap in case of error
    return [{
      url: 'https://refresh.church',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0
    }]
  }
} 