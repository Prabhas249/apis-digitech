import { getAllPricing } from '@/lib/sanity.fetch';
import { getAllFallbackPricing } from '@/lib/data/pricing';
import PricingClient from './PricingClient';
import type { PricingPlan } from '@/lib/sanity.types';

export const metadata = {
  title: 'Pricing - Transparent SEO Pricing | Apis Digitech',
  description: 'Choose the SEO, AEO, or GEO plan that fits your business goals. Transparent pricing with dedicated support and monthly reporting.',
};

export default async function PricingPage() {
  // Fetch from Sanity
  const sanityPricing = await getAllPricing();

  // Use Sanity data if available, otherwise use fallback
  const allPricing: PricingPlan[] = sanityPricing.length > 0
    ? sanityPricing
    : getAllFallbackPricing() as PricingPlan[];

  return <PricingClient allPricing={allPricing} />;
}
