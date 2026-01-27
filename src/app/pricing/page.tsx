import { getAllPricing } from '@/lib/data';
import PricingClient from './PricingClient';

export const metadata = {
  title: 'Pricing - Transparent SEO Pricing | Apis Digitech',
  description: 'Choose the SEO, AEO, or GEO plan that fits your business goals. Transparent pricing with dedicated support and monthly reporting.',
};

export default async function PricingPage() {
  const allPricing = await getAllPricing();
  return <PricingClient allPricing={allPricing} />;
}
