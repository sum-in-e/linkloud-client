import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https:/linkloud.co.kr',
      lastModified: new Date(),
    },
    {
      url: 'https:/linkloud.co.kr/login',
      lastModified: new Date(),
    },
    {
      url: 'https:/linkloud.co.kr/signup',
      lastModified: new Date(),
    },
    {
      url: 'https:/linkloud.co.kr/kloud',
      lastModified: new Date(),
    },
    {
      url: 'https:/linkloud.co.kr/setting',
      lastModified: new Date(),
    },
  ];
}
