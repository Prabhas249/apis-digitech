import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

export async function GET() {
  try {
    const content = await fs.readFile(contentPath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await fs.writeFile(contentPath, JSON.stringify(body, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const updates = await request.json();
    const currentContent = await fs.readFile(contentPath, 'utf-8');
    const content = JSON.parse(currentContent);

    // Deep merge updates
    const merged = deepMerge(content, updates);
    await fs.writeFile(contentPath, JSON.stringify(merged, null, 2));

    return NextResponse.json({ success: true, content: merged });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  for (const key in source) {
    if (source[key] instanceof Object && key in target && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}
