import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const usersPath = path.join(process.cwd(), 'src/data/users.json');

function readUsers() {
  try {
    const data = fs.readFileSync(usersPath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { users: [] };
  }
}

function writeUsers(data: { users: unknown[] }) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

export async function PUT(request: Request) {
  try {
    // Check if user is logged in
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin-auth');

    if (!authCookie) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Both current and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const data = readUsers();
    const user = data.users.find((u: { role: string }) => u.role === 'admin');

    if (!user) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    // Hash new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    writeUsers(data);

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
