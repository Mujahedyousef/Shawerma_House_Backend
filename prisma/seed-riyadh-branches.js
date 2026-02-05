import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedRiyadhBranches() {
  console.log('🗺️  Seeding Riyadh Branches Map Section...');

  try {
    // Check if map section already exists
    const existingSection = await prisma.branchesMapSection.findFirst();

    if (existingSection) {
      console.log('⚠️  Branches Map Section already exists, deleting and recreating...');
      await prisma.branchesMapSection.delete({
        where: { id: existingSection.id },
      });
    }

    // Create the map section with Riyadh branches
    const mapSection = await prisma.branchesMapSection.create({
      data: {
        sectionTitleEn: 'Visit Our Branches',
        sectionTitleAr: 'زر فروعنا',
        sectionSubtitleEn: 'Find us at any of our convenient locations across Riyadh',
        sectionSubtitleAr: 'اعثر علينا في أي من مواقعنا المريحة في جميع أنحاء الرياض',
        mapCenterLat: 24.7136, // Riyadh center
        mapCenterLng: 46.6753,
        defaultZoomLevel: 11,
        borderRadius: 12,
        cardBackgroundLight: '#ffffff',
        cardTextLight: '#1a1a1a',
        cardAccentLight: '#3daae1',
        cardBackgroundDark: '#2a2a2a',
        cardTextDark: '#ffffff',
        cardAccentDark: '#3daae1',
        isActive: true,
        branches: {
          create: [
            {
              nameEn: 'Kingdom Centre Branch',
              nameAr: 'فرع برج المملكة',
              addressEn: 'Kingdom Centre, King Fahd Road, Al Olaya, Riyadh',
              addressAr: 'برج المملكة، طريق الملك فهد، العليا، الرياض',
              latitude: 24.7114,
              longitude: 46.6747,
              phoneNumber: '+966 11 123 4567',
              email: 'kingdom@shawarmahouse.sa',
              workingHoursEn: 'Saturday - Wednesday: 10:00 AM - 11:00 PM\nThursday: 10:00 AM - 12:00 AM\nFriday: 1:00 PM - 12:00 AM',
              workingHoursAr: 'السبت - الأربعاء: 10:00 صباحاً - 11:00 مساءً\nالخميس: 10:00 صباحاً - 12:00 صباحاً\nالجمعة: 1:00 ظهراً - 12:00 صباحاً',
              order: 1,
              isActive: true,
            },
            {
              nameEn: 'Al Faisaliah Mall Branch',
              nameAr: 'فرع برج الفيصلية',
              addressEn: 'Al Faisaliah Mall, King Fahd Road, Al Olaya, Riyadh',
              addressAr: 'برج الفيصلية، طريق الملك فهد، العليا، الرياض',
              latitude: 24.6907,
              longitude: 46.6854,
              phoneNumber: '+966 11 234 5678',
              email: 'faisaliah@shawarmahouse.sa',
              workingHoursEn: 'Saturday - Thursday: 9:00 AM - 11:00 PM\nFriday: 2:00 PM - 11:00 PM',
              workingHoursAr: 'السبت - الخميس: 9:00 صباحاً - 11:00 مساءً\nالجمعة: 2:00 ظهراً - 11:00 مساءً',
              order: 2,
              isActive: true,
            },
            {
              nameEn: 'Granada Mall Branch',
              nameAr: 'فرع غرناطة مول',
              addressEn: 'Granada Mall, Eastern Ring Road, Granada, Riyadh',
              addressAr: 'غرناطة مول، طريق الدائري الشرقي، غرناطة، الرياض',
              latitude: 24.7688,
              longitude: 46.7279,
              phoneNumber: '+966 11 345 6789',
              email: 'granada@shawarmahouse.sa',
              workingHoursEn: 'Daily: 10:00 AM - 12:00 AM\nFriday: 1:00 PM - 12:00 AM',
              workingHoursAr: 'يومياً: 10:00 صباحاً - 12:00 صباحاً\nالجمعة: 1:00 ظهراً - 12:00 صباحاً',
              order: 3,
              isActive: true,
            },
            {
              nameEn: 'Sahara Mall Branch',
              nameAr: 'فرع الصحراء مول',
              addressEn: 'Sahara Mall, Sitteen Street, Malaz, Riyadh',
              addressAr: 'الصحراء مول، شارع الستين، الملز، الرياض',
              latitude: 24.6871,
              longitude: 46.7307,
              phoneNumber: '+966 11 456 7890',
              email: 'sahara@shawarmahouse.sa',
              workingHoursEn: 'Saturday - Thursday: 10:00 AM - 11:00 PM\nFriday: 1:30 PM - 11:00 PM',
              workingHoursAr: 'السبت - الخميس: 10:00 صباحاً - 11:00 مساءً\nالجمعة: 1:30 ظهراً - 11:00 مساءً',
              order: 4,
              isActive: true,
            },
            {
              nameEn: 'Nakheel Mall Branch',
              nameAr: 'فرع النخيل مول',
              addressEn: 'Nakheel Mall, Othman Bin Affan Road, Al Nakheel, Riyadh',
              addressAr: 'النخيل مول، طريق عثمان بن عفان، النخيل، الرياض',
              latitude: 24.7707,
              longitude: 46.6537,
              phoneNumber: '+966 11 567 8901',
              email: 'nakheel@shawarmahouse.sa',
              workingHoursEn: 'Daily: 9:00 AM - 11:30 PM',
              workingHoursAr: 'يومياً: 9:00 صباحاً - 11:30 مساءً',
              order: 5,
              isActive: true,
            },
            {
              nameEn: 'Riyadh Park Mall Branch',
              nameAr: 'فرع رياض بارك',
              addressEn: 'Riyadh Park Mall, Eastern Ring Road, Al Murabba, Riyadh',
              addressAr: 'رياض بارك، طريق الدائري الشرقي، المربع، الرياض',
              latitude: 24.7742,
              longitude: 46.6692,
              phoneNumber: '+966 11 678 9012',
              email: 'riyadhpark@shawarmahouse.sa',
              workingHoursEn: 'Saturday - Wednesday: 10:00 AM - 11:00 PM\nThursday - Friday: 1:00 PM - 12:00 AM',
              workingHoursAr: 'السبت - الأربعاء: 10:00 صباحاً - 11:00 مساءً\nالخميس - الجمعة: 1:00 ظهراً - 12:00 صباحاً',
              order: 6,
              isActive: true,
            },
            {
              nameEn: 'Al Akariyah Branch',
              nameAr: 'فرع العقارية',
              addressEn: 'Al Akariyah District, King Abdullah Road, Riyadh',
              addressAr: 'حي العقارية، طريق الملك عبدالله، الرياض',
              latitude: 24.6436,
              longitude: 46.7148,
              phoneNumber: '+966 11 789 0123',
              email: 'akariyah@shawarmahouse.sa',
              workingHoursEn: 'Daily: 11:00 AM - 11:00 PM\nFriday: 2:00 PM - 11:00 PM',
              workingHoursAr: 'يومياً: 11:00 صباحاً - 11:00 مساءً\nالجمعة: 2:00 ظهراً - 11:00 مساءً',
              order: 7,
              isActive: true,
            },
            {
              nameEn: 'Takhassusi Street Branch',
              nameAr: 'فرع شارع التخصصي',
              addressEn: 'Al Takhassusi Street, Al Sahafah, Riyadh',
              addressAr: 'شارع التخصصي، الصحافة، الرياض',
              latitude: 24.7304,
              longitude: 46.6578,
              phoneNumber: '+966 11 890 1234',
              email: 'takhassusi@shawarmahouse.sa',
              workingHoursEn: 'Saturday - Thursday: 8:00 AM - 10:00 PM\nFriday: 12:00 PM - 10:00 PM',
              workingHoursAr: 'السبت - الخميس: 8:00 صباحاً - 10:00 مساءً\nالجمعة: 12:00 ظهراً - 10:00 مساءً',
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

    console.log('✅ Branches Map Section created with', mapSection.branches.length, 'branches');
    console.log(`   Section ID: ${mapSection.id}`);
    console.log(`   Map Center: ${mapSection.mapCenterLat}, ${mapSection.mapCenterLng}`);
    console.log(`   Zoom Level: ${mapSection.defaultZoomLevel}`);
    console.log('\n📍 Branches created:');
    mapSection.branches.forEach((branch, index) => {
      console.log(`   ${index + 1}. ${branch.nameEn} (${branch.nameAr})`);
      console.log(`      📍 ${branch.latitude}, ${branch.longitude}`);
      console.log(`      📞 ${branch.phoneNumber}`);
      console.log(`      ✉️  ${branch.email}`);
    });
  } catch (error) {
    console.error('❌ Error seeding Riyadh branches:', error);
    throw error;
  }
}

async function main() {
  try {
    await seedRiyadhBranches();
    console.log('\n✅ Riyadh Branches Map Section seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

