import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/setting',
    },
    sitemap: 'https://linkloud.co.kr/sitemap.xml',
  };
}
