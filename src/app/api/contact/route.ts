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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const data = readData();
    const newInquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || '',
      company: company || '',
      service: service || '',
      budget: budget || '',
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    data.inquiries.unshift(newInquiry);
    writeData(data);

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch {
    return NextResponse.json({ error: 'Failed to save inquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = readData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
