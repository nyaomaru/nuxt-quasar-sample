import prisma from '../../prisma/client';

export default defineEventHandler(async event => {
  if (event.node.req.method === 'GET') {
    const customers = await prisma.customer.findMany({
      orderBy: { id: 'asc' },
    });
    return customers;
  }

  if (event.node.req.method === 'POST') {
    const body = await readBody(event);

    if (!body.name || !body.location) {
      throw createError({ message: 'Missing required fields', statusCode: 400 });
    }

    const customer = await prisma.customer.create({
      data: {
        name: body.name,
        location: body.location,
        hobby: body.hobby,
        age: body.age,
      },
    });

    return { statusMessage: 'Customer created', statusCode: 201 };
  }
});
