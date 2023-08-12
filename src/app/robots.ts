import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/my/profile',
    },
    sitemap: 'https://linkloud.co.kr/sitemap.xml',
  };
}
