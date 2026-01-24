import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedBranchesMapSection() {
  console.log('🗺️  Seeding Branches Map Section...');

  try {
    // Delete existing map section and branches
    const existingSection = await prisma.branchesMapSection.findFirst();

    if (existingSection) {
      console.log('🗑️  Deleting existing map section and branches...');
      await prisma.branchesMapSection.delete({
        where: { id: existingSection.id },
      });
      console.log('✅ Existing data deleted');
    }

    // Create the map section with branches
    const mapSection = await prisma.branchesMapSection.create({
      data: {
        sectionTitleEn: 'Visit Our Branches',
        sectionTitleAr: 'زر فروعنا',
        sectionSubtitleEn: 'Find us at any of our convenient locations across Riyadh',
        sectionSubtitleAr: 'اعثر علينا في أي من مواقعنا المريحة في جميع أنحاء الرياض',
        mapCenterLat: 24.7136,
        mapCenterLng: 46.6753,
        defaultZoomLevel: 11,
        borderRadius: 16,
        cardBackgroundLight: '#ffffff',
        cardTextLight: '#1a1a1a',
        cardAccentLight: '#3daae1',
        pinColorLight: '#3daae1',
        cardBackgroundDark: '#2a2a2a',
        cardTextDark: '#ffffff',
        cardAccentDark: '#3daae1',
        pinColorDark: '#3daae1',
        isActive: true,
        branches: {
          create: [
            {
              nameEn: 'Kingdom Centre Branch',
              nameAr: 'فرع برج المملكة',
              addressEn: 'King Fahd Road, Al Olaya, Riyadh',
              addressAr: 'طريق الملك فهد، العليا، الرياض',
              latitude: 24.7116,
              longitude: 46.6754,
              phoneNumber: '+966 11 123 4567',
              email: 'kingdom@shawarmahouse.sa',
              workingHoursEn: 'Sunday - Thursday: 10:00 AM - 11:00 PM\nFriday - Saturday: 2:00 PM - 12:00 AM',
              workingHoursAr: 'الأحد - الخميس: 10:00 صباحاً - 11:00 مساءً\nالجمعة - السبت: 2:00 مساءً - 12:00 صباحاً',
              order: 1,
              isActive: true,
            },
            {
              nameEn: 'Granada Mall Branch',
              nameAr: 'فرع غرناطة مول',
              addressEn: 'King Abdulaziz Road, Granada Business Park, Riyadh',
              addressAr: 'طريق الملك عبدالعزيز، حديقة غرناطة التجارية، الرياض',
              latitude: 24.7746,
              longitude: 46.7025,
              phoneNumber: '+966 11 234 5678',
              email: 'granada@shawarmahouse.sa',
              workingHoursEn: 'Daily: 10:00 AM - 12:00 AM',
              workingHoursAr: 'يومياً: 10:00 صباحاً - 12:00 صباحاً',
              order: 2,
              isActive: true,
            },
            {
              nameEn: 'Tahlia Street Branch',
              nameAr: 'فرع شارع التحلية',
              addressEn: 'Prince Mohammed Bin Abdulaziz Road, Al Olaya, Riyadh',
              addressAr: 'طريق الأمير محمد بن عبدالعزيز، العليا، الرياض',
              latitude: 24.7053,
              longitude: 46.6824,
              phoneNumber: '+966 11 345 6789',
              email: 'tahlia@shawarmahouse.sa',
              workingHoursEn: 'Daily: 11:00 AM - 1:00 AM',
              workingHoursAr: 'يومياً: 11:00 صباحاً - 1:00 صباحاً',
              order: 3,
              isActive: true,
            },
            {
              nameEn: 'Al Nakheel Mall Branch',
              nameAr: 'فرع النخيل مول',
              addressEn: 'Al Nakheel District, Riyadh',
              addressAr: 'حي النخيل، الرياض',
              latitude: 24.8107,
              longitude: 46.6289,
              phoneNumber: '+966 11 456 7890',
              email: 'nakheel@shawarmahouse.sa',
              workingHoursEn: 'Sunday - Thursday: 9:00 AM - 11:00 PM\nFriday - Saturday: 2:00 PM - 12:00 AM',
              workingHoursAr: 'الأحد - الخميس: 9:00 صباحاً - 11:00 مساءً\nالجمعة - السبت: 2:00 مساءً - 12:00 صباحاً',
              order: 4,
              isActive: true,
            },
            {
              nameEn: 'Sahara Mall Branch',
              nameAr: 'فرع صحارى مول',
              addressEn: 'King Abdulaziz Road, Al Sahafa, Riyadh',
              addressAr: 'طريق الملك عبدالعزيز، الصحافة، الرياض',
              latitude: 24.7710,
              longitude: 46.6558,
              phoneNumber: '+966 11 567 8901',
              email: 'sahara@shawarmahouse.sa',
              workingHoursEn: 'Daily: 10:00 AM - 11:00 PM',
              workingHoursAr: 'يومياً: 10:00 صباحاً - 11:00 مساءً',
              order: 5,
              isActive: true,
            },
            {
              nameEn: 'Al Akaria Branch',
              nameAr: 'فرع العقارية',
              addressEn: 'Al Akaria Plaza, King Fahd Road, Riyadh',
              addressAr: 'العقارية بلازا، طريق الملك فهد، الرياض',
              latitude: 24.7285,
              longitude: 46.6772,
              phoneNumber: '+966 11 678 9012',
              email: 'akaria@shawarmahouse.sa',
              workingHoursEn: 'Daily: 8:00 AM - 10:00 PM',
              workingHoursAr: 'يومياً: 8:00 صباحاً - 10:00 مساءً',
              order: 6,
              isActive: true,
            },
            {
              nameEn: 'Panorama Mall Branch',
              nameAr: 'فرع بانوراما مول',
              addressEn: 'Abu Bakr As Siddiq Road, Al Yasmin, Riyadh',
              addressAr: 'طريق أبي بكر الصديق، الياسمين، الرياض',
              latitude: 24.7615,
              longitude: 46.6929,
              phoneNumber: '+966 11 789 0123',
              email: 'panorama@shawarmahouse.sa',
              workingHoursEn: 'Daily: 10:00 AM - 12:00 AM',
              workingHoursAr: 'يومياً: 10:00 صباحاً - 12:00 صباحاً',
              order: 7,
              isActive: true,
            },
            {
              nameEn: 'Riyadh Park Branch',
              nameAr: 'فرع الرياض بارك',
              addressEn: 'Riyadh Park Mall, Al Muhamadiyah, Riyadh',
              addressAr: 'الرياض بارك مول، المحمدية، الرياض',
              latitude: 24.7953,
              longitude: 46.6073,
              phoneNumber: '+966 11 890 1234',
              email: 'riyadhpark@shawarmahouse.sa',
              workingHoursEn: 'Daily: 10:00 AM - 11:00 PM',
              workingHoursAr: 'يومياً: 10:00 صباحاً - 11:00 مساءً',
              order: 8,
              isActive: true,
            },
          ],
        },
      },
      include: {
        branches: true,
      },
    });

    console.log('✅ Created Branches Map Section with', mapSection.branches.length, 'branches');
    console.log('   Section ID:', mapSection.id);
    console.log('   Map Center:', `${mapSection.mapCenterLat}, ${mapSection.mapCenterLng}`);
    console.log('   Zoom Level:', mapSection.defaultZoomLevel);
    
    // List all branches
    console.log('\n📍 Branches created:');
    mapSection.branches.forEach((branch, index) => {
      console.log(`   ${index + 1}. ${branch.nameEn} (${branch.nameAr})`);
      console.log(`      📍 ${branch.latitude}, ${branch.longitude}`);
      console.log(`      📞 ${branch.phoneNumber}`);
      console.log(`      ✉️  ${branch.email}`);
    });

  } catch (error) {
    console.error('❌ Error seeding branches map section:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedBranchesMapSection();
    console.log('\n✅ Branches Map Section seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

