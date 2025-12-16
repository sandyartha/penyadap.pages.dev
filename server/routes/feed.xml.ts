import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://penyadap.pages.dev'

export default defineEventHandler(async (event) => {
  const articles = await serverQueryContent(event)
    .where({ _path: { $regex: '^/articles/' }, draft: { $ne: true } })
    .sort({ published: -1, date: -1, createdAt: -1 })
    .limit(20)
    .find()

  const items = articles.map((article: any) => {
    const pubDate = article.published || article.date || article.createdAt || new Date()
    const pubDateFormatted = new Date(pubDate).toUTCString()
    const link = `${SITE_URL}${article._path}`
    const title = article.title || 'Untitled'
    const description = article.description || ''

    return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${description}]]></description>
      <pubDate>${pubDateFormatted}</pubDate>
    </item>`
  }).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>penyadap.pages.dev - Artikel</title>
    <link>${SITE_URL}</link>
    <description>Artikel dan panduan berguna seputar penggunaan aplikasi sadap hp dari mSpy dan keamanan digital keluarga.</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  event.node.res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  event.node.res.setHeader('Cache-Control', 'public, max-age=3600')

  return xml
})


