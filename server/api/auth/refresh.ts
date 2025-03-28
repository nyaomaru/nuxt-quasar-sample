import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET in environment variables');

export default defineEventHandler(async event => {
  const cookies = parse(event.node.req.headers.cookie || '');
  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    throw createError({ statusMessage: 'Refresh token missing', statusCode: 401 });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET) as { userId: number };

    const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, {
      expiresIn: '15m',
    });

    return { access_token: newAccessToken, statusCode: 200 };
  } catch (error) {
    throw createError({ statusMessage: 'Invalid refresh token', statusCode: 401 });
  }
});
