import prisma from '../../prisma/client';

export default defineEventHandler(async event => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, message: 'ID is required' });
  }

  const customer = await prisma.customer.findUnique({
    where: { id: Number(id) },
  });

  if (!customer) {
    throw createError({ statusCode: 404, message: 'Customer not found' });
  }

  return customer;
});
