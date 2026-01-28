import { getHomepage } from '@/lib/data';
import HomeContent from './HomeContent';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getHomepage() as {
    hero: {
      title: string;
      subtitle: string;
      ctaText: string;
      ctaLink: string;
      secondaryCtaText: string;
      secondaryCtaLink: string;
    };
    stats: { value: string; label: string }[];
    cta: {
      title: string;
      subtitle: string;
      buttonText: string;
      buttonLink: string;
    };
  };

  return <HomeContent data={data} />;
}
