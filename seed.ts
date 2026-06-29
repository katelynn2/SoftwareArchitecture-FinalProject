import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('secret123', 10);
  
  await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
    },
  });
  console.log('Admin created! Username: admin, Pass: secret123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });