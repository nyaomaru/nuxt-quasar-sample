import { getCustomerById, deleteCustomerById, updateCustomer } from '@@/services/customerService';

export default defineEventHandler(async event => {
  const id = event.context.params?.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID is required' });
  }

  if (event.node.req.method === 'GET') {
    const customer = await getCustomerById(Number(id));
    if (!customer) {
      throw createError({ statusCode: 404, statusMessage: 'Customer not found' });
    }
    return customer;
  }

  if (event.node.req.method === 'DELETE') {
    const customer = await deleteCustomerById(Number(id));
    return { statusMessage: 'Customer deleted', customer };
  }

  if (event.node.req.method === 'PUT') {
    const body = await readBody(event);
    if (!body.name || !body.location) {
      throw createError({ statusCode: 400, statusMessage: 'Missing required fields' });
    }
    const customer = await updateCustomer(Number(id), body);
    return { statusMessage: 'Customer updated', customer };
  }
});
