# Overview

This is a Nuxt 3-based website for a parental control service focused on the Indonesian market. The site promotes mSpy and similar monitoring applications for tracking and monitoring mobile devices (iPhone and Android). It features a content-driven architecture with markdown articles about phone monitoring, tracking, and surveillance capabilities.

The application is built with Nuxt 3, using the Nuxt UI component library for styling, Nuxt Content for article management, and is optimized for deployment on Cloudflare Pages.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: Nuxt 3 (Vue 3-based meta-framework)
- Server-side rendering (SSR) and static site generation capabilities
- File-based routing using the `pages/` directory
- Component-based architecture with Vue 3 Composition API

**UI Framework**: Nuxt UI (v2.11.1)
- Built on top of Tailwind CSS v3.4.18
- Custom theme configuration with primary blue color scheme
- Typography support via @tailwindcss/typography
- Custom shadow utilities (`zoop` and `zoopdark`)

**Styling Approach**:
- Tailwind CSS with custom configuration
- Global CSS in `assets/css/tailwind.css`
- Custom prose styling for markdown content with image display handling
- Custom color palette extending the default Tailwind theme

**Content Management**: Nuxt Content (v2.13.4)
- Markdown-based article system in `content/articles/` directory
- Frontmatter metadata support (title, description, tags, published date, etc.)
- Support for draft and preview states
- Custom rehype plugins for enhanced markdown processing (autolink headings, slug generation)
- GitHub Flavored Markdown support via remark-gfm

## Routing and Pages

**Static Content**:
- Homepage content from `content/index.md`
- Article pages dynamically generated from markdown files
- File-based routing for automatic page generation

**SEO Optimization**:
- @nuxtjs/seo module for meta tags and structured data
- Sitemap generation with dynamic article URLs via `server/api/__sitemap__/articles.get.ts`
- Google site verification configured
- Web app manifest for PWA support

## Development and Build Configuration

**Development Server**:
- Configured to run on port 5000 (configurable via PORT env var)
- Host set to 0.0.0.0 for container/Replit compatibility
- Devtools enabled in development mode

**Production Build**:
- Target platform: Cloudflare Pages (nitro preset)
- SSG prerendering with link crawling enabled
- Tree-shaking enabled via esbuild
- Minification enabled
- External dependencies inlined (sharp, @parcel/watcher)

**Font Management**:
- Google Fonts integration (@nuxtjs/google-fonts v3.1.1)
- Fontaine for font metric optimization
- Inter as primary sans-serif font family

## Content Structure

**Article Schema**:
- Published date tracking
- Draft/preview state management
- Tag categorization (android, iphone, nokia, PC)
- Author attribution
- Thumbnail images
- Description and SEO metadata
- Table of contents support

**Content Categories**:
- Phone monitoring tutorials
- App-specific guides (WhatsApp, Instagram, Facebook, etc.)
- Device tracking and location services
- Surveillance and parenting control topics

# External Dependencies

## Third-Party Services

**SEO and Analytics**:
- Google Search Console verification (google32937f75643c9cd6.html)
- Sitemap generation for search engine indexing

**Fonts**:
- Google Fonts API for Inter font family
- Fallback to system fonts (Avenir Next, Roboto, etc.)

## Deployment Platform

**Cloudflare Pages**:
- Static site hosting and CDN
- Configured via nitro preset in nuxt.config.ts
- Custom domain: penyadap.pages.dev (default), configurable via NUXT_PUBLIC_SITE_URL

## Development Tools

**Nuxt Studio**: Development environment integration (@nuxthq/studio v1.0.6) - only loaded in development mode

**Icons**: 
- @iconify-json/lucide for icon set
- nuxt-icon module for icon rendering

## NPM Packages

**Core Dependencies**:
- Vue 3 (via Nuxt 3)
- @nuxt/ui (v2.11.1) - UI component library
- @nuxt/content (v2.13.4) - Content management
- @nuxtjs/seo (v3.2.2) - SEO utilities
- @nuxt/image (v1.1.0) - Image optimization

**Build Tools**:
- Tailwind CSS (v3.4.18)
- PostCSS (implicit via Tailwind)
- TypeScript configuration extends Nuxt's generated config

**Image Processing**:
- Sharp (v0.34.5) for server-side image optimization
- Configured as ignored built dependency for pnpm

**Markdown Processing**:
- rehype-autolink-headings (v7.1.0)
- rehype-slug (v6.0.0)
- remark-gfm (v4.0.1)

## Build and Deployment Notes

- Environment variables control site URL and development behavior
- Replit-specific host detection via REPL_SLUG and REPL_OWNER env vars
- Sharp and Parcel Watcher marked as external/inline to avoid bundling issues
- Compatibility date set to 2025-11-08 for Nitro engine