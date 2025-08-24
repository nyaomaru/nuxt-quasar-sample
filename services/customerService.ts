import prisma from '@@/server/prisma/client';
import type { CustomerSchema } from '@@/schemas/customer';

export async function getCustomers() {
  return prisma.customer.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function getCustomerById(id: number) {
  const customer = await prisma.customer.findUnique({
    where: { id },
  });
  return customer;
}

export async function createCustomer(data: {
  name: string;
  location: string;
  hobby?: string;
  age?: number;
}) {
  return prisma.customer.create({
    data: {
      name: data.name,
      location: data.location,
      hobby: data.hobby ?? '',
      age: data.age ?? 0,
    },
  });
}

export async function deleteCustomerById(id: number) {
  const customer = await prisma.customer.delete({
    where: { id },
  });
  return customer;
}

export async function updateCustomer(id: number, data: CustomerSchema) {
  const customer = await prisma.customer.update({
    where: { id },
    data: {
      name: data.name,
      location: data.location,
      hobby: data.hobby,
      age: data.age,
    },
  });
  return customer;
}
