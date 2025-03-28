import prisma from '../../prisma/client';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async event => {
  if (event.node.req.method !== 'POST')
    throw createError({ statusMessage: 'Method not allowed', statusCode: 405 });

  const { userName, password } = await readBody(event);

  if (!userName || !password) {
    throw createError({ statusMessage: 'Missing required fields', statusCode: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { name: userName } });
  if (existingUser) throw createError({ statusMessage: 'User already exists', statusCode: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name: userName, password: hashedPassword } });

  return { statusMessage: 'Customer created', userId: user.id, statusCode: 201 };
});
