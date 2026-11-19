import type { APIRoute } from 'astro';
import { SITE } from '@/data/site';

export const GET: APIRoute = () => {
  if (SITE.isStaging) {
    return new Response(
      [
        '# Staging environment — block all crawlers until production cutover',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n'),
      {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      }
    );
  }

  return new Response(
    [
      '# Salwah Events and Catering — Production robots.txt',
      'User-agent: *',
      'Allow: /',
      'Disallow: /admin',
      'Disallow: /admin/',
      '',
      'User-agent: GPTBot',
      'Allow: /',
      'Disallow: /admin',
      '',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      'Disallow: /admin',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      'Disallow: /admin',
      '',
      'User-agent: ClaudeBot',
      'Allow: /',
      'Disallow: /admin',
      '',
      `Sitemap: ${SITE.siteUrl}/sitemap.xml`,
      `Sitemap: ${SITE.siteUrl}/sitemap-index.xml`,
      '',
    ].join('\n'),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    }
  );
};
