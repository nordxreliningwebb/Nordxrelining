import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.nordxrelining.se';

    const staticRoutes = [
        '',
        '/om-oss',
        '/kontakt',
        '/priser',
        '/relining',
        '/stamspolning',
        '/rorinspektion',
        '/projekt',
        '/kunskapsbanken',
        '/faq',
        '/cookies',
        '/integritetspolicy',
        '/kopvillkor'
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return [
        ...staticRoutes,
    ];
}
