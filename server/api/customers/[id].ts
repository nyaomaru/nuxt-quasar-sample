import prisma from '../../prisma/client';

export default defineEventHandler(async event => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID is required' });
  }

  if (event.node.req.method === 'GET') {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(id) },
    });

    if (!customer) {
      throw createError({ statusCode: 404, statusMessage: 'Customer not found' });
    }

    return customer;
  }

  if (event.node.req.method === 'DELETE') {
    const customer = await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return { statusMessage: 'Customer deleted', customer };
  }

  if (event.node.req.method === 'PUT') {
    const body = await readBody(event);

    if (!body.name || !body.location) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
    }

    const customer = await prisma.customer.update({
      where: { id: Number(id) },
      data: {
        name: body.name,
        location: body.location,
        hobby: body.hobby,
        age: body.age,
      },
    });

    return { statusMessage: 'Customer updated', customer };
  }
});
