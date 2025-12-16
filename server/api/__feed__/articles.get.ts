import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const articles = await serverQueryContent(event)
    .where({ _path: { $regex: '^/articles/' }, draft: { $ne: true } })
    .sort({ published: -1, date: -1, createdAt: -1 })
    .limit(20)
    .find()

  return articles.map((article: any) => {
    const pubDate = article.published || article.date || article.createdAt || new Date()
    return {
      title: article.title || 'Untitled',
      _path: article._path,
      description: article.description || '',
      published: pubDate
    }
  })
})
