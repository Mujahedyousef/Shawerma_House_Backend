import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedDownloadAppSection() {
  console.log('📱 Seeding Download App Section...');

  try {
    // Check if Download App Section already exists
    const existingSection = await prisma.downloadAppSection.findFirst();

    if (existingSection) {
      console.log('⚠️  Download App Section already exists, updating...');
      
      await prisma.downloadAppSection.update({
        where: { id: existingSection.id },
        data: {
          titleEn: 'Download Shawarma House App Now!',
          titleAr: 'حمّل تطبيق بيت الشاورما الآن!',
          descriptionEn: 'Try your favorite food easier with Shawarma House app! Order, track, and enjoy exclusive offers from the nearest branch, all in simple steps from your phone.',
          descriptionAr: 'جرّب طعامك المفضل بطريقة أسهل مع تطبيق بيت الشاورما! اطلب، تابع، واستمتع بعروض حصرية من أقرب فرع لك، وكل هذا بخطوات بسيطة من جوالك.',
          backgroundImageUrl: '/uploads/iPhone 13 Pro-1769104471697-419420185.png',
          // Light Mode Colors
          backgroundColorLight: '#ffffff',
          titleColorLight: '#1a1a1a',
          descriptionColorLight: '#666666',
          // Dark Mode Colors
          backgroundColorDark: '#1a1a1a',
          titleColorDark: '#ffffff',
          descriptionColorDark: '#cccccc',
          // Images and Links
          appStoreImageUrl: '/uploads/App Store and Google Play-1769104490038-532211795.png',
          appStoreLink: 'https://apps.apple.com/app/shawarma-house',
          googlePlayImageUrl: '/uploads/App Store and Google Play (1)-1769104483665-988365743.png',
          googlePlayLink: 'https://play.google.com/store/apps/details?id=com.shawarmahouse',
          mobileAppImageUrl: '/uploads/guy-with-phone-1769104465646-317463127.png',
          enableInitialAnimation: true,
          enableScrollAnimation: true,
          isActive: true,
        },
      });

      console.log('✅ Download App Section updated successfully!');
    } else {
      // Create new Download App Section
      const section = await prisma.downloadAppSection.create({
        data: {
          titleEn: 'Download Shawarma House App Now!',
          titleAr: 'حمّل تطبيق بيت الشاورما الآن!',
          descriptionEn: 'Try your favorite food easier with Shawarma House app! Order, track, and enjoy exclusive offers from the nearest branch, all in simple steps from your phone.',
          descriptionAr: 'جرّب طعامك المفضل بطريقة أسهل مع تطبيق بيت الشاورما! اطلب، تابع، واستمتع بعروض حصرية من أقرب فرع لك، وكل هذا بخطوات بسيطة من جوالك.',
          backgroundImageUrl: '/uploads/iPhone 13 Pro-1769104471697-419420185.png',
          // Light Mode Colors
          backgroundColorLight: '#ffffff',
          titleColorLight: '#1a1a1a',
          descriptionColorLight: '#666666',
          // Dark Mode Colors
          backgroundColorDark: '#1a1a1a',
          titleColorDark: '#ffffff',
          descriptionColorDark: '#cccccc',
          // Images and Links
          appStoreImageUrl: '/uploads/App Store and Google Play-1769104490038-532211795.png',
          appStoreLink: 'https://apps.apple.com/app/shawarma-house',
          googlePlayImageUrl: '/uploads/App Store and Google Play (1)-1769104483665-988365743.png',
          googlePlayLink: 'https://play.google.com/store/apps/details?id=com.shawarmahouse',
          mobileAppImageUrl: '/uploads/guy-with-phone-1769104465646-317463127.png',
          enableInitialAnimation: true,
          enableScrollAnimation: true,
          isActive: true,
        },
      });

      console.log('✅ Download App Section created successfully!');
      console.log(`   Section ID: ${section.id}`);
      console.log(`   Title (EN): ${section.titleEn}`);
      console.log(`   Title (AR): ${section.titleAr}`);
    }
  } catch (error) {
    console.error('❌ Error seeding Download App Section:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedDownloadAppSection();
    console.log('\n✅ Download App Section seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

