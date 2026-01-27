import type { PortableTextBlock } from '@portabletext/types';

// Blog Types
export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage?: SanityImage;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  content?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
}

// Pricing Types
export interface PricingPlan {
  _id: string;
  name: string;
  category: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  order: number;
}

// Review Types
export interface Review {
  _id: string;
  name: string;
  role: string;
  company: string;
  image?: SanityImage;
  rating: number;
  text: string;
  result?: string;
  featured?: boolean;
}

// FAQ Types
export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Case Study Types
export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  industry: string;
  preview: string;
  featuredImage?: SanityImage;
  metric: string;
  metricLabel: string;
  timeline: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  testimonial?: string;
  clientName?: string;
}

// Service Types
export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceStat {
  value: string;
  label: string;
}

export interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortTitle?: string;
  tagline?: string;
  description: string;
  icon?: string;
  features?: ServiceFeature[];
  process?: ProcessStep[];
  stats?: ServiceStat[];
  ctaTitle?: string;
  ctaDescription?: string;
}

// Homepage Types
export interface HomepageStat {
  value: string;
  label: string;
  suffix?: string;
}

export interface WhyUsItem {
  title: string;
  description: string;
  icon?: string;
}

export interface HomepageProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Homepage {
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroBadge?: string;
  stats?: HomepageStat[];
  servicesTitle?: string;
  servicesSubtitle?: string;
  whyUsTitle?: string;
  whyUsSubtitle?: string;
  whyUsItems?: WhyUsItem[];
  processTitle?: string;
  processSteps?: HomepageProcessStep[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
}

// Site Settings Types
export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription?: string;
  logo?: SanityImage;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: SocialLinks;
  footerText?: string;
  copyright?: string;
  googleVerification?: string;
  analyticsId?: string;
}

// Sanity Image Type
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}
