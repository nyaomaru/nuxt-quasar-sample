import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.customer.createMany({
    data: [
      { name: 'Alice', location: 'New York', hobby: 'Reading', age: 25 },
      { name: 'Bob', location: 'Los Angeles', hobby: 'Swimming', age: 30 },
      { name: 'Charlie', location: 'Tokyo', hobby: 'Gaming', age: 35 },
    ],
  });

  console.log('✅ Initial data inserted successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
