import express from 'express';
import CareersPageController from '../controllers/CareersPageController.js';
import CareersPageService from '../../application/services/CareersPageService.js';
import CareersPageRepository from '../../infrastructure/repositories/CareersPageRepository.js';
import { upload } from '../../middleware/uploadMiddleware.js';

const router = express.Router();

// Initialize dependencies
const careersPageRepository = new CareersPageRepository();
const careersPageService = new CareersPageService(careersPageRepository);
const careersPageController = new CareersPageController(careersPageService);

// Public routes
router.get('/page-settings', careersPageController.getSettings);
router.get('/job-listings/:id', careersPageController.getJobListingById);
router.post('/job-applications', careersPageController.createJobApplication);

// CMS routes (should be protected with authentication in production)
router.put(
  '/page-settings',
  upload.fields([{ name: 'heroImage', maxCount: 1 }]),
  careersPageController.updateSettings
);

// Job Benefits routes
router.post('/job-benefits', careersPageController.createJobBenefit);
router.put('/job-benefits/:id', careersPageController.updateJobBenefit);
router.delete('/job-benefits/:id', careersPageController.deleteJobBenefit);

// Job Listings routes
router.post('/job-listings', careersPageController.createJobListing);
router.put('/job-listings/:id', careersPageController.updateJobListing);
router.delete('/job-listings/:id', careersPageController.deleteJobListing);

// Why Work With Us routes
router.post('/why-work-with-us', careersPageController.createWhyWorkWithUsItem);
router.put('/why-work-with-us/:id', careersPageController.updateWhyWorkWithUsItem);
router.delete('/why-work-with-us/:id', careersPageController.deleteWhyWorkWithUsItem);

// Job Applications routes (CMS)
router.get('/job-applications', careersPageController.getAllJobApplications);
router.get('/job-applications/job/:jobId', careersPageController.getJobApplicationsByJobId);

export default router;
