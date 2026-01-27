import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/db';
import { getAuthFromCookies } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

interface BlogPost {
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

interface BlogData {
  categories: string[];
  posts: BlogPost[];
}

// GET - Fetch all blog posts
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await readJsonFile<BlogData>('blog.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new blog post
export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await readJsonFile<BlogData>('blog.json');

    const newPost: BlogPost = {
      _id: uuidv4(),
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: body.excerpt || '',
      category: body.category || 'SEO',
      author: body.author || 'Apis Digitech Team',
      publishedAt: body.publishedAt || new Date().toISOString().split('T')[0],
      readTime: body.readTime || '5 min read',
      featured: body.featured || false,
      content: body.content || '',
    };

    data.posts.unshift(newPost);
    await writeJsonFile('blog.json', data);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update blog post
export async function PUT(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<BlogData>('blog.json');
    const index = data.posts.findIndex((post) => post._id === _id);

    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    data.posts[index] = { ...data.posts[index], ...updates };
    await writeJsonFile('blog.json', data);

    return NextResponse.json(data.posts[index]);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete blog post
export async function DELETE(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Support both query param and body
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body._id;
    }

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<BlogData>('blog.json');
    const index = data.posts.findIndex((post) => post._id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    data.posts.splice(index, 1);
    await writeJsonFile('blog.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
