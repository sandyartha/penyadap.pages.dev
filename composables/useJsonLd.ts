/**
 * JSON-LD Schema Generator for Nuxt 3 + @nuxt/seo
 * 
 * Generates valid schema.org JSON-LD structured data
 * Compatible with defineSeoMeta({ jsonLd: ... })
 */

type JsonLdType = 'index' | 'page' | 'post';

interface JsonLdData {
  title?: string;
  description?: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  url?: string;
}

const DEFAULT_SITE_URL = 'https://penyadap.pages.dev';

/**
 * Makes a URL absolute if it's relative
 */
function makeAbsoluteUrl(url: string | undefined, baseUrl: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${cleanBase}${cleanUrl}`;
}

/**
 * Normalizes site URL and ensures no trailing slash
 */
function normalizeSiteUrl(siteUrl?: string): string {
  if (!siteUrl) return DEFAULT_SITE_URL;
  return siteUrl.replace(/\/$/, '');
}

/**
 * Generates JSON-LD schema for "index" type (WebSite + Organization + SearchAction)
 */
function generateIndexSchema(data: JsonLdData, siteUrl: string): object[] {
  const url = makeAbsoluteUrl(data.url, siteUrl) || siteUrl;
  const image = makeAbsoluteUrl(data.image, siteUrl) || `${siteUrl}/default.png`;

  const websiteSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: data.title || 'penyadap.pages.dev',
    description: data.description,
    inLanguage: 'id-ID',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/articles?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  const organizationSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: 'penyadap.pages.dev',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: image,
      width: 512,
      height: 512
    },
    sameAs: []
  };

  // Only include description if provided
  if (data.description) {
    websiteSchema.description = data.description;
  }

  return [websiteSchema, organizationSchema];
}

/**
 * Generates JSON-LD schema for "page" type (WebPage)
 */
function generatePageSchema(data: JsonLdData, siteUrl: string): object {
  const url = makeAbsoluteUrl(data.url, siteUrl) || siteUrl;
  const image = makeAbsoluteUrl(data.image, siteUrl) || `${siteUrl}/default.png`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: data.title,
    inLanguage: 'id-ID',
    isPartOf: {
      '@id': `${siteUrl}/#website`
    },
    about: {
      '@id': `${siteUrl}/#organization`
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: image
    }
  };

  if (data.description) {
    schema.description = data.description;
  }

  if (data.datePublished) {
    schema.datePublished = data.datePublished;
  }

  if (data.dateModified) {
    schema.dateModified = data.dateModified;
  }

  return schema;
}

/**
 * Generates JSON-LD schema for "post" type (BlogPosting)
 */
function generatePostSchema(data: JsonLdData, siteUrl: string): object {
  const url = makeAbsoluteUrl(data.url, siteUrl);
  
  if (!url) {
    throw new Error('URL is required for BlogPosting schema');
  }

  const image = makeAbsoluteUrl(data.image, siteUrl) || `${siteUrl}/default.png`;

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    url,
    headline: data.title,
    inLanguage: 'id-ID',
    isPartOf: {
      '@id': `${siteUrl}/#website`
    },
    author: {
      '@type': 'Person',
      name: data.author || 'penyadap.pages.dev'
    },
    publisher: {
      '@id': `${siteUrl}/#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${url}#webpage`
    },
    image: {
      '@type': 'ImageObject',
      url: image
    }
  };

  if (data.description) {
    schema.description = data.description;
  }

  if (data.datePublished) {
    schema.datePublished = data.datePublished;
  }

  if (data.dateModified) {
    schema.dateModified = data.dateModified;
  } else if (data.datePublished) {
    // Use datePublished as fallback for dateModified
    schema.dateModified = data.datePublished;
  }

  return schema;
}

/**
 * Main composable function
 * 
 * @param type - Schema type: 'index', 'page', or 'post'
 * @param data - Optional data for the schema
 * @returns JSON-LD schema object or array compatible with defineSeoMeta
 * 
 * @example
 * // For index page
 * const jsonLd = useJsonLd('index', {
 *   title: 'My Website',
 *   description: 'Website description'
 * });
 * useSeoMeta({ jsonLd });
 * 
 * @example
 * // For blog post
 * const jsonLd = useJsonLd('post', {
 *   title: 'Blog Post Title',
 *   description: 'Post description',
 *   datePublished: '2025-01-01',
 *   author: 'Author Name'
 * });
 * useSeoMeta({ jsonLd });
 */
export const useJsonLd = (
  type: JsonLdType,
  data: JsonLdData = {},
  options?: { siteUrl?: string }
): object | object[] => {
  const siteUrl = normalizeSiteUrl(options?.siteUrl);

  const finalData: JsonLdData = {
    ...data,
    url: makeAbsoluteUrl(data?.url, siteUrl) || siteUrl
  };

  switch (type) {
    case 'index':
      return generateIndexSchema(finalData, siteUrl);
    
    case 'page':
      if (!finalData.title) {
        throw new Error('Title is required for WebPage schema');
      }
      return generatePageSchema(finalData, siteUrl);
    
    case 'post':
      if (!finalData.title) {
        throw new Error('Title is required for BlogPosting schema');
      }
      return generatePostSchema(finalData, siteUrl);
    
    default:
      throw new Error(`Unknown schema type: ${type}`);
  }
};

