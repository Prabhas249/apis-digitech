import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/db';
import { getAuthFromCookies } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

interface Review {
  _id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  result: string;
  featured: boolean;
}

interface ReviewsData {
  stats: { value: string; label: string }[];
  reviews: Review[];
}

// GET - Fetch all reviews
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await readJsonFile<ReviewsData>('reviews.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new review
export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await readJsonFile<ReviewsData>('reviews.json');

    const newReview: Review = {
      _id: uuidv4(),
      name: body.name,
      role: body.role || '',
      company: body.company || '',
      rating: body.rating || 5,
      text: body.text || '',
      result: body.result || '',
      featured: body.featured || false,
    };

    data.reviews.unshift(newReview);
    await writeJsonFile('reviews.json', data);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update review
export async function PUT(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<ReviewsData>('reviews.json');
    const index = data.reviews.findIndex((review) => review._id === _id);

    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    data.reviews[index] = { ...data.reviews[index], ...updates };
    await writeJsonFile('reviews.json', data);

    return NextResponse.json(data.reviews[index]);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete review
export async function DELETE(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id');

    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body._id;
    }

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<ReviewsData>('reviews.json');
    const index = data.reviews.findIndex((review) => review._id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    data.reviews.splice(index, 1);
    await writeJsonFile('reviews.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
