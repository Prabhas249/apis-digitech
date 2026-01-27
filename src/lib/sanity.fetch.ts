import { client, revalidate, isSanityConfigured } from './sanity';
import {
  allBlogPostsQuery,
  featuredBlogPostQuery,
  blogPostBySlugQuery,
  allPricingQuery,
  pricingByCategoryQuery,
  allReviewsQuery,
  featuredReviewsQuery,
  allFaqQuery,
  faqByCategoryQuery,
  allCaseStudiesQuery,
  caseStudyBySlugQuery,
  allServicesQuery,
  serviceBySlugQuery,
  homepageQuery,
  siteSettingsQuery,
} from './queries';
import type {
  BlogPost,
  PricingPlan,
  Review,
  FAQ,
  CaseStudy,
  Service,
  Homepage,
  SiteSettings,
} from './sanity.types';

// Helper to safely fetch from Sanity
async function safeFetch<T>(query: string, params = {}, defaultValue: T): Promise<T> {
  if (!isSanityConfigured) {
    console.warn('Sanity is not configured. Using default values.');
    return defaultValue;
  }
  try {
    return await client.fetch(query, params, { next: { revalidate } });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return defaultValue;
  }
}

// Blog fetchers
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return safeFetch(allBlogPostsQuery, {}, []);
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  return safeFetch(featuredBlogPostQuery, {}, null);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return safeFetch(blogPostBySlugQuery, { slug }, null);
}

// Pricing fetchers
export async function getAllPricing(): Promise<PricingPlan[]> {
  return safeFetch(allPricingQuery, {}, []);
}

export async function getPricingByCategory(category: string): Promise<PricingPlan[]> {
  return safeFetch(pricingByCategoryQuery, { category }, []);
}

// Review fetchers
export async function getAllReviews(): Promise<Review[]> {
  return safeFetch(allReviewsQuery, {}, []);
}

export async function getFeaturedReviews(): Promise<Review[]> {
  return safeFetch(featuredReviewsQuery, {}, []);
}

// FAQ fetchers
export async function getAllFaqs(): Promise<FAQ[]> {
  return safeFetch(allFaqQuery, {}, []);
}

export async function getFaqsByCategory(category: string): Promise<FAQ[]> {
  return safeFetch(faqByCategoryQuery, { category }, []);
}

// Case Study fetchers
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return safeFetch(allCaseStudiesQuery, {}, []);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return safeFetch(caseStudyBySlugQuery, { slug }, null);
}

// Service fetchers
export async function getAllServices(): Promise<Service[]> {
  return safeFetch(allServicesQuery, {}, []);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return safeFetch(serviceBySlugQuery, { slug }, null);
}

// Homepage fetcher
export async function getHomepage(): Promise<Homepage | null> {
  return safeFetch(homepageQuery, {}, null);
}

// Site Settings fetcher
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch(siteSettingsQuery, {}, null);
}

// Export config check for components
export { isSanityConfigured };
