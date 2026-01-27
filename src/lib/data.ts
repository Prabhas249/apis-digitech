// Data fetching utilities for JSON-based CMS
import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');

async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

// Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  content: string;
}

export interface PricingPlan {
  _id: string;
  name: string;
  category: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular: boolean;
  order: number;
}

export interface Review {
  _id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  result: string;
  featured: boolean;
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  industry: string;
  preview: string;
  metric: string;
  metricLabel: string;
  timeline: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
  clientName: string;
}

// Blog functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const data = await readJsonFile<{ posts: BlogPost[]; categories: string[] }>('blog.json');
  return data.posts;
}

export async function getFeaturedBlogPost(): Promise<BlogPost | null> {
  const data = await readJsonFile<{ posts: BlogPost[]; categories: string[] }>('blog.json');
  return data.posts.find(p => p.featured) || data.posts[0] || null;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await readJsonFile<{ posts: BlogPost[]; categories: string[] }>('blog.json');
  return data.posts.find(p => p.slug === slug) || null;
}

export async function getBlogCategories(): Promise<string[]> {
  const data = await readJsonFile<{ posts: BlogPost[]; categories: string[] }>('blog.json');
  return data.categories;
}

// Pricing functions
export async function getAllPricing(): Promise<PricingPlan[]> {
  const data = await readJsonFile<{ plans: PricingPlan[]; tabs: unknown[] }>('pricing.json');
  return data.plans;
}

export async function getPricingByCategory(category: string): Promise<PricingPlan[]> {
  const data = await readJsonFile<{ plans: PricingPlan[]; tabs: unknown[] }>('pricing.json');
  return data.plans.filter(p => p.category === category);
}

// Reviews functions
export async function getAllReviews(): Promise<Review[]> {
  const data = await readJsonFile<{ reviews: Review[]; stats: unknown[] }>('reviews.json');
  return data.reviews;
}

export async function getReviewStats(): Promise<{ value: string; label: string }[]> {
  const data = await readJsonFile<{ reviews: Review[]; stats: { value: string; label: string }[] }>('reviews.json');
  return data.stats;
}

// FAQ functions
export async function getAllFaqs(): Promise<FAQ[]> {
  const data = await readJsonFile<{ faqs: FAQ[]; categories: string[] }>('faqs.json');
  return data.faqs;
}

export async function getFaqCategories(): Promise<string[]> {
  const data = await readJsonFile<{ faqs: FAQ[]; categories: string[] }>('faqs.json');
  return data.categories;
}

// Case Studies functions
export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const data = await readJsonFile<{ caseStudies: CaseStudy[]; stats: unknown[] }>('case-studies.json');
  return data.caseStudies;
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  const data = await readJsonFile<{ caseStudies: CaseStudy[]; stats: unknown[] }>('case-studies.json');
  return data.caseStudies.find(c => c.slug === slug) || null;
}

export async function getCaseStudyStats(): Promise<{ value: string; label: string }[]> {
  const data = await readJsonFile<{ caseStudies: CaseStudy[]; stats: { value: string; label: string }[] }>('case-studies.json');
  return data.stats;
}

// Homepage functions
export async function getHomepage() {
  return readJsonFile('homepage.json');
}

// Settings functions
export async function getSettings() {
  return readJsonFile('settings.json');
}
