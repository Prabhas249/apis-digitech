// Fallback FAQ data when Sanity is not configured or empty
export const fallbackFaqs = [
  {
    _id: 'faq-1',
    question: 'What services does Apis Digitech offer?',
    answer: 'We offer comprehensive digital marketing services including Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO), Link Building, and Content Marketing. Our services are designed to improve your online visibility across traditional search engines and AI-powered platforms.',
    category: 'General',
    order: 1,
  },
  {
    _id: 'faq-2',
    question: 'How long does it take to see results from SEO?',
    answer: 'SEO is a long-term strategy. While some improvements can be seen within 3-6 months, significant results typically take 6-12 months. The timeline depends on factors like your industry competition, website condition, and the scope of work needed.',
    category: 'General',
    order: 2,
  },
  {
    _id: 'faq-3',
    question: 'Do you offer customized packages?',
    answer: 'Yes! We understand that every business has unique needs. We offer customized packages tailored to your specific goals, budget, and industry requirements. Contact us for a personalized proposal.',
    category: 'General',
    order: 3,
  },
  {
    _id: 'faq-4',
    question: 'What is the difference between SEO, AEO, and GEO?',
    answer: 'SEO (Search Engine Optimization) focuses on ranking in traditional search engines like Google. AEO (Answer Engine Optimization) optimizes content for voice search and featured snippets. GEO (Generative Engine Optimization) ensures your content is cited by AI platforms like ChatGPT and Perplexity.',
    category: 'SEO Services',
    order: 1,
  },
  {
    _id: 'faq-5',
    question: 'Do you guarantee first page rankings?',
    answer: 'No reputable SEO agency can guarantee specific rankings because search algorithms are controlled by Google and other search engines. However, we use proven strategies and best practices to significantly improve your visibility and rankings over time.',
    category: 'SEO Services',
    order: 2,
  },
  {
    _id: 'faq-6',
    question: 'What is included in your SEO audit?',
    answer: 'Our comprehensive SEO audit includes technical analysis (site speed, mobile-friendliness, crawlability), on-page review (content, meta tags, structure), off-page assessment (backlink profile, domain authority), competitor analysis, and keyword opportunity research.',
    category: 'SEO Services',
    order: 3,
  },
  {
    _id: 'faq-7',
    question: 'What are your pricing models?',
    answer: 'We offer flexible pricing including monthly retainer packages starting from $997/month, project-based pricing for specific campaigns, and hourly consulting rates. Visit our pricing page or contact us for detailed information.',
    category: 'Pricing & Contracts',
    order: 1,
  },
  {
    _id: 'faq-8',
    question: 'Do you require long-term contracts?',
    answer: 'We typically recommend a minimum 6-month commitment for SEO services to see meaningful results. However, we offer flexible arrangements and month-to-month options after the initial period.',
    category: 'Pricing & Contracts',
    order: 2,
  },
  {
    _id: 'faq-9',
    question: 'What payment methods do you accept?',
    answer: 'We accept major credit cards, bank transfers, and PayPal. Payment terms and schedules are outlined in your service agreement.',
    category: 'Pricing & Contracts',
    order: 3,
  },
  {
    _id: 'faq-10',
    question: 'How do you report on progress?',
    answer: 'We provide detailed monthly reports that include keyword rankings, organic traffic metrics, conversion data, backlink acquisition, and completed tasks. We also schedule regular strategy calls to discuss progress and adjustments.',
    category: 'Process & Reporting',
    order: 1,
  },
  {
    _id: 'faq-11',
    question: 'Will I have a dedicated account manager?',
    answer: 'Yes, every client is assigned a dedicated account manager who serves as your primary point of contact. They coordinate with our specialists and ensure your campaigns run smoothly.',
    category: 'Process & Reporting',
    order: 2,
  },
  {
    _id: 'faq-12',
    question: 'How often do you communicate with clients?',
    answer: "Communication frequency depends on your package and preferences. At minimum, you'll receive monthly reports and strategy calls. Many clients prefer bi-weekly check-ins, which we're happy to accommodate.",
    category: 'Process & Reporting',
    order: 3,
  },
];

export const faqCategories = ['General', 'SEO Services', 'Pricing & Contracts', 'Process & Reporting'];

export function groupFaqsByCategory(faqs: typeof fallbackFaqs) {
  const grouped: Record<string, typeof fallbackFaqs> = {};

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
