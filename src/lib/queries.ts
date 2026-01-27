import { groq } from 'next-sanity';

// Blog Queries
export const allBlogPostsQuery = groq`
  *[_type == "blog"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    author,
    publishedAt,
    readTime,
    featured
  }
`;

export const featuredBlogPostQuery = groq`
  *[_type == "blog" && featured == true][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    author,
    publishedAt,
    readTime
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage,
    category,
    author,
    publishedAt,
    readTime,
    content,
    seoTitle,
    seoDescription
  }
`;

// Pricing Queries
export const allPricingQuery = groq`
  *[_type == "pricing"] | order(order asc) {
    _id,
    name,
    category,
    price,
    period,
    description,
    features,
    popular,
    order
  }
`;

export const pricingByCategoryQuery = groq`
  *[_type == "pricing" && category == $category] | order(order asc) {
    _id,
    name,
    price,
    period,
    description,
    features,
    popular
  }
`;

// Reviews Queries
export const allReviewsQuery = groq`
  *[_type == "review"] | order(order asc) {
    _id,
    name,
    role,
    company,
    image,
    rating,
    text,
    result,
    featured
  }
`;

export const featuredReviewsQuery = groq`
  *[_type == "review" && featured == true] | order(order asc) {
    _id,
    name,
    role,
    company,
    image,
    rating,
    text,
    result
  }
`;

// FAQ Queries
export const allFaqQuery = groq`
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category,
    order
  }
`;

export const faqByCategoryQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    _id,
    question,
    answer
  }
`;

// Case Studies Queries
export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id,
    title,
    slug,
    industry,
    preview,
    featuredImage,
    metric,
    metricLabel,
    timeline
  }
`;

export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    industry,
    preview,
    featuredImage,
    metric,
    metricLabel,
    timeline,
    challenge,
    solution,
    results,
    testimonial,
    clientName
  }
`;

// Services Queries
export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortTitle,
    tagline,
    description,
    icon
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortTitle,
    tagline,
    description,
    icon,
    features,
    process,
    stats,
    ctaTitle,
    ctaDescription
  }
`;

// Homepage Query
export const homepageQuery = groq`
  *[_type == "homepage"][0] {
    heroTitle,
    heroHighlight,
    heroDescription,
    heroBadge,
    stats,
    servicesTitle,
    servicesSubtitle,
    whyUsTitle,
    whyUsSubtitle,
    whyUsItems,
    processTitle,
    processSteps,
    ctaTitle,
    ctaDescription,
    ctaButtonText
  }
`;

// Site Settings Query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName,
    siteDescription,
    logo,
    email,
    phone,
    address,
    socialLinks,
    footerText,
    copyright
  }
`;
