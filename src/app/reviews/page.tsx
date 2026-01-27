import { getAllReviews } from '@/lib/sanity.fetch';
import { fallbackReviews, reviewStats } from '@/lib/data/reviews';
import ReviewsClient from './ReviewsClient';
import type { Review } from '@/lib/sanity.types';

export const metadata = {
  title: 'Client Reviews & Testimonials | Apis Digitech',
  description: 'See what business owners and marketing leaders say about working with Apis Digitech. Real results from real clients.',
};

export default async function ReviewsPage() {
  // Fetch from Sanity
  const sanityReviews = await getAllReviews();

  // Use Sanity data if available, otherwise use fallback
  const reviews: Review[] = sanityReviews.length > 0
    ? sanityReviews
    : fallbackReviews as Review[];

  return <ReviewsClient reviews={reviews} stats={reviewStats} />;
}
