import { getAllBlogPosts, getFeaturedBlogPost, getBlogCategories } from '@/lib/data';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog - SEO Insights & Industry Updates | Apis Digitech',
  description: 'Stay ahead with expert insights on SEO, AEO, GEO, and digital marketing strategies from Apis Digitech.',
};

export default async function BlogPage() {
  const [posts, featuredPost, categories] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPost(),
    getBlogCategories(),
  ]);

  return <BlogClient posts={posts} featuredPost={featuredPost} categories={categories} />;
}
