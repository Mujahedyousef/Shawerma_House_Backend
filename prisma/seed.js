import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminEmail = 'admin@central.com';
  const adminPassword = 'central@admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log('⚠️  Admin user already exists, skipping...');
  } else {
    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        username: 'Super Admin',
        name: 'Super Admin',
        password: hashedPassword,
        role: 'admin',
      },
    });

    console.log('✅ Created admin user:', {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    });
  }

  console.log('✅ Seeding completed');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

