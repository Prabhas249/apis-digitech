import { getAllFaqs } from '@/lib/sanity.fetch';
import { fallbackFaqs, groupFaqsByCategory } from '@/lib/data/faq';
import FaqClient from './FaqClient';
import type { FAQ } from '@/lib/sanity.types';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Apis Digitech',
  description: 'Find answers to common questions about our SEO services, pricing, and process.',
};

export default async function FAQPage() {
  // Fetch from Sanity
  const sanityFaqs = await getAllFaqs();

  // Use Sanity data if available, otherwise use fallback
  const faqs = sanityFaqs.length > 0 ? sanityFaqs : fallbackFaqs;

  // Group FAQs by category
  const faqsByCategory = groupFaqsByCategory(faqs as FAQ[]);

  return <FaqClient faqsByCategory={faqsByCategory} />;
}
