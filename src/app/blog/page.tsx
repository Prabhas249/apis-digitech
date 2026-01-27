import { getAllBlogPosts, getFeaturedBlogPost } from '@/lib/sanity.fetch';
import { fallbackBlogPosts, fallbackFeaturedPost, blogCategories } from '@/lib/data/blog';
import BlogClient from './BlogClient';
import type { BlogPost } from '@/lib/sanity.types';

export const metadata = {
  title: 'Blog - SEO Insights & Industry Updates | Apis Digitech',
  description: 'Stay ahead with expert insights on SEO, AEO, GEO, and digital marketing strategies from Apis Digitech.',
};

export default async function BlogPage() {
  // Fetch from Sanity
  const [sanityPosts, sanityFeatured] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPost(),
  ]);

  // Use Sanity data if available, otherwise use fallback
  const posts: BlogPost[] = sanityPosts.length > 0 ? sanityPosts : fallbackBlogPosts as BlogPost[];
  const featuredPost: BlogPost | null = sanityFeatured || fallbackFeaturedPost as BlogPost;

  // Extract unique categories from posts
  const uniqueCategories = new Set<string>();
  posts.forEach(post => {
    if (post.category) uniqueCategories.add(post.category);
  });
  if (featuredPost?.category) uniqueCategories.add(featuredPost.category);

  const categories = ['All', ...Array.from(uniqueCategories)];
  const finalCategories = categories.length > 1 ? categories : blogCategories;

  return <BlogClient posts={posts} featuredPost={featuredPost} categories={finalCategories} />;
}
