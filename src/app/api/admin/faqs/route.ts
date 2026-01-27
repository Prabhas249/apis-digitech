import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/db';
import { getAuthFromCookies } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface FAQsData {
  categories: string[];
  faqs: FAQ[];
}

// GET - Fetch all FAQs
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await readJsonFile<FAQsData>('faqs.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new FAQ
export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await readJsonFile<FAQsData>('faqs.json');

    const categoryFaqs = data.faqs.filter((f) => f.category === body.category);
    const newFaq: FAQ = {
      _id: uuidv4(),
      question: body.question,
      answer: body.answer || '',
      category: body.category || 'General',
      order: body.order || categoryFaqs.length + 1,
    };

    data.faqs.push(newFaq);
    await writeJsonFile('faqs.json', data);

    return NextResponse.json(newFaq, { status: 201 });
  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update FAQ
export async function PUT(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'FAQ ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<FAQsData>('faqs.json');
    const index = data.faqs.findIndex((faq) => faq._id === _id);

    if (index === -1) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    data.faqs[index] = { ...data.faqs[index], ...updates };
    await writeJsonFile('faqs.json', data);

    return NextResponse.json(data.faqs[index]);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete FAQ
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
      return NextResponse.json({ error: 'FAQ ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<FAQsData>('faqs.json');
    const index = data.faqs.findIndex((faq) => faq._id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    data.faqs.splice(index, 1);
    await writeJsonFile('faqs.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
