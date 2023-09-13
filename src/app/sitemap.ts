import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://linkloud.xyz',
      lastModified: new Date(),
    },
    {
      url: 'https://linkloud.xyz/login',
      lastModified: new Date(),
    },
    {
      url: 'https://linkloud.xyz/signup',
      lastModified: new Date(),
    },
    {
      url: 'https://linkloud.xyz/link',
      lastModified: new Date(),
    },
  ];
}
