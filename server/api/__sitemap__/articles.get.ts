import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

const SITE_URL = process.env.NUXT_PUBLIC_SITE_URL || 'https://penyadap.pages.dev'

export default defineEventHandler(async (event) => {
  const articles = await serverQueryContent(event)
    .where({ _path: { $regex: '^/articles/' }, draft: { $ne: true } })
    .only(['_path', 'updatedAt', 'published', 'date', 'lastmod'])
    .find()

  return articles.map((article) => {
    const lastmod =
      article.lastmod ||
      article.updatedAt ||
      article.date ||
      article.published ||
      new Date().toISOString()

    return {
      loc: `${SITE_URL}${article._path}`,
      lastmod
    }
  })
})

