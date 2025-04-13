import { getCustomers, createCustomer } from '~/services/customerService';

export default defineEventHandler(async event => {
  if (event.node.req.method === 'GET') {
    const customers = await getCustomers();
    return customers;
  }

  if (event.node.req.method === 'POST') {
    const body = await readBody(event);

    if (!body.name || !body.location) {
      throw createError({ message: 'Missing required fields', statusCode: 400 });
    }

    const customer = await createCustomer(body);
    return { statusMessage: 'Customer created', statusCode: 201, customer };
  }
});
