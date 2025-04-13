import prisma from '../server/prisma/client';
import bcrypt from 'bcryptjs';

export async function createUser(userName: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { name: userName } });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { name: userName, password: hashedPassword } });

  return user;
}
