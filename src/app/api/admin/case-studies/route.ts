import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/db';
import { getAuthFromCookies } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

interface CaseStudy {
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

interface CaseStudiesData {
  stats: { value: string; label: string }[];
  caseStudies: CaseStudy[];
}

// GET - Fetch all case studies
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await readJsonFile<CaseStudiesData>('case-studies.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new case study
export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await readJsonFile<CaseStudiesData>('case-studies.json');

    const newCaseStudy: CaseStudy = {
      _id: uuidv4(),
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      industry: body.industry || '',
      preview: body.preview || '',
      metric: body.metric || '',
      metricLabel: body.metricLabel || '',
      timeline: body.timeline || '',
      challenge: body.challenge || '',
      solution: body.solution || '',
      results: body.results || [],
      testimonial: body.testimonial || '',
      clientName: body.clientName || '',
    };

    data.caseStudies.unshift(newCaseStudy);
    await writeJsonFile('case-studies.json', data);

    return NextResponse.json(newCaseStudy, { status: 201 });
  } catch (error) {
    console.error('Error creating case study:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update case study
export async function PUT(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Case study ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<CaseStudiesData>('case-studies.json');
    const index = data.caseStudies.findIndex((cs) => cs._id === _id);

    if (index === -1) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    data.caseStudies[index] = { ...data.caseStudies[index], ...updates };
    await writeJsonFile('case-studies.json', data);

    return NextResponse.json(data.caseStudies[index]);
  } catch (error) {
    console.error('Error updating case study:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete case study
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
      return NextResponse.json({ error: 'Case study ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<CaseStudiesData>('case-studies.json');
    const index = data.caseStudies.findIndex((cs) => cs._id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 });
    }

    data.caseStudies.splice(index, 1);
    await writeJsonFile('case-studies.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
