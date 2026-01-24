import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Prevent running twice
let isRunning = false;

// Helper to get random image from uploads
// IMPORTANT: Images must be stored with /uploads/ prefix to match the backend upload format
const images = [
  '/uploads/1457cc1f6de78e17ad36c6a6e62b23a1-1768855221216-208126349.jpg',
  '/uploads/1673625913451-1768852684578-545361120.jpg',
  '/uploads/54b0628ab7d98ca094ff8bf18740bf87-1768855221215-632812048.jpg',
  '/uploads/Arab Fantasy Art-1768854784466-355737854.jpeg',
  '/uploads/Gemini_Generated_Image_tvcarxtvcarxtvca-1768855176211-812239335.png',
  '/uploads/images-1768855242813-644523047.jpeg',
  '/uploads/islamic-ramadan-celebration-lantern-fantasy-style-1768853903569-779248527.jpg',
  '/uploads/pexels-ahmet-hilmi-ermis-480844837-31004590-1768854531837-964475232.jpg',
  '/uploads/pexels-ahmet-hilmi-ermis-480844837-31004590-1768855242813-377891414.jpg',
  '/uploads/pexels-ahmet-hilmi-ermis-480844837-31004590-1768855467438-134482372.jpg',
  '/uploads/pexels-uiliamnornberg-22711549-1768854475091-773282343.jpg',
  '/uploads/pexels-uiliamnornberg-22711549-1768855612124-96993250.jpg',
  '/uploads/ÙÙØ­Ø±ÙØ© Ø§ÙØ­ÙØ±Ø§Ø¡-02-1768853937329-125982290.jpg',
  '/uploads/ÙÙØ­Ø±ÙØ© Ø§ÙØ­ÙØ±Ø§Ø¡-02-1768853948122-593612476.jpg',
];

const video = '/uploads/Ø§ÙÙÙØ§Ù Ø®ÙØ§ÙÙØ© ÙÙÙÙÙØ§ ÙØ§Ø³Ù clip (1)-1768853922569-918046195.mp4';

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];
const getImage = (index) => images[index % images.length];

async function clearDatabase() {
  console.log('🗑️  Clearing existing data...');
  
  // Delete in reverse order of dependencies
  await prisma.user.deleteMany({}); // Clear users first
  await prisma.heroStat.deleteMany({});
  await prisma.heroMedia.deleteMany({});
  await prisma.heroSection.deleteMany({});
  await prisma.productColor.deleteMany({});
  await prisma.productTechnicalSpec.deleteMany({});
  await prisma.productImage.deleteMany({});
  await prisma.productOrder.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.categoriesSectionSettings.deleteMany({});
  await prisma.solution.deleteMany({});
  await prisma.solutionsSectionSettings.deleteMany({});
  await prisma.projectImage.deleteMany({});
  await prisma.projectLogo.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.projectsSectionSettings.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.articlesSectionSettings.deleteMany({});
  await prisma.brandLogo.deleteMany({});
  await prisma.brandsSectionSettings.deleteMany({});
  await prisma.testimonialProfile.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.startProjectSection.deleteMany({});
  await prisma.sectionOrder.deleteMany({});
  await prisma.themeSettings.deleteMany({});
  await prisma.generalSettings.deleteMany({});
  await prisma.contactPageSettings.deleteMany({});
  await prisma.termsAndConditionsPageSettings.deleteMany({});
  await prisma.fAQItem.deleteMany({});
  await prisma.fAQPageSettings.deleteMany({});
  await prisma.careersJobBenefit.deleteMany({});
  await prisma.jobApplication.deleteMany({});
  await prisma.careersJobListing.deleteMany({});
  await prisma.careersWhyWorkWithUsItem.deleteMany({});
  await prisma.careersPageSettings.deleteMany({});
  await prisma.projectHeroButton.deleteMany({});
  await prisma.projectsPageSettings.deleteMany({});
  await prisma.contactRequest.deleteMany({});
  await prisma.requestType.deleteMany({});
  await prisma.productsPageSettings.deleteMany({});
  await prisma.servicesPageSettings.deleteMany({});
  await prisma.blogsPageSettings.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.blogCategory.deleteMany({});
  await prisma.serviceTag.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.productType.deleteMany({});
  await prisma.color.deleteMany({});
  await prisma.country.deleteMany({});
  await prisma.year.deleteMany({});
  await prisma.navbarLink.deleteMany({});
  await prisma.navbarSettings.deleteMany({});
  await prisma.footerLink.deleteMany({});
  await prisma.socialMedia.deleteMany({});
  await prisma.footerSettings.deleteMany({});
  await prisma.aboutUsMetric.deleteMany({});
  await prisma.aboutUsNavigationButton.deleteMany({});
  await prisma.aboutUsStoryItem.deleteMany({});
  await prisma.aboutUsCoreValue.deleteMany({});
  await prisma.aboutUsTeamMember.deleteMany({});
  await prisma.aboutUsAward.deleteMany({});
  await prisma.aboutUsPageSettings.deleteMany({});
  await prisma.downloadAppSection.deleteMany({});
  await prisma.branch.deleteMany({});
  await prisma.branchesMapSection.deleteMany({});
  
  console.log('✅ Database cleared');
}

