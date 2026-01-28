import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/inquiries.json');

function readData() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { inquiries: [] };
  }
}

function writeData(data: { inquiries: unknown[] }) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const data = readData();
    const index = data.inquiries.findIndex((i: { id: string }) => i.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 });
    }

    data.inquiries[index].status = status;
    writeData(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const data = readData();
    data.inquiries = data.inquiries.filter((i: { id: string }) => i.id !== id);
    writeData(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
