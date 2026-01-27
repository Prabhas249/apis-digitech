import { getAllCaseStudies, getCaseStudyStats } from '@/lib/data';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata = {
  title: 'Case Studies - Success Stories | Apis Digitech',
  description: 'Real results from real clients. Explore how we have helped businesses achieve their digital marketing goals.',
};

export default async function CaseStudiesPage() {
  const [caseStudies, stats] = await Promise.all([
    getAllCaseStudies(),
    getCaseStudyStats(),
  ]);

  return <CaseStudiesClient caseStudies={caseStudies} stats={stats} />;
}
