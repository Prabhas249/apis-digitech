import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'src', 'data');

export async function readJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDir, filename);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data);
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(dataDir, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Blog functions
export async function getBlogPosts() {
  const data = await readJsonFile<{ posts: unknown[]; categories: string[] }>('blog.json');
  return data.posts;
}

export async function getBlogCategories() {
  const data = await readJsonFile<{ posts: unknown[]; categories: string[] }>('blog.json');
  return data.categories;
}

export async function saveBlogPosts(posts: unknown[]) {
  const data = await readJsonFile<{ posts: unknown[]; categories: string[] }>('blog.json');
  data.posts = posts;
  await writeJsonFile('blog.json', data);
}

// Pricing functions
export async function getPricingPlans() {
  const data = await readJsonFile<{ plans: unknown[]; tabs: unknown[] }>('pricing.json');
  return data.plans;
}

export async function getPricingTabs() {
  const data = await readJsonFile<{ plans: unknown[]; tabs: unknown[] }>('pricing.json');
  return data.tabs;
}

export async function savePricingPlans(plans: unknown[]) {
  const data = await readJsonFile<{ plans: unknown[]; tabs: unknown[] }>('pricing.json');
  data.plans = plans;
  await writeJsonFile('pricing.json', data);
}

// Reviews functions
export async function getReviews() {
  const data = await readJsonFile<{ reviews: unknown[]; stats: unknown[] }>('reviews.json');
  return data.reviews;
}

export async function saveReviews(reviews: unknown[]) {
  const data = await readJsonFile<{ reviews: unknown[]; stats: unknown[] }>('reviews.json');
  data.reviews = reviews;
  await writeJsonFile('reviews.json', data);
}

// FAQs functions
export async function getFaqs() {
  const data = await readJsonFile<{ faqs: unknown[]; categories: string[] }>('faqs.json');
  return data.faqs;
}

export async function saveFaqs(faqs: unknown[]) {
  const data = await readJsonFile<{ faqs: unknown[]; categories: string[] }>('faqs.json');
  data.faqs = faqs;
  await writeJsonFile('faqs.json', data);
}

// Case Studies functions
export async function getCaseStudies() {
  const data = await readJsonFile<{ caseStudies: unknown[]; stats: unknown[] }>('case-studies.json');
  return data.caseStudies;
}

export async function saveCaseStudies(caseStudies: unknown[]) {
  const data = await readJsonFile<{ caseStudies: unknown[]; stats: unknown[] }>('case-studies.json');
  data.caseStudies = caseStudies;
  await writeJsonFile('case-studies.json', data);
}

// Homepage functions
export async function getHomepage() {
  return readJsonFile('homepage.json');
}

export async function saveHomepage(homepage: unknown) {
  await writeJsonFile('homepage.json', homepage);
}

// Settings functions
export async function getSettings() {
  return readJsonFile('settings.json');
}

export async function saveSettings(settings: unknown) {
  await writeJsonFile('settings.json', settings);
}

// Users functions
export async function getUsers() {
  const data = await readJsonFile<{ users: unknown[] }>('users.json');
  return data.users;
}

export async function saveUsers(users: unknown[]) {
  await writeJsonFile('users.json', { users });
}
