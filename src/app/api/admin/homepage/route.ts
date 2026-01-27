import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/db';
import { getAuthFromCookies } from '@/lib/auth';

// GET - Fetch homepage content
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await readJsonFile('homepage.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update homepage content
export async function PUT(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    await writeJsonFile('homepage.json', body);

    return NextResponse.json(body);
  } catch (error) {
    console.error('Error updating homepage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
