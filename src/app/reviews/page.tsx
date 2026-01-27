import { getAllReviews, getReviewStats } from '@/lib/data';
import ReviewsClient from './ReviewsClient';

export const metadata = {
  title: 'Client Reviews & Testimonials | Apis Digitech',
  description: 'See what business owners and marketing leaders say about working with Apis Digitech. Real results from real clients.',
};

export default async function ReviewsPage() {
  const [reviews, stats] = await Promise.all([
    getAllReviews(),
    getReviewStats(),
  ]);

  return <ReviewsClient reviews={reviews} stats={stats} />;
}
