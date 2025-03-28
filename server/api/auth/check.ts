import prisma from '../../prisma/client';

export default defineEventHandler(async event => {
  if (event.node.req.method !== 'GET')
    throw createError({ statusMessage: 'Method not allowed', statusCode: 405 });

  const user = await prisma.user.findMany();

  return { count: user.length, statusCode: 200 };
});
