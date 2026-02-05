import express from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import heroSectionRoutes from './heroSection.routes.js';
import solutionRoutes from './solution.routes.js';
import categoryRoutes from './category.routes.js';
import brandsSectionRoutes from './brandsSection.routes.js';
import projectRoutes from './project.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import startProjectSectionRoutes from './startProjectSection.routes.js';
import articleRoutes from './article.routes.js';
import contactPageRoutes from './contactPage.routes.js';
import termsAndConditionsPageRoutes from './termsAndConditionsPage.routes.js';
import faqPageRoutes from './faqPage.routes.js';
import requestTypeRoutes from './requestType.routes.js';
import contactRequestRoutes from './contactRequest.routes.js';
import productRoutes from './product.routes.js';
import brandRoutes from './brand.routes.js';
import productTypeRoutes from './productType.routes.js';
import colorRoutes from './color.routes.js';
import servicesPageRoutes from './servicesPage.routes.js';
import serviceRoutes from './service.routes.js';
import projectsPageRoutes from './projectsPage.routes.js';
import navbarRoutes from './navbar.routes.js';
import themeRoutes from './theme.routes.js';
import footerRoutes from './footer.routes.js';
import categoriesSectionRoutes from './categoriesSection.routes.js';
import generalSettingsRoutes from './generalSettings.routes.js';
import productOrderRoutes from './productOrder.routes.js';
import blogRoutes from './blog.routes.js';
import blogCategoryRoutes from './blogCategory.routes.js';
import aboutUsRoutes from './aboutUs.routes.js';
import careersPageRoutes from './careersPage.routes.js';
import uploadRoutes from './upload.routes.js';
import downloadAppSectionRoutes from './downloadAppSection.routes.js';
import mapSectionRoutes from './mapSection.routes.js';

const router = express.Router();

// Mount route modules here
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/hero-section', heroSectionRoutes);
router.use('/solutions', solutionRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands-section', brandsSectionRoutes);
router.use('/brands', brandRoutes);
router.use('/product-types', productTypeRoutes);
router.use('/colors', colorRoutes);
router.use('/projects-section', projectRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/start-project-section', startProjectSectionRoutes);
router.use('/articles', articleRoutes);
router.use('/products', productRoutes);
router.use('/services-page', servicesPageRoutes);
router.use('/services', serviceRoutes);
router.use('/projects-page', projectsPageRoutes);
router.use('/contact-page', contactPageRoutes);
router.use('/terms-and-conditions-page', termsAndConditionsPageRoutes);
router.use('/faq-page', faqPageRoutes);
router.use('/request-types', requestTypeRoutes);
router.use('/contact-requests', contactRequestRoutes);
router.use('/navbar', navbarRoutes);
router.use('/theme', themeRoutes);
router.use('/footer', footerRoutes);
router.use('/categories-section', categoriesSectionRoutes);
router.use('/general-settings', generalSettingsRoutes);
router.use('/product-orders', productOrderRoutes);
router.use('/blogs-page', blogRoutes);
router.use('/blog-categories', blogCategoryRoutes);
router.use('/about-us-page', aboutUsRoutes);
router.use('/careers-page', careersPageRoutes);
router.use('/upload', uploadRoutes);
router.use('/download-app-section', downloadAppSectionRoutes);
router.use('/map-section', mapSectionRoutes);

// Example route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    version: '1.0.0',
  });
});

export default router;