async function seedAdmin() {
  console.log('👤 Seeding admin user...');
  
  const adminEmail = 'admin@central.com';
  const adminPassword = 'central@admin123';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Delete any existing admins to avoid conflicts
  await prisma.user.deleteMany({});

  // Create new admin
  await prisma.user.create({
    data: {
      email: adminEmail,
      username: 'baitshawarma_admin',
      name: 'Bait Al Shawarma Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });
  console.log('✅ Admin user created');
}

async function seedHeroSection() {
  console.log('🎬 Seeding Hero Section...');
  
  const hero = await prisma.heroSection.create({
    data: {
      isActive: true,
      titleEn: 'Welcome to Bait Al Shawarma',
      titleAr: 'مرحباً بكم في بيت الشاورما',
      descriptionEn: 'Discover the authentic taste of Middle Eastern cuisine with our premium shawarma equipment and restaurant solutions',
      descriptionAr: 'اكتشف الطعم الأصيل للمطبخ الشرق أوسطي مع معدات الشاورما والحلول المتكاملة للمطاعم',
      buttonTextEn: 'Explore Our Products',
      buttonTextAr: 'استكشف منتجاتنا',
      buttonLink: '/products',
      autoPlayInterval: 5000,
      mediaItems: {
        create: [
          { type: 'video', url: video, order: 0 },
          { type: 'image', url: getImage(0), order: 1 },
          { type: 'image', url: getImage(1), order: 2 },
          { type: 'image', url: getImage(2), order: 3 },
        ],
      },
      stats: {
        create: [
          {
            numberEn: '500+',
            numberAr: '500+',
            labelEn: 'Happy Clients',
            labelAr: 'عميل سعيد',
            descriptionEn: 'Restaurants trust us',
            descriptionAr: 'مطعم يثق بنا',
            link: '/projects',
            buttonTextEn: 'View Projects',
            buttonTextAr: 'عرض المشاريع',
            order: 0,
          },
          {
            numberEn: '1000+',
            numberAr: '1000+',
            labelEn: 'Products',
            labelAr: 'منتج',
            descriptionEn: 'Premium equipment',
            descriptionAr: 'معدات عالية الجودة',
            link: '/products',
            buttonTextEn: 'Browse Products',
            buttonTextAr: 'تصفح المنتجات',
            order: 1,
          },
          {
            numberEn: '25+',
            numberAr: '25+',
            labelEn: 'Years',
            labelAr: 'سنة',
            descriptionEn: 'Industry experience',
            descriptionAr: 'خبرة في المجال',
            link: '/about',
            buttonTextEn: 'Our Story',
            buttonTextAr: 'قصتنا',
            order: 2,
          },
          {
            numberEn: '50+',
            numberAr: '50+',
            labelEn: 'Brands',
            labelAr: 'علامة تجارية',
            descriptionEn: 'Global partners',
            descriptionAr: 'شراكات عالمية',
            link: '/products',
            buttonTextEn: 'View Brands',
            buttonTextAr: 'عرض العلامات',
            order: 3,
          },
        ],
      },
    },
  });
  
  console.log('✅ Hero Section seeded');
  return hero;
}

async function seedCategories() {
  console.log('📦 Seeding Categories...');
  
  await prisma.categoriesSectionSettings.create({
    data: {
      sectionTitleEn: 'Our Product Categories',
      sectionTitleAr: 'فئات منتجاتنا',
      sectionSubtitleEn: 'Everything for Your Restaurant',
      sectionSubtitleAr: 'كل ما تحتاجه لمطعمك',
      isActive: true,
    },
  });

  const categories = [
    {
      titleEn: 'Shawarma Machines',
      titleAr: 'ماكينات الشاورما',
      productCount: 85,
      imageUrl: getImage(3),
      gridClasses: 'col-span-2 row-span-2 col-start-1 row-start-1',
      order: 0,
    },
    {
      titleEn: 'Grills & BBQ',
      titleAr: 'شوايات وباربكيو',
      productCount: 120,
      imageUrl: getImage(4),
      gridClasses: 'col-span-1 row-span-1 col-start-3 row-start-1',
      order: 1,
    },
    {
      titleEn: 'Fryers',
      titleAr: 'قلايات',
      productCount: 65,
      imageUrl: getImage(5),
      gridClasses: 'col-span-1 row-span-1 col-start-4 row-start-1',
      order: 2,
    },
    {
      titleEn: 'Refrigeration',
      titleAr: 'ثلاجات وتبريد',
      productCount: 95,
      imageUrl: getImage(6),
      gridClasses: 'col-span-1 row-span-2 col-start-3 row-start-2',
      order: 3,
    },
    {
      titleEn: 'Kitchen Equipment',
      titleAr: 'معدات المطبخ',
      productCount: 150,
      imageUrl: getImage(7),
      gridClasses: 'col-span-1 row-span-1 col-start-4 row-start-2',
      order: 4,
    },
    {
      titleEn: 'Display Cases',
      titleAr: 'فتارين العرض',
      productCount: 45,
      imageUrl: getImage(8),
      gridClasses: 'col-span-1 row-span-1 col-start-4 row-start-3',
      order: 5,
    },
    {
      titleEn: 'Ovens & Ranges',
      titleAr: 'أفران وبوتاجازات',
      productCount: 78,
      imageUrl: getImage(9),
      gridClasses: 'col-span-2 row-span-1 col-start-1 row-start-3',
      order: 6,
    },
    {
      titleEn: 'Dishwashers',
      titleAr: 'غسالات الصحون',
      productCount: 35,
      imageUrl: getImage(10),
      gridClasses: 'col-span-1 row-span-1 col-start-1 row-start-4',
      order: 7,
    },
    {
      titleEn: 'Food Processors',
      titleAr: 'محضرات الطعام',
      productCount: 55,
      imageUrl: getImage(11),
      gridClasses: 'col-span-2 row-span-1 col-start-2 row-start-4',
      order: 8,
    },
    {
      titleEn: 'Furniture',
      titleAr: 'أثاث المطاعم',
      productCount: 110,
      imageUrl: getImage(12),
      gridClasses: 'col-span-1 row-span-1 col-start-4 row-start-4',
      order: 9,
    },
  ];

  for (const cat of categories) {
    await prisma.category.create({ data: cat });
  }
  
  console.log('✅ Categories seeded');
}

async function seedSolutions() {
  console.log('💡 Seeding Solutions...');
  
  await prisma.solutionsSectionSettings.create({
    data: {
      sectionTitleEn: 'Complete Restaurant Solutions',
      sectionTitleAr: 'حلول متكاملة للمطاعم',
      sectionSubtitleEn: 'Everything you need under one roof',
      sectionSubtitleAr: 'كل ما تحتاجه تحت سقف واحد',
      isActive: true,
    },
  });

  const solutions = [
    {
      titleEn: 'Restaurant Design',
      titleAr: 'تصميم المطاعم',
      descriptionEn: 'Complete restaurant design and layout planning services',
      descriptionAr: 'خدمات تصميم وتخطيط المطاعم المتكاملة',
      imageUrl: getImage(0),
      height: 'h-[400px]',
      tags: [
        { textEn: '3D Design', textAr: 'تصميم ثلاثي الأبعاد' },
        { textEn: 'Space Planning', textAr: 'تخطيط المساحات' },
      ],
      ctaButtonTextEn: 'Learn More',
      ctaButtonTextAr: 'اعرف المزيد',
      ctaButtonLink: '/services',
      order: 0,
    },
    {
      titleEn: 'Equipment Supply',
      titleAr: 'توريد المعدات',
      descriptionEn: 'Premium quality restaurant equipment from top brands',
      descriptionAr: 'معدات مطاعم عالية الجودة من أفضل العلامات التجارية',
      imageUrl: getImage(1),
      height: 'h-[400px]',
      tags: [
        { textEn: 'Quality Assured', textAr: 'جودة مضمونة' },
        { textEn: 'Warranty', textAr: 'ضمان' },
      ],
      extraCount: 150,
      ctaButtonTextEn: 'Browse Products',
      ctaButtonTextAr: 'تصفح المنتجات',
      ctaButtonLink: '/products',
      order: 1,
    },
    {
      titleEn: 'Installation Services',
      titleAr: 'خدمات التركيب',
      descriptionEn: 'Professional installation by certified technicians',
      descriptionAr: 'تركيب احترافي من قبل فنيين معتمدين',
      imageUrl: getImage(2),
      height: 'h-[400px]',
      tags: [
        { textEn: 'Expert Team', textAr: 'فريق خبير' },
        { textEn: 'Fast Service', textAr: 'خدمة سريعة' },
      ],
      ctaButtonTextEn: 'Contact Us',
      ctaButtonTextAr: 'اتصل بنا',
      ctaButtonLink: '/contact',
      order: 2,
    },
    {
      titleEn: 'Maintenance & Support',
      titleAr: 'الصيانة والدعم',
      descriptionEn: '24/7 maintenance and technical support services',
      descriptionAr: 'خدمات الصيانة والدعم الفني على مدار الساعة',
      imageUrl: getImage(3),
      height: 'h-[400px]',
      tags: [
        { textEn: '24/7 Support', textAr: 'دعم 24/7' },
        { textEn: 'Quick Response', textAr: 'استجابة سريعة' },
      ],
      ctaButtonTextEn: 'Get Support',
      ctaButtonTextAr: 'احصل على الدعم',
      ctaButtonLink: '/contact',
      order: 3,
    },
  ];

  for (const sol of solutions) {
    await prisma.solution.create({ data: sol });
  }
  
  console.log('✅ Solutions seeded');
}

async function seedProjects() {
  console.log('🏗️  Seeding Projects...');
  
  const settings = await prisma.projectsSectionSettings.create({
    data: {
      sectionTitleEn: 'Our Successful Projects',
      sectionTitleAr: 'مشاريعنا الناجحة',
      sectionSubtitleEn: 'Proud to serve the best',
      sectionSubtitleAr: 'فخورون بخدمة الأفضل',
      buttonTextEn: 'View Details',
      buttonTextAr: 'عرض التفاصيل',
      ctaButtonTextEn: 'View All Projects',
      ctaButtonTextAr: 'عرض جميع المشاريع',
      ctaButtonLink: '/projects',
      galleryTitleEn: 'Project Gallery',
      galleryTitleAr: 'معرض المشروع',
      isActive: true,
    },
  });

  const projects = [
    {
      titleEn: 'Al Reef Restaurant',
      titleAr: 'مطعم الريف',
      descriptionEn: 'Complete kitchen setup for a premium Lebanese restaurant',
      descriptionAr: 'تجهيز مطبخ متكامل لمطعم لبناني فاخر',
      contentEn: '<p>We provided complete kitchen equipment and design services for Al Reef Restaurant, including shawarma machines, grills, refrigeration units, and more.</p>',
      contentAr: '<p>قدمنا معدات مطبخ متكاملة وخدمات تصميم لمطعم الريف، بما في ذلك ماكينات شاورما، شوايات، وحدات تبريد، والمزيد.</p>',
      imageUrl: getImage(4),
      heroImageUrl: getImage(5),
      productsCount: 45,
      specifications: [
        { keyEn: 'Location', keyAr: 'الموقع', valueEn: 'Dubai, UAE', valueAr: 'دبي، الإمارات' },
        { keyEn: 'Completion', keyAr: 'التسليم', valueEn: '2023', valueAr: '2023' },
        { keyEn: 'Size', keyAr: 'المساحة', valueEn: '250 sqm', valueAr: '250 متر مربع' },
      ],
      order: 0,
    },
    {
      titleEn: 'Shawarma Express Chain',
      titleAr: 'سلسلة شاورما اكسبريس',
      descriptionEn: 'Equipment supply for 10 branches across the UAE',
      descriptionAr: 'توريد معدات لـ 10 فروع في الإمارات',
      contentEn: '<p>Large-scale project supplying equipment for 10 Shawarma Express branches.</p>',
      contentAr: '<p>مشروع كبير لتوريد المعدات لـ 10 فروع شاورما اكسبريس.</p>',
      imageUrl: getImage(6),
      heroImageUrl: getImage(7),
      productsCount: 120,
      specifications: [
        { keyEn: 'Branches', keyAr: 'الفروع', valueEn: '10', valueAr: '10' },
        { keyEn: 'Year', keyAr: 'السنة', valueEn: '2024', valueAr: '2024' },
      ],
      order: 1,
    },
    {
      titleEn: 'Grand Hotel Kitchen',
      titleAr: 'مطبخ الفندق الكبير',
      descriptionEn: 'Full kitchen equipment for a 5-star hotel',
      descriptionAr: 'معدات مطبخ كاملة لفندق 5 نجوم',
      contentEn: '<p>Premium equipment installation for a luxury hotel kitchen.</p>',
      contentAr: '<p>تركيب معدات فاخرة لمطبخ فندق فاخر.</p>',
      imageUrl: getImage(8),
      heroImageUrl: getImage(9),
      productsCount: 200,
      specifications: [
        { keyEn: 'Type', keyAr: 'النوع', valueEn: '5-Star Hotel', valueAr: 'فندق 5 نجوم' },
        { keyEn: 'Capacity', keyAr: 'السعة', valueEn: '500 guests', valueAr: '500 ضيف' },
      ],
      order: 2,
    },
  ];

  for (const proj of projects) {
    const project = await prisma.project.create({
      data: {
        ...proj,
        projectsSectionId: settings.id,
        logos: {
          create: [
            { imageUrl: getImage(10), order: 0 },
          ],
        },
        galleryImages: {
          create: [
            { imageUrl: getImage(11), order: 0 },
            { imageUrl: getImage(12), order: 1 },
            { imageUrl: getImage(13), order: 2 },
            { imageUrl: getImage(0), order: 3 },
          ],
        },
      },
    });
  }
  
  console.log('✅ Projects seeded');
}

async function seedBrands() {
  console.log('🏷️  Seeding Brands...');
  
  const settings = await prisma.brandsSectionSettings.create({
    data: {
      sectionTitleEn: 'Premium Global Brands',
      sectionTitleAr: 'علامات تجارية عالمية مميزة',
      sectionSubtitleEn: 'We partner with the best',
      sectionSubtitleAr: 'نتعاون مع الأفضل',
      isActive: true,
    },
  });

  const brands = [
    { nameEn: 'Rational', nameAr: 'راشيونال', imageUrl: getImage(0), order: 0 },
    { nameEn: 'Zanussi', nameAr: 'زانوسي', imageUrl: getImage(1), order: 1 },
    { nameEn: 'Electrolux', nameAr: 'إلكترولوكس', imageUrl: getImage(2), order: 2 },
    { nameEn: 'Convotherm', nameAr: 'كونفوثيرم', imageUrl: getImage(3), order: 3 },
    { nameEn: 'Hobart', nameAr: 'هوبارت', imageUrl: getImage(4), order: 4 },
    { nameEn: 'Manitowoc', nameAr: 'مانيتووك', imageUrl: getImage(5), order: 5 },
    { nameEn: 'Robot Coupe', nameAr: 'روبوت كوب', imageUrl: getImage(6), order: 6 },
    { nameEn: 'Merrychef', nameAr: 'ميريشيف', imageUrl: getImage(7), order: 7 },
  ];

  for (const brand of brands) {
    await prisma.brandLogo.create({
      data: {
        ...brand,
        brandsSectionId: settings.id,
      },
    });
  }
  
  console.log('✅ Brands seeded');
}

async function seedTestimonials() {
  console.log('💬 Seeding Testimonials...');
  
  const testimonial = await prisma.testimonial.create({
    data: {
      sectionTitleEn: 'What Our Clients Say',
      sectionTitleAr: 'آراء عملائنا',
      sectionSubtitleEn: 'Customer satisfaction is our priority',
      sectionSubtitleAr: 'رضا العملاء أولويتنا',
      textEn: 'Bait Al Shawarma provided excellent service and top-quality equipment for our restaurant. Highly recommended!',
      textAr: 'قدم بيت الشاورما خدمة ممتازة ومعدات عالية الجودة لمطعمنا. نوصي بهم بشدة!',
      imageUrl: getImage(0),
      order: 0,
      profiles: {
        create: [
          {
            name: 'Ahmed Al Mansoori',
            role: 'Restaurant Owner',
            imageUrl: getImage(1),
            testimonialTextEn: 'Best equipment supplier in UAE!',
            testimonialTextAr: 'أفضل مورد معدات في الإمارات!',
            testimonialImageUrl: getImage(2),
            order: 0,
          },
          {
            name: 'Fatima Al Hashimi',
            role: 'Chef',
            imageUrl: getImage(3),
            testimonialTextEn: 'Professional service and quality products',
            testimonialTextAr: 'خدمة احترافية ومنتجات عالية الجودة',
            testimonialImageUrl: getImage(4),
            order: 1,
          },
          {
            name: 'Mohammed Al Suwaidi',
            role: 'Hotel Manager',
            imageUrl: getImage(5),
            testimonialTextEn: 'Reliable partner for our hotel kitchen',
            testimonialTextAr: 'شريك موثوق لمطبخ فندقنا',
            testimonialImageUrl: getImage(6),
            order: 2,
          },
        ],
      },
    },
  });
  
  console.log('✅ Testimonials seeded');
}

async function seedStartProjectSection() {
  console.log('🚀 Seeding Start Project Section...');
  
  await prisma.startProjectSection.create({
    data: {
      titleEn: 'Ready to Start Your Restaurant Project?',
      titleAr: 'هل أنت مستعد لبدء مشروع مطعمك؟',
      descriptionEn: 'Get in touch with our experts for a free consultation and quotation',
      descriptionAr: 'تواصل مع خبرائنا للحصول على استشارة وعرض أسعار مجاني',
      backgroundImageUrl: getImage(7),
      button1TextEn: 'Talk to Expert',
      button1TextAr: 'تحدث مع خبير',
      button1Link: '/contact',
      button2TextEn: 'Get Quote',
      button2TextAr: 'احصل على عرض سعر',
      button2Link: '/contact',
      isActive: true,
    },
  });
  
  console.log('✅ Start Project Section seeded');
}

async function seedSettings() {
  console.log('⚙️  Seeding Settings...');
  
  // Theme Settings
  await prisma.themeSettings.create({
    data: {
      colorBrand: '#d97706',
      colorBrandDark: '#b45309',
      isActive: true,
    },
  });

  // General Settings
  await prisma.generalSettings.create({
    data: {
      currencyCode: 'AED',
      currencySymbol: 'د.إ',
      currencyNameEn: 'UAE Dirham',
      currencyNameAr: 'درهم إماراتي',
      isActive: true,
    },
  });

  // Section Order
  const sections = ['hero', 'categories', 'solutions', 'brands', 'projects', 'testimonials', 'cta', 'articles'];
  for (let i = 0; i < sections.length; i++) {
    await prisma.sectionOrder.create({
      data: {
        sectionName: sections[i],
        order: i,
        isVisible: true,
      },
    });
  }
  
  console.log('✅ Settings seeded');
}

async function seedPages() {
  console.log('📄 Seeding Pages...');
  
  // Contact Page
  await prisma.contactPageSettings.create({
    data: {
      heroImageUrl: getImage(8),
      titleEn: 'Contact Us',
      titleAr: 'اتصل بنا',
      descriptionEn: 'Get in touch with us for any inquiries',
      descriptionAr: 'تواصل معنا لأي استفسارات',
      phoneNumber: '+971 4 123 4567',
      email: 'info@baitalshawarma.com',
      workingHoursEn: 'Sunday - Thursday: 8:00 AM - 6:00 PM',
      workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 6:00 مساءً',
      locationEn: 'Dubai, United Arab Emirates',
      locationAr: 'دبي، الإمارات العربية المتحدة',
      mapLatitude: 25.2048,
      mapLongitude: 55.2708,
      isActive: true,
    },
  });

  // Products Page
  await prisma.productsPageSettings.create({
    data: {
      heroTitleEn: 'Our Products',
      heroTitleAr: 'منتجاتنا',
      heroImageUrl: getImage(9),
      isActive: true,
    },
  });

  // Projects Page
  await prisma.projectsPageSettings.create({
    data: {
      heroTitleEn: 'Our Projects',
      heroTitleAr: 'مشاريعنا',
      heroDescriptionEn: 'Discover our successful restaurant projects',
      heroDescriptionAr: 'اكتشف مشاريع مطاعمنا الناجحة',
      heroImageUrl: getImage(10),
      isActive: true,
    },
  });

  // Services Page
  await prisma.servicesPageSettings.create({
    data: {
      heroTitleEn: 'Our Services',
      heroTitleAr: 'خدماتنا',
      heroDescriptionEn: 'Complete restaurant solutions from design to installation',
      heroDescriptionAr: 'حلول مطاعم متكاملة من التصميم إلى التركيب',
      heroImageUrl: getImage(11),
      tickerTextEn: 'Professional Restaurant Equipment & Solutions',
      tickerTextAr: 'معدات وحلول مطاعم احترافية',
      isActive: true,
    },
  });

  // Terms and Conditions Page
  await prisma.termsAndConditionsPageSettings.create({
    data: {
      heroImageUrl: getImage(12),
      titleEn: 'Terms and Conditions',
      titleAr: 'الشروط والأحكام',
      descriptionEn: 'Please read these terms and conditions carefully',
      descriptionAr: 'يرجى قراءة هذه الشروط والأحكام بعناية',
      contentEn: `
        <h2>Terms of Service</h2>
        <p>Welcome to Bait Al Shawarma. By using our services, you agree to these terms.</p>
        <h3>1. Products and Services</h3>
        <p>We provide high-quality restaurant equipment and related services.</p>
        <h3>2. Pricing and Payment</h3>
        <p>All prices are in AED and subject to change without notice.</p>
        <h3>3. Warranty</h3>
        <p>Products come with manufacturer warranties as specified.</p>
        <h3>4. Returns and Refunds</h3>
        <p>Returns are accepted within 14 days with original packaging.</p>
      `,
      contentAr: `
        <h2>شروط الخدمة</h2>
        <p>مرحباً بكم في بيت الشاورما. باستخدام خدماتنا، فإنك توافق على هذه الشروط.</p>
        <h3>1. المنتجات والخدمات</h3>
        <p>نحن نقدم معدات مطاعم عالية الجودة والخدمات ذات الصلة.</p>
        <h3>2. التسعير والدفع</h3>
        <p>جميع الأسعار بالدرهم الإماراتي وقابلة للتغيير دون إشعار مسبق.</p>
        <h3>3. الضمان</h3>
        <p>المنتجات تأتي مع ضمانات الشركة المصنعة كما هو محدد.</p>
        <h3>4. الإرجاع والاسترداد</h3>
        <p>يتم قبول الإرجاع خلال 14 يوماً مع التغليف الأصلي.</p>
      `,
      isActive: true,
    },
  });
  
  console.log('✅ Pages seeded');
}

async function seedNavbarFooter() {
  console.log('🧭 Seeding Navbar & Footer...');
  
  // Navbar
  const navbar = await prisma.navbarSettings.create({
    data: {
      logoUrl: getImage(0),
      isActive: true,
      links: {
        create: [
          { textEn: 'Home', textAr: 'الرئيسية', link: '/', order: 0 },
          { textEn: 'Products', textAr: 'المنتجات', link: '/products', order: 1 },
          { textEn: 'Services', textAr: 'الخدمات', link: '/services', order: 2 },
          { textEn: 'Projects', textAr: 'المشاريع', link: '/projects', order: 3 },
          { textEn: 'About', textAr: 'من نحن', link: '/about', order: 4 },
          { textEn: 'Contact', textAr: 'اتصل بنا', link: '/contact', order: 5 },
        ],
      },
    },
  });

  // Footer
  const footer = await prisma.footerSettings.create({
    data: {
      column1TitleEn: 'Quick Links',
      column1TitleAr: 'روابط سريعة',
      column2TitleEn: 'Products',
      column2TitleAr: 'المنتجات',
      column3TitleEn: 'Services',
      column3TitleAr: 'الخدمات',
      column4TitleEn: 'Company',
      column4TitleAr: 'الشركة',
      followUsTitleEn: 'Follow Us',
      followUsTitleAr: 'تابعنا',
      newsletterTitleEn: 'Newsletter',
      newsletterTitleAr: 'النشرة الإخبارية',
      newsletterEmailPlaceholderEn: 'Your email',
      newsletterEmailPlaceholderAr: 'بريدك الإلكتروني',
      newsletterButtonTextEn: 'Subscribe',
      newsletterButtonTextAr: 'اشترك',
      copyrightTextEn: '© 2024 Bait Al Shawarma. All rights reserved.',
      copyrightTextAr: '© 2024 بيت الشاورما. جميع الحقوق محفوظة.',
      isActive: true,
      links: {
        create: [
          { column: 1, textEn: 'Home', textAr: 'الرئيسية', link: '/', order: 0 },
          { column: 1, textEn: 'About', textAr: 'من نحن', link: '/about', order: 1 },
          { column: 1, textEn: 'Contact', textAr: 'اتصل بنا', link: '/contact', order: 2 },
          { column: 2, textEn: 'Shawarma Machines', textAr: 'ماكينات الشاورما', link: '/products', order: 0 },
          { column: 2, textEn: 'Kitchen Equipment', textAr: 'معدات المطبخ', link: '/products', order: 1 },
          { column: 3, textEn: 'Design', textAr: 'التصميم', link: '/services', order: 0 },
          { column: 3, textEn: 'Installation', textAr: 'التركيب', link: '/services', order: 1 },
          { column: 4, textEn: 'Projects', textAr: 'المشاريع', link: '/projects', order: 0 },
          { column: 4, textEn: 'Careers', textAr: 'الوظائف', link: '/careers', order: 1 },
        ],
      },
      socialMedia: {
        create: [
          { name: 'Facebook', url: 'https://facebook.com', iconType: 'Facebook', order: 0 },
          { name: 'Instagram', url: 'https://instagram.com', iconType: 'Instagram', order: 1 },
          { name: 'LinkedIn', url: 'https://linkedin.com', iconType: 'Linkedin', order: 2 },
        ],
      },
    },
  });
  
  console.log('✅ Navbar & Footer seeded');
}

async function seedProducts() {
  console.log('🛒 Seeding Products...');
  
  // First create filters (Colors, Countries, Years, ProductTypes)
  const colors = [
    { nameEn: 'Silver', nameAr: 'فضي', hexCode: '#C0C0C0', order: 0 },
    { nameEn: 'Black', nameAr: 'أسود', hexCode: '#000000', order: 1 },
    { nameEn: 'White', nameAr: 'أبيض', hexCode: '#FFFFFF', order: 2 },
    { nameEn: 'Red', nameAr: 'أحمر', hexCode: '#FF0000', order: 3 },
  ];
  
  for (const color of colors) {
    await prisma.color.create({ data: color });
  }
  
  const countries = [
    { nameEn: 'Turkey', nameAr: 'تركيا', order: 0 },
    { nameEn: 'Germany', nameAr: 'ألمانيا', order: 1 },
    { nameEn: 'Italy', nameAr: 'إيطاليا', order: 2 },
    { nameEn: 'China', nameAr: 'الصين', order: 3 },
    { nameEn: 'USA', nameAr: 'أمريكا', order: 4 },
  ];
  
  for (const country of countries) {
    await prisma.country.create({ data: country });
  }
  
  const years = [2024, 2023, 2022, 2021, 2020];
  for (const year of years) {
    await prisma.year.create({ data: { year, order: 2024 - year } });
  }
  
  const productTypes = [
    { nameEn: 'Gas', nameAr: 'غاز', order: 0 },
    { nameEn: 'Electric', nameAr: 'كهربائي', order: 1 },
    { nameEn: 'Commercial', nameAr: 'تجاري', order: 2 },
    { nameEn: 'Industrial', nameAr: 'صناعي', order: 3 },
  ];
  
  for (const type of productTypes) {
    await prisma.productType.create({ data: type });
  }
  
  // Get created data
  const allColors = await prisma.color.findMany();
  const allCountries = await prisma.country.findMany();
  const allYears = await prisma.year.findMany();
  const allTypes = await prisma.productType.findMany();
  const allCategories = await prisma.category.findMany();
  const allBrands = await prisma.brandLogo.findMany();
  
  // Create sample products
  const sampleProducts = [
    {
      titleEn: 'Professional Shawarma Machine GSM-3',
      titleAr: 'ماكينة شاورما احترافية GSM-3',
      descriptionEn: 'High-quality gas shawarma machine with 3 burners',
      descriptionAr: 'ماكينة شاورما غاز عالية الجودة بـ 3 شعلات',
      price: 2500.00,
      oldPrice: 3000.00,
      availability: 15,
      warranty: '12 months',
      detailedDescriptionEn: '<p>Professional-grade shawarma machine perfect for restaurants and food trucks.</p>',
      detailedDescriptionAr: '<p>ماكينة شاورما احترافية مثالية للمطاعم وعربات الطعام.</p>',
      mediaType: 'image',
      categoryId: allCategories[0]?.id,
      productTypeId: allTypes[0]?.id,
      brandLogoId: allBrands[0]?.id,
      countryId: allCountries[0]?.id,
      yearId: allYears[0]?.id,
      order: 0,
    },
    {
      titleEn: 'Electric Shawarma Grill ESG-4',
      titleAr: 'شواية شاورما كهربائية ESG-4',
      descriptionEn: 'Electric shawarma grill with automatic rotation',
      descriptionAr: 'شواية شاورما كهربائية مع دوران تلقائي',
      price: 3200.00,
      availability: 8,
      warranty: '24 months',
      detailedDescriptionEn: '<p>Energy-efficient electric shawarma grill with precision temperature control.</p>',
      detailedDescriptionAr: '<p>شواية شاورما كهربائية موفرة للطاقة مع تحكم دقيق في درجة الحرارة.</p>',
      mediaType: 'image',
      categoryId: allCategories[0]?.id,
      productTypeId: allTypes[1]?.id,
      brandLogoId: allBrands[1]?.id,
      countryId: allCountries[1]?.id,
      yearId: allYears[0]?.id,
      order: 1,
    },
    {
      titleEn: 'Commercial Deep Fryer DF-20L',
      titleAr: 'قلاية عميقة تجارية DF-20L',
      descriptionEn: '20L capacity commercial deep fryer with temperature control',
      descriptionAr: 'قلاية عميقة تجارية سعة 20 لتر مع تحكم في الحرارة',
      price: 1800.00,
      oldPrice: 2200.00,
      availability: 12,
      warranty: '18 months',
      detailedDescriptionEn: '<p>Heavy-duty commercial fryer ideal for high-volume cooking.</p>',
      detailedDescriptionAr: '<p>قلاية تجارية متينة مثالية للطهي بكميات كبيرة.</p>',
      mediaType: 'image',
      categoryId: allCategories[2]?.id,
      productTypeId: allTypes[1]?.id,
      brandLogoId: allBrands[2]?.id,
      countryId: allCountries[2]?.id,
      yearId: allYears[1]?.id,
      order: 2,
    },
    {
      titleEn: 'Industrial Refrigerator IR-4D',
      titleAr: 'ثلاجة صناعية IR-4D',
      descriptionEn: '4-door industrial refrigerator with digital display',
      descriptionAr: 'ثلاجة صناعية 4 أبواب مع شاشة رقمية',
      price: 5500.00,
      availability: 5,
      warranty: '24 months',
      detailedDescriptionEn: '<p>Large capacity refrigerator with precise temperature control.</p>',
      detailedDescriptionAr: '<p>ثلاجة سعة كبيرة مع تحكم دقيق في درجة الحرارة.</p>',
      mediaType: 'image',
      categoryId: allCategories[3]?.id,
      productTypeId: allTypes[3]?.id,
      brandLogoId: allBrands[3]?.id,
      countryId: allCountries[1]?.id,
      yearId: allYears[0]?.id,
      order: 3,
    },
    {
      titleEn: 'Pizza Oven PO-6',
      titleAr: 'فرن بيتزا PO-6',
      descriptionEn: 'Professional pizza oven with stone deck',
      descriptionAr: 'فرن بيتزا احترافي مع قاعدة حجرية',
      price: 4200.00,
      availability: 6,
      warranty: '12 months',
      detailedDescriptionEn: '<p>Authentic Italian-style pizza oven for perfect results.</p>',
      detailedDescriptionAr: '<p>فرن بيتزا على الطراز الإيطالي الأصيل للحصول على نتائج مثالية.</p>',
      mediaType: 'image',
      categoryId: allCategories[6]?.id,
      productTypeId: allTypes[0]?.id,
      brandLogoId: allBrands[4]?.id,
      countryId: allCountries[2]?.id,
      yearId: allYears[0]?.id,
      order: 4,
    },
  ];
  
  for (let i = 0; i < sampleProducts.length; i++) {
    const productData = sampleProducts[i];
    const product = await prisma.product.create({
      data: {
        ...productData,
        imageUrl: getImage(i),
        mediaUrl: getImage(i + 1),
        images: {
          create: [
            { imageUrl: getImage(i), order: 0 },
            { imageUrl: getImage(i + 1), order: 1 },
            { imageUrl: getImage(i + 2), order: 2 },
          ],
        },
        technicalSpecs: {
          create: [
            { titleEn: 'Power', titleAr: 'الطاقة', valueEn: '5kW', valueAr: '5 كيلووات', order: 0 },
            { titleEn: 'Dimensions', titleAr: 'الأبعاد', valueEn: '60x80x150cm', valueAr: '60×80×150سم', order: 1 },
            { titleEn: 'Weight', titleAr: 'الوزن', valueEn: '85kg', valueAr: '85 كجم', order: 2 },
          ],
        },
        colors: {
          create: [
            { colorId: allColors[0]?.id },
            { colorId: allColors[1]?.id },
          ],
        },
      },
    });
  }
  
  console.log('✅ Products seeded');
}

async function seedBlogs() {
  console.log('📝 Seeding Blogs...');
  
  await prisma.blogsPageSettings.create({
    data: {
      heroImageUrl: getImage(0),
      titleEn: 'Our Blog',
      titleAr: 'مدونتنا',
      descriptionEn: 'Latest news and tips from the restaurant industry',
      descriptionAr: 'آخر الأخبار والنصائح من صناعة المطاعم',
      heroSectionDescriptionEn: 'Stay updated with industry trends',
      heroSectionDescriptionAr: 'ابق على اطلاع بأحدث اتجاهات الصناعة',
      gridSectionTitleEn: 'Latest Articles',
      gridSectionTitleAr: 'آخر المقالات',
      isActive: true,
    },
  });
  
  const category = await prisma.blogCategory.create({
    data: {
      nameEn: 'Restaurant Tips',
      nameAr: 'نصائح المطاعم',
      order: 0,
    },
  });
  
  const blogs = [
    {
      titleEn: 'How to Choose the Right Shawarma Machine',
      titleAr: 'كيف تختار ماكينة الشاورما المناسبة',
      descriptionEn: 'Complete guide to selecting the perfect shawarma machine for your restaurant',
      descriptionAr: 'دليل شامل لاختيار ماكينة الشاورما المثالية لمطعمك',
      contentEn: '<p>Choosing the right shawarma machine is crucial for your restaurant success...</p>',
      contentAr: '<p>اختيار ماكينة الشاورما المناسبة أمر حاسم لنجاح مطعمك...</p>',
      authorEn: 'Chef Ali',
      authorAr: 'الشيف علي',
      imageUrl: getImage(1),
      date: new Date('2024-01-15'),
      categoryId: category.id,
      order: 0,
    },
    {
      titleEn: 'Essential Kitchen Equipment Maintenance Tips',
      titleAr: 'نصائح أساسية لصيانة معدات المطبخ',
      descriptionEn: 'Keep your kitchen equipment running smoothly with these maintenance tips',
      descriptionAr: 'حافظ على تشغيل معدات مطبخك بسلاسة مع هذه النصائح',
      contentEn: '<p>Regular maintenance extends equipment life...</p>',
      contentAr: '<p>الصيانة الدورية تطيل عمر المعدات...</p>',
      authorEn: 'Sarah Johnson',
      authorAr: 'سارة جونسون',
      imageUrl: getImage(2),
      date: new Date('2024-01-10'),
      categoryId: category.id,
      showInHero: true,
      order: 1,
    },
  ];
  
  for (const blog of blogs) {
    await prisma.blog.create({ data: blog });
  }
  
  console.log('✅ Blogs seeded');
}

async function seedServices() {
  console.log('🔧 Seeding Services...');
  
  const services = [
    {
      type: 'card',
      count: 1,
      titleEn: 'Restaurant Design & Planning',
      titleAr: 'تصميم وتخطيط المطاعم',
      descriptionEn: 'Professional 3D design and space optimization',
      descriptionAr: 'تصميم ثلاثي الأبعاد احترافي وتحسين المساحات',
      imageUrl: getImage(3),
      order: 0,
      tags: {
        create: [
          { textEn: '3D Visualization', textAr: 'تصور ثلاثي الأبعاد', order: 0 },
          { textEn: 'Space Optimization', textAr: 'تحسين المساحة', order: 1 },
        ],
      },
    },
    {
      type: 'image',
      count: 2,
      titleEn: 'Equipment Installation',
      titleAr: 'تركيب المعدات',
      descriptionEn: 'Expert installation by certified technicians',
      descriptionAr: 'تركيب احترافي من قبل فنيين معتمدين',
      imageUrl: getImage(4),
      order: 1,
      tags: {
        create: [
          { textEn: 'Professional Team', textAr: 'فريق محترف', order: 0 },
          { textEn: 'Quick Setup', textAr: 'إعداد سريع', order: 1 },
        ],
      },
    },
    {
      type: 'card',
      count: 3,
      titleEn: 'Maintenance & Repair',
      titleAr: 'الصيانة والإصلاح',
      descriptionEn: '24/7 maintenance support services',
      descriptionAr: 'خدمات صيانة ودعم على مدار الساعة',
      imageUrl: getImage(5),
      order: 2,
      tags: {
        create: [
          { textEn: '24/7 Support', textAr: 'دعم 24/7', order: 0 },
          { textEn: 'Fast Response', textAr: 'استجابة سريعة', order: 1 },
        ],
      },
    },
  ];
  
  for (const service of services) {
    await prisma.service.create({ data: service });
  }
  
  console.log('✅ Services seeded');
}

async function seedFAQ() {
  console.log('❓ Seeding FAQ...');
  
  const faqPage = await prisma.fAQPageSettings.create({
    data: {
      titleEn: 'Frequently Asked Questions',
      titleAr: 'الأسئلة الشائعة',
      descriptionEn: 'Find answers to common questions',
      descriptionAr: 'اعثر على إجابات للأسئلة الشائعة',
      isActive: true,
      faqItems: {
        create: [
          {
            questionEn: 'What is your warranty policy?',
            questionAr: 'ما هي سياسة الضمان؟',
            answerEn: 'We offer 12-24 months warranty on all equipment depending on the manufacturer.',
            answerAr: 'نقدم ضمان من 12-24 شهرًا على جميع المعدات حسب الشركة المصنعة.',
            order: 0,
          },
          {
            questionEn: 'Do you provide installation services?',
            questionAr: 'هل تقدمون خدمات التركيب؟',
            answerEn: 'Yes, we provide professional installation by certified technicians.',
            answerAr: 'نعم، نقدم تركيب احترافي من قبل فنيين معتمدين.',
            order: 1,
          },
          {
            questionEn: 'What payment methods do you accept?',
            questionAr: 'ما هي طرق الدفع المقبولة؟',
            answerEn: 'We accept cash, credit cards, and bank transfers.',
            answerAr: 'نقبل النقد والبطاقات الائتمانية والتحويلات البنكية.',
            order: 2,
          },
          {
            questionEn: 'Do you offer financing options?',
            questionAr: 'هل تقدمون خيارات تمويل؟',
            answerEn: 'Yes, we offer flexible payment plans for large orders.',
            answerAr: 'نعم، نقدم خطط دفع مرنة للطلبات الكبيرة.',
            order: 3,
          },
        ],
      },
    },
  });
  
  console.log('✅ FAQ seeded');
}

async function seedCareers() {
  console.log('💼 Seeding Careers...');
  
  const careers = await prisma.careersPageSettings.create({
    data: {
      heroImageUrl: getImage(6),
      heroTitleEn: 'Join Our Team',
      heroTitleAr: 'انضم لفريقنا',
      heroDescriptionEn: 'Be part of our growing family',
      heroDescriptionAr: 'كن جزءًا من عائلتنا المتنامية',
      whyWorkWithUsTitleEn: 'Why Work With Us?',
      whyWorkWithUsTitleAr: 'لماذا العمل معنا؟',
      isActive: true,
      jobBenefits: {
        create: [
          { textEn: 'Competitive Salary', textAr: 'راتب تنافسي', order: 0 },
          { textEn: 'Health Insurance', textAr: 'تأمين صحي', order: 1 },
          { textEn: 'Career Growth', textAr: 'نمو وظيفي', order: 2 },
          { textEn: 'Training Programs', textAr: 'برامج تدريب', order: 3 },
        ],
      },
      whyWorkWithUsItems: {
        create: [
          {
            titleEn: 'Great Environment',
            titleAr: 'بيئة عمل رائعة',
            descriptionEn: 'Work in a friendly and supportive environment',
            descriptionAr: 'اعمل في بيئة ودودة وداعمة',
            order: 0,
          },
          {
            titleEn: 'Learning Opportunities',
            titleAr: 'فرص التعلم',
            descriptionEn: 'Continuous learning and development programs',
            descriptionAr: 'برامج تعلم وتطوير مستمرة',
            order: 1,
          },
        ],
      },
      jobListings: {
        create: [
          {
            titleEn: 'Sales Manager',
            titleAr: 'مدير مبيعات',
            requiredExperienceEn: '3-5 years',
            requiredExperienceAr: '3-5 سنوات',
            locationEn: 'Dubai, UAE',
            locationAr: 'دبي، الإمارات',
            jobTypeEn: 'Full-time',
            jobTypeAr: 'دوام كامل',
            descriptionEn: '<p>We are looking for an experienced sales manager...</p>',
            descriptionAr: '<p>نبحث عن مدير مبيعات ذو خبرة...</p>',
            order: 0,
          },
        ],
      },
    },
  });
  
  console.log('✅ Careers seeded');
}

async function seedAboutUs() {
  console.log('👥 Seeding About Us...');
  
  const aboutUs = await prisma.aboutUsPageSettings.create({
    data: {
      heroImageUrl: getImage(7),
      heroTitleEn: 'About Bait Al Shawarma',
      heroTitleAr: 'عن بيت الشاورما',
      heroDescriptionEn: 'Leading provider of restaurant equipment in the UAE',
      heroDescriptionAr: 'المزود الرائد لمعدات المطاعم في الإمارات',
      visionSectionTitleEn: 'Our Vision',
      visionSectionTitleAr: 'رؤيتنا',
      visionTextEn: 'To be the premier provider of restaurant equipment and solutions in the Middle East',
      visionTextAr: 'أن نكون المزود الرئيسي لمعدات وحلول المطاعم في الشرق الأوسط',
      visionImageUrl: getImage(8),
      visionQuoteTextEn: 'Quality is our commitment',
      visionQuoteTextAr: 'الجودة التزامنا',
      visionQuoteAuthorNameEn: 'Ahmed Al Mansoori',
      visionQuoteAuthorNameAr: 'أحمد المنصوري',
      visionQuoteAuthorTitleEn: 'CEO',
      visionQuoteAuthorTitleAr: 'الرئيس التنفيذي',
      visionQuoteAuthorImageUrl: getImage(9),
      messageSectionTitleEn: 'Our Message',
      messageSectionTitleAr: 'رسالتنا',
      messageTextEn: 'Delivering excellence in restaurant equipment and service',
      messageTextAr: 'تقديم التميز في معدات وخدمات المطاعم',
      messageImageUrl: getImage(10),
      isActive: true,
      metrics: {
        create: [
          { valueEn: '500+', valueAr: '500+', labelEn: 'Clients', labelAr: 'عميل', order: 0 },
          { valueEn: '25+', valueAr: '25+', labelEn: 'Years', labelAr: 'سنة', order: 1 },
          { valueEn: '1000+', valueAr: '1000+', labelEn: 'Projects', labelAr: 'مشروع', order: 2 },
          { valueEn: '50+', valueAr: '50+', labelEn: 'Brands', labelAr: 'علامة', order: 3 },
        ],
      },
      storyItems: {
        create: [
          {
            year: 1999,
            titleEn: 'Company Founded',
            titleAr: 'تأسيس الشركة',
            descriptionEn: 'Started our journey in Dubai',
            descriptionAr: 'بدأنا رحلتنا في دبي',
            order: 0,
          },
          {
            year: 2010,
            titleEn: 'Expansion',
            titleAr: 'التوسع',
            descriptionEn: 'Expanded to cover all UAE',
            descriptionAr: 'توسعنا لتغطية جميع أنحاء الإمارات',
            order: 1,
          },
        ],
      },
      coreValues: {
        create: [
          {
            titleEn: 'Quality',
            titleAr: 'الجودة',
            descriptionEn: 'We never compromise on quality',
            descriptionAr: 'لا نساوم أبدًا على الجودة',
            imageUrl: getImage(11),
            order: 0,
          },
          {
            titleEn: 'Integrity',
            titleAr: 'النزاهة',
            descriptionEn: 'Honest and transparent in all dealings',
            descriptionAr: 'صادقون وشفافون في جميع التعاملات',
            imageUrl: getImage(12),
            order: 1,
          },
        ],
      },
    },
  });
  
  console.log('✅ About Us seeded');
}

async function seedArticles() {
  console.log('📰 Seeding Articles...');
  
  await prisma.articlesSectionSettings.create({
    data: {
      sectionTitleEn: 'Latest News & Articles',
      sectionTitleAr: 'آخر الأخبار والمقالات',
      sectionSubtitleEn: 'Stay informed',
      sectionSubtitleAr: 'ابق على اطلاع',
      isActive: true,
    },
  });
  
  const articles = [
    {
      titleEn: 'New Equipment Arrivals',
      titleAr: 'وصول معدات جديدة',
      imageUrl: getImage(0),
      date: new Date('2024-01-20'),
      link: '/blog',
      order: 0,
    },
    {
      titleEn: 'Restaurant Industry Trends 2024',
      titleAr: 'اتجاهات صناعة المطاعم 2024',
      imageUrl: getImage(1),
      date: new Date('2024-01-15'),
      link: '/blog',
      order: 1,
    },
  ];
  
  for (const article of articles) {
    await prisma.article.create({ data: article });
  }
  
  console.log('✅ Articles seeded');
}

async function seedRequestTypes() {
  console.log('📋 Seeding Request Types...');
  
  const types = [
    { nameEn: 'General Inquiry', nameAr: 'استفسار عام', order: 0 },
    { nameEn: 'Product Quote', nameAr: 'عرض سعر منتج', order: 1 },
    { nameEn: 'Technical Support', nameAr: 'دعم فني', order: 2 },
    { nameEn: 'Partnership', nameAr: 'شراكة', order: 3 },
  ];
  
  for (const type of types) {
    await prisma.requestType.create({ data: type });
  }
  
  console.log('✅ Request Types seeded');
}

async function seedBranchesMap() {
  console.log('🗺️  Seeding Branches Map Section...');
  
  const mapSection = await prisma.branchesMapSection.create({
    data: {
      sectionTitleEn: 'Visit Our Branches',
      sectionTitleAr: 'زر فروعنا',
      sectionSubtitleEn: 'Find us at any of our convenient locations across the UAE',
      sectionSubtitleAr: 'اعثر علينا في أي من مواقعنا المريحة في جميع أنحاء الإمارات',
      mapCenterLat: 25.2048,
      mapCenterLng: 55.2708,
      defaultZoomLevel: 11,
      isActive: true,
      branches: {
        create: [
          {
            nameEn: 'Dubai Mall Branch',
            nameAr: 'فرع دبي مول',
            addressEn: 'Ground Floor, Dubai Mall, Downtown Dubai, Dubai',
            addressAr: 'الطابق الأرضي، دبي مول، وسط مدينة دبي، دبي',
            latitude: 25.1972,
            longitude: 55.2744,
            phoneNumber: '+971 4 123 4567',
            email: 'dubaimall@shawarmahouse.ae',
            workingHoursEn: 'Sunday - Thursday: 10:00 AM - 11:00 PM\nFriday - Saturday: 10:00 AM - 12:00 AM',
            workingHoursAr: 'الأحد - الخميس: 10:00 صباحاً - 11:00 مساءً\nالجمعة - السبت: 10:00 صباحاً - 12:00 صباحاً',
            order: 1,
            isActive: true,
          },
          {
            nameEn: 'Marina Walk Branch',
            nameAr: 'فرع مارينا ووك',
            addressEn: 'Shop 12, Marina Walk, Dubai Marina, Dubai',
            addressAr: 'محل 12، مارينا ووك، دبي مارينا، دبي',
            latitude: 25.0805,
            longitude: 55.1385,
            phoneNumber: '+971 4 234 5678',
            email: 'marina@shawarmahouse.ae',
            workingHoursEn: 'Daily: 11:00 AM - 12:00 AM',
            workingHoursAr: 'يومياً: 11:00 صباحاً - 12:00 صباحاً',
            order: 2,
            isActive: true,
          },
          {
            nameEn: 'Jumeirah Beach Branch',
            nameAr: 'فرع شاطئ جميرا',
            addressEn: 'Jumeirah Beach Residence, The Walk, Dubai',
            addressAr: 'جميرا بيتش ريزيدنس، ذا ووك، دبي',
            latitude: 25.0777,
            longitude: 55.1315,
            phoneNumber: '+971 4 345 6789',
            email: 'jbr@shawarmahouse.ae',
            workingHoursEn: 'Daily: 10:00 AM - 1:00 AM',
            workingHoursAr: 'يومياً: 10:00 صباحاً - 1:00 صباحاً',
            order: 3,
            isActive: true,
          },
          {
            nameEn: 'Business Bay Branch',
            nameAr: 'فرع الخليج التجاري',
            addressEn: 'Bay Square, Business Bay, Dubai',
            addressAr: 'باي سكوير، الخليج التجاري، دبي',
            latitude: 25.1868,
            longitude: 55.2657,
            phoneNumber: '+971 4 456 7890',
            email: 'businessbay@shawarmahouse.ae',
            workingHoursEn: 'Sunday - Thursday: 8:00 AM - 10:00 PM\nFriday - Saturday: 10:00 AM - 11:00 PM',
            workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 10:00 مساءً\nالجمعة - السبت: 10:00 صباحاً - 11:00 مساءً',
            order: 4,
            isActive: true,
          },
          {
            nameEn: 'Silicon Oasis Branch',
            nameAr: 'فرع واحة السيليكون',
            addressEn: 'Dubai Silicon Oasis, Cedre Villas, Dubai',
            addressAr: 'واحة السيليكون، سيدر فيلاز، دبي',
            latitude: 25.1180,
            longitude: 55.3796,
            phoneNumber: '+971 4 567 8901',
            email: 'siliconoasis@shawarmahouse.ae',
            workingHoursEn: 'Daily: 9:00 AM - 11:00 PM',
            workingHoursAr: 'يومياً: 9:00 صباحاً - 11:00 مساءً',
            order: 5,
            isActive: true,
          },
          {
            nameEn: 'Al Barsha Branch',
            nameAr: 'فرع البرشاء',
            addressEn: 'Mall of the Emirates, Al Barsha, Dubai',
            addressAr: 'مول الإمارات، البرشاء، دبي',
            latitude: 25.1182,
            longitude: 55.2005,
            phoneNumber: '+971 4 678 9012',
            email: 'albarsha@shawarmahouse.ae',
            workingHoursEn: 'Daily: 10:00 AM - 11:00 PM',
            workingHoursAr: 'يومياً: 10:00 صباحاً - 11:00 مساءً',
            order: 6,
            isActive: true,
          },
          {
            nameEn: 'Deira City Centre Branch',
            nameAr: 'فرع ديرة سيتي سنتر',
            addressEn: 'Deira City Centre, Deira, Dubai',
            addressAr: 'ديرة سيتي سنتر، ديرة، دبي',
            latitude: 25.2524,
            longitude: 55.3313,
            phoneNumber: '+971 4 789 0123',
            email: 'deira@shawarmahouse.ae',
            workingHoursEn: 'Daily: 10:00 AM - 10:00 PM',
            workingHoursAr: 'يومياً: 10:00 صباحاً - 10:00 مساءً',
            order: 7,
            isActive: true,
          },
          {
            nameEn: 'Abu Dhabi Mall Branch',
            nameAr: 'فرع مول أبوظبي',
            addressEn: 'Abu Dhabi Mall, Tourist Club Area, Abu Dhabi',
            addressAr: 'مول أبوظبي، منطقة النادي السياحي، أبوظبي',
            latitude: 24.4909,
            longitude: 54.3774,
            phoneNumber: '+971 2 890 1234',
            email: 'abudhabi@shawarmahouse.ae',
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
  
  console.log(`✅ Branches Map Section created with ${mapSection.branches.length} branches`);
}

async function main() {
  // Prevent duplicate runs
  if (isRunning) {
    console.log('⏭️  Seed already running, skipping...');
    return;
  }
  
  isRunning = true;
  
  try {
    await clearDatabase();
    await seedAdmin();
    await seedHeroSection();
    await seedCategories();
    await seedSolutions();
    await seedProjects();
    await seedBrands();
    await seedTestimonials();
    await seedStartProjectSection();
    await seedSettings();
    await seedPages();
    await seedNavbarFooter();
    await seedProducts();
    await seedBlogs();
    await seedServices();
    await seedFAQ();
    await seedCareers();
    await seedAboutUs();
    await seedArticles();
    await seedRequestTypes();
    await seedBranchesMap();
    
    console.log('\n🎉 ALL DATA SEEDED SUCCESSFULLY! 🎉\n');
    console.log('📧 Admin Login:');
    console.log('   Email: admin@central.com');
    console.log('   Password: central@admin123\n');
    console.log('📊 Seeded Data Summary:');
    console.log('   ✅ Hero Section with media & stats');
    console.log('   ✅ 10 Product Categories');
    console.log('   ✅ 4 Solutions/Services');
    console.log('   ✅ 3 Projects with galleries');
    console.log('   ✅ 8 Brand Logos');
    console.log('   ✅ Testimonials with profiles');
    console.log('   ✅ 5 Products with specs & images');
    console.log('   ✅ 2 Blog posts');
    console.log('   ✅ 3 Services');
    console.log('   ✅ 4 FAQ items');
    console.log('   ✅ Careers page with jobs');
    console.log('   ✅ About Us page complete');
    console.log('   ✅ Navbar & Footer');
    console.log('   ✅ All page settings');
    console.log('   ✅ Branches Map with 8 locations\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    isRunning = false;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

