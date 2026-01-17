export class CareersPageController {
  constructor(careersPageService) {
    this.careersPageService = careersPageService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.careersPageService.getSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSettings = async (req, res, next) => {
    try {
      const files = req.files;
      const data = {
        heroTitleEn: req.body.heroTitleEn,
        heroTitleAr: req.body.heroTitleAr,
        heroDescriptionEn: req.body.heroDescriptionEn,
        heroDescriptionAr: req.body.heroDescriptionAr,
        whyWorkWithUsTitleEn: req.body.whyWorkWithUsTitleEn || null,
        whyWorkWithUsTitleAr: req.body.whyWorkWithUsTitleAr || null,
      };

      if (files?.heroImage?.[0]) {
        data.heroImageUrl = `/uploads/${files.heroImage[0].filename}`;
      }

      const settings = await this.careersPageService.updateSettings(data);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  createJobBenefit = async (req, res, next) => {
    try {
      const pageSettings = await this.careersPageService.getSettings();
      const data = {
        careersPageId: pageSettings.id,
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        order: parseInt(req.body.order) || 0,
      };

      const benefit = await this.careersPageService.createJobBenefit(data);
      res.status(201).json({
        success: true,
        data: benefit,
      });
    } catch (error) {
      next(error);
    }
  };

  updateJobBenefit = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        textEn: req.body.textEn,
        textAr: req.body.textAr,
        order: parseInt(req.body.order) || 0,
      };

      const benefit = await this.careersPageService.updateJobBenefit(id, data);
      res.status(200).json({
        success: true,
        data: benefit,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteJobBenefit = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.careersPageService.deleteJobBenefit(id);
      res.status(200).json({
        success: true,
        message: 'Job benefit deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createJobListing = async (req, res, next) => {
    try {
      const pageSettings = await this.careersPageService.getSettings();
      const data = {
        careersPageId: pageSettings.id,
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        requiredExperienceEn: req.body.requiredExperienceEn,
        requiredExperienceAr: req.body.requiredExperienceAr,
        locationEn: req.body.locationEn,
        locationAr: req.body.locationAr,
        jobTypeEn: req.body.jobTypeEn,
        jobTypeAr: req.body.jobTypeAr,
        descriptionEn: req.body.descriptionEn || null,
        descriptionAr: req.body.descriptionAr || null,
        requirementsEn: req.body.requirementsEn || null,
        requirementsAr: req.body.requirementsAr || null,
        responsibilitiesEn: req.body.responsibilitiesEn || null,
        responsibilitiesAr: req.body.responsibilitiesAr || null,
        order: parseInt(req.body.order) || 0,
      };

      const jobListing = await this.careersPageService.createJobListing(data);
      res.status(201).json({
        success: true,
        data: jobListing,
      });
    } catch (error) {
      next(error);
    }
  };

  updateJobListing = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        requiredExperienceEn: req.body.requiredExperienceEn,
        requiredExperienceAr: req.body.requiredExperienceAr,
        locationEn: req.body.locationEn,
        locationAr: req.body.locationAr,
        jobTypeEn: req.body.jobTypeEn,
        jobTypeAr: req.body.jobTypeAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        requirementsEn: req.body.requirementsEn,
        requirementsAr: req.body.requirementsAr,
        responsibilitiesEn: req.body.responsibilitiesEn,
        responsibilitiesAr: req.body.responsibilitiesAr,
        order: parseInt(req.body.order) || 0,
      };

      const jobListing = await this.careersPageService.updateJobListing(id, data);
      res.status(200).json({
        success: true,
        data: jobListing,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteJobListing = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.careersPageService.deleteJobListing(id);
      res.status(200).json({
        success: true,
        message: 'Job listing deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createWhyWorkWithUsItem = async (req, res, next) => {
    try {
      const pageSettings = await this.careersPageService.getSettings();
      const data = {
        careersPageId: pageSettings.id,
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      const item = await this.careersPageService.createWhyWorkWithUsItem(data);
      res.status(201).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

  updateWhyWorkWithUsItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      const item = await this.careersPageService.updateWhyWorkWithUsItem(id, data);
      res.status(200).json({
        success: true,
        data: item,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteWhyWorkWithUsItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.careersPageService.deleteWhyWorkWithUsItem(id);
      res.status(200).json({
        success: true,
        message: 'Why work with us item deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getJobListingById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const jobListing = await this.careersPageService.getJobListingById(id);
      if (!jobListing) {
        return res.status(404).json({
          success: false,
          message: 'Job listing not found',
        });
      }
      res.status(200).json({
        success: true,
        data: jobListing,
      });
    } catch (error) {
      next(error);
    }
  };

  createJobApplication = async (req, res, next) => {
    try {
      const { jobListingId, name, email, phone, message } = req.body;

      // Validation
      if (!jobListingId || !name || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Phone validation (basic)
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return res.status(400).json({
          success: false,
          message: 'Invalid phone number format',
        });
      }

      const data = {
        jobListingId,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        message: message.trim(),
      };

      const application = await this.careersPageService.createJobApplication(data);
      res.status(201).json({
        success: true,
        data: application,
        message: 'Application submitted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getAllJobApplications = async (req, res, next) => {
    try {
      const applications = await this.careersPageService.getAllJobApplications();
      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  };

  getJobApplicationsByJobId = async (req, res, next) => {
    try {
      const { jobId } = req.params;
      const applications = await this.careersPageService.getJobApplicationsByJobId(jobId);
      res.status(200).json({
        success: true,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default CareersPageController;
