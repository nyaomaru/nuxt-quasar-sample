import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export default defineEventHandler(async event => {
  if (event.node.req.method !== 'POST')
    throw createError({ statusMessage: 'Method not allowed', statusCode: 405 });

  const { name, password } = await readBody(event);

  if (!name || !password) {
    throw createError({ statusMessage: 'Missing required fields', statusCode: 400 });
  }

  console.log('name:', name);
  console.log('password:', password);
  const user = await prisma.user.findUnique({ where: { name } });
  if (!user) throw createError({ statusMessage: 'Invalid credentials', statusCode: 401 });

  const isValid = await bcrypt.compare(password, user?.password);
  if (!isValid) throw createError({ statusMessage: 'Invalid credentials', statusCode: 401 });

  const accessToken = jwt.sign({ userId: user.id, name: user.name }, JWT_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  event.node.res.setHeader(
    'Set-Cookie',
    serialize('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  return { access_token: accessToken, statusCode: 200 };
});
