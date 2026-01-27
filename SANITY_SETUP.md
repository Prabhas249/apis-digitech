# Sanity CMS Setup Guide

## Step 1: Create a Sanity Project

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Sign in with Google, GitHub, or email
3. Click "Create new project"
4. Name it "Apis Digitech" or your preferred name
5. Select "Create empty project"
6. Copy your **Project ID** (looks like: `abc123xyz`)

## Step 2: Configure Environment Variables

Open `.env.local` and replace the placeholder:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 3: Run the Development Server

```bash
npm run dev
```

## Step 4: Access the Admin Panel

1. Visit `http://localhost:3000/admin`
2. You'll be prompted to log in with the same account you used on sanity.io
3. Start adding content!

## Content Types Available

- **Blog Posts** - Create and manage blog articles with rich text
- **Pricing Plans** - Manage pricing tiers for SEO, AEO, GEO, Local SEO
- **Reviews** - Customer testimonials
- **FAQ** - Frequently asked questions
- **Case Studies** - Success stories and project showcases
- **Services** - Service page content
- **Homepage** - Hero section, stats, and CTA content
- **Site Settings** - Contact info, social links, footer text

## Adding Content

1. Go to `/admin`
2. Click on a content type (e.g., "Blog")
3. Click "Create new" button
4. Fill in the fields
5. Click "Publish" to make it live

## CORS Configuration (if needed)

If you get CORS errors, add your domain to allowed origins:
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to API → CORS Origins
4. Add `http://localhost:3000` for development
5. Add your production domain when deploying

## Deployment Notes

For Vercel/Netlify deployment:
1. Add the same environment variables to your hosting platform
2. Add your production URL to Sanity CORS origins
3. Rebuild and deploy
