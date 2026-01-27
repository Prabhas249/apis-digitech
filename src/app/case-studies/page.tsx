import { getAllCaseStudies } from '@/lib/sanity.fetch';
import { fallbackCaseStudies, caseStudyStats } from '@/lib/data/case-studies';
import CaseStudiesClient from './CaseStudiesClient';
import type { CaseStudy } from '@/lib/sanity.types';

export const metadata = {
  title: 'Case Studies - Success Stories | Apis Digitech',
  description: 'Real results from real clients. Explore how we have helped businesses achieve their digital marketing goals.',
};

export default async function CaseStudiesPage() {
  // Fetch from Sanity
  const sanityCaseStudies = await getAllCaseStudies();

  // Use Sanity data if available, otherwise use fallback
  const caseStudies: CaseStudy[] = sanityCaseStudies.length > 0
    ? sanityCaseStudies
    : fallbackCaseStudies as CaseStudy[];

  return <CaseStudiesClient caseStudies={caseStudies} stats={caseStudyStats} />;
}
