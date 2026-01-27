import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const TOKEN_EXPIRY = '7d';

export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function getAuthFromCookies(): Promise<JWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export function setAuthCookie(token: string): void {
  // This is handled in the API route response
}
