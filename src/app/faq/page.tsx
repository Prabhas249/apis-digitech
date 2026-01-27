import { getAllFaqs, getFaqCategories, type FAQ } from '@/lib/data';
import FaqClient from './FaqClient';

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Apis Digitech',
  description: 'Find answers to common questions about our SEO services, pricing, and process.',
};

function groupFaqsByCategory(faqs: FAQ[]) {
  const grouped: Record<string, FAQ[]> = {};

  for (const faq of faqs) {
    if (!grouped[faq.category]) {
      grouped[faq.category] = [];
    }
    grouped[faq.category].push(faq);
  }

  return Object.entries(grouped).map(([category, questions]) => ({
    category,
    questions: questions.sort((a, b) => a.order - b.order),
  }));
}

export default async function FAQPage() {
  const faqs = await getAllFaqs();
  const faqsByCategory = groupFaqsByCategory(faqs);

  return <FaqClient faqsByCategory={faqsByCategory} />;
}
