import { NextResponse } from 'next/server';
import { readJsonFile, writeJsonFile } from '@/lib/db';
import { getAuthFromCookies } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

interface PricingPlan {
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

interface PricingData {
  tabs: { id: string; label: string }[];
  plans: PricingPlan[];
}

// GET - Fetch all pricing plans
export async function GET() {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await readJsonFile<PricingData>('pricing.json');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new pricing plan
export async function POST(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const data = await readJsonFile<PricingData>('pricing.json');

    const newPlan: PricingPlan = {
      _id: uuidv4(),
      name: body.name,
      category: body.category || 'seo',
      price: body.price,
      period: body.period || '/month',
      description: body.description || '',
      features: body.features || [],
      popular: body.popular || false,
      order: body.order || data.plans.filter((p) => p.category === body.category).length + 1,
    };

    data.plans.push(newPlan);
    await writeJsonFile('pricing.json', data);

    return NextResponse.json(newPlan, { status: 201 });
  } catch (error) {
    console.error('Error creating pricing plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update pricing plan
export async function PUT(request: Request) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updates } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<PricingData>('pricing.json');
    const index = data.plans.findIndex((plan) => plan._id === _id);

    if (index === -1) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    data.plans[index] = { ...data.plans[index], ...updates };
    await writeJsonFile('pricing.json', data);

    return NextResponse.json(data.plans[index]);
  } catch (error) {
    console.error('Error updating pricing plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete pricing plan
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
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    const data = await readJsonFile<PricingData>('pricing.json');
    const index = data.plans.findIndex((plan) => plan._id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    data.plans.splice(index, 1);
    await writeJsonFile('pricing.json', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting pricing plan:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
