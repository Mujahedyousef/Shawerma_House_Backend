export class AboutUsController {
  constructor(aboutUsService) {
    this.aboutUsService = aboutUsService;
  }

  getPageSettings = async (req, res, next) => {
    try {
      const settings = await this.aboutUsService.getPageSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePageSettings = async (req, res, next) => {
    try {
      const files = req.files;
      const data = {
        heroTitleEn: req.body.heroTitleEn,
        heroTitleAr: req.body.heroTitleAr,
        heroDescriptionEn: req.body.heroDescriptionEn,
        heroDescriptionAr: req.body.heroDescriptionAr,
        visionSectionTitleEn: req.body.visionSectionTitleEn,
        visionSectionTitleAr: req.body.visionSectionTitleAr,
        visionTextEn: req.body.visionTextEn,
        visionTextAr: req.body.visionTextAr,
        visionQuoteTextEn: req.body.visionQuoteTextEn || null,
        visionQuoteTextAr: req.body.visionQuoteTextAr || null,
        visionQuoteAuthorNameEn: req.body.visionQuoteAuthorNameEn || null,
        visionQuoteAuthorNameAr: req.body.visionQuoteAuthorNameAr || null,
        visionQuoteAuthorTitleEn: req.body.visionQuoteAuthorTitleEn || null,
        visionQuoteAuthorTitleAr: req.body.visionQuoteAuthorTitleAr || null,
        messageSectionTitleEn: req.body.messageSectionTitleEn,
        messageSectionTitleAr: req.body.messageSectionTitleAr,
        messageTextEn: req.body.messageTextEn,
        messageTextAr: req.body.messageTextAr,
        messageBannerTextEn: req.body.messageBannerTextEn,
        messageBannerTextAr: req.body.messageBannerTextAr,
        ourStorySectionTitleEn: req.body.ourStorySectionTitleEn,
        ourStorySectionTitleAr: req.body.ourStorySectionTitleAr,
        ourStorySectionSubtitleEn: req.body.ourStorySectionSubtitleEn,
        ourStorySectionSubtitleAr: req.body.ourStorySectionSubtitleAr,
        coreValuesSectionTitleEn: req.body.coreValuesSectionTitleEn,
        coreValuesSectionTitleAr: req.body.coreValuesSectionTitleAr,
        coreValuesSectionSubtitleEn: req.body.coreValuesSectionSubtitleEn,
        coreValuesSectionSubtitleAr: req.body.coreValuesSectionSubtitleAr,
        teamSectionTitleEn: req.body.teamSectionTitleEn,
        teamSectionTitleAr: req.body.teamSectionTitleAr,
        teamSectionSubtitleEn: req.body.teamSectionSubtitleEn,
        teamSectionSubtitleAr: req.body.teamSectionSubtitleAr,
        awardsSectionTitleEn: req.body.awardsSectionTitleEn,
        awardsSectionTitleAr: req.body.awardsSectionTitleAr,
        awardsSectionSubtitleEn: req.body.awardsSectionSubtitleEn,
        awardsSectionSubtitleAr: req.body.awardsSectionSubtitleAr,
      };

      if (files?.heroImage?.[0]) {
        data.heroImageUrl = `/uploads/${files.heroImage[0].filename}`;
      }

      if (files?.visionImage?.[0]) {
        data.visionImageUrl = `/uploads/${files.visionImage[0].filename}`;
      }

      if (files?.visionQuoteAuthorImage?.[0]) {
        data.visionQuoteAuthorImageUrl = `/uploads/${files.visionQuoteAuthorImage[0].filename}`;
      }

      if (files?.messageImage?.[0]) {
        data.messageImageUrl = `/uploads/${files.messageImage[0].filename}`;
      }

      const settings = await this.aboutUsService.updatePageSettings(data);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  createMetric = async (req, res, next) => {
    try {
      // Get the active page settings ID
      const pageSettings = await this.aboutUsService.getPageSettings();
      const data = {
        aboutUsPageId: pageSettings.id,
        valueEn: req.body.valueEn,
        valueAr: req.body.valueAr,
        labelEn: req.body.labelEn,
        labelAr: req.body.labelAr,
        order: parseInt(req.body.order) || 0,
      };

      const metric = await this.aboutUsService.createMetric(data);
      res.status(201).json({
        success: true,
        data: metric,
      });
    } catch (error) {
      next(error);
    }
  };

  updateMetric = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        valueEn: req.body.valueEn,
        valueAr: req.body.valueAr,
        labelEn: req.body.labelEn,
        labelAr: req.body.labelAr,
        order: parseInt(req.body.order) || 0,
      };

      const metric = await this.aboutUsService.updateMetric(id, data);
      res.status(200).json({
        success: true,
        data: metric,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMetric = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.aboutUsService.deleteMetric(id);
      res.status(200).json({
        success: true,
        message: 'Metric deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createNavigationButton = async (req, res, next) => {
    try {
      // Get the active page settings ID
      const pageSettings = await this.aboutUsService.getPageSettings();
      const data = {
        aboutUsPageId: pageSettings.id,
        labelEn: req.body.labelEn,
        labelAr: req.body.labelAr,
        targetSectionId: req.body.targetSectionId || null,
        order: parseInt(req.body.order) || 0,
      };

      const button = await this.aboutUsService.createNavigationButton(data);
      res.status(201).json({
        success: true,
        data: button,
      });
    } catch (error) {
      next(error);
    }
  };

  updateNavigationButton = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        labelEn: req.body.labelEn,
        labelAr: req.body.labelAr,
        targetSectionId: req.body.targetSectionId || null,
        order: parseInt(req.body.order) || 0,
      };

      const button = await this.aboutUsService.updateNavigationButton(id, data);
      res.status(200).json({
        success: true,
        data: button,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteNavigationButton = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.aboutUsService.deleteNavigationButton(id);
      res.status(200).json({
        success: true,
        message: 'Navigation button deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createStoryItem = async (req, res, next) => {
    try {
      // Get the active page settings ID
      const pageSettings = await this.aboutUsService.getPageSettings();
      const data = {
        aboutUsPageId: pageSettings.id,
        year: parseInt(req.body.year),
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      const storyItem = await this.aboutUsService.createStoryItem(data);
      res.status(201).json({
        success: true,
        data: storyItem,
      });
    } catch (error) {
      next(error);
    }
  };

  updateStoryItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        year: parseInt(req.body.year),
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      const storyItem = await this.aboutUsService.updateStoryItem(id, data);
      res.status(200).json({
        success: true,
        data: storyItem,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteStoryItem = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.aboutUsService.deleteStoryItem(id);
      res.status(200).json({
        success: true,
        message: 'Story item deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createCoreValue = async (req, res, next) => {
    try {
      // Get the active page settings ID
      const pageSettings = await this.aboutUsService.getPageSettings();
      const data = {
        aboutUsPageId: pageSettings.id,
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      if (req.files?.image?.[0]) {
        data.imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      const coreValue = await this.aboutUsService.createCoreValue(data);
      res.status(201).json({
        success: true,
        data: coreValue,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCoreValue = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      if (req.files?.image?.[0]) {
        data.imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      const coreValue = await this.aboutUsService.updateCoreValue(id, data);
      res.status(200).json({
        success: true,
        data: coreValue,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCoreValue = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.aboutUsService.deleteCoreValue(id);
      res.status(200).json({
        success: true,
        message: 'Core value deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createTeamMember = async (req, res, next) => {
    try {
      // Get the active page settings ID
      const pageSettings = await this.aboutUsService.getPageSettings();
      const data = {
        aboutUsPageId: pageSettings.id,
        nameEn: req.body.nameEn,
        nameAr: req.body.nameAr,
        jobTitleEn: req.body.jobTitleEn,
        jobTitleAr: req.body.jobTitleAr,
        parentId: req.body.parentId || null,
        level: parseInt(req.body.level) || 0,
        order: parseInt(req.body.order) || 0,
      };

      if (req.files?.image?.[0]) {
        data.imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      const teamMember = await this.aboutUsService.createTeamMember(data);
      res.status(201).json({
        success: true,
        data: teamMember,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTeamMember = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        nameEn: req.body.nameEn,
        nameAr: req.body.nameAr,
        jobTitleEn: req.body.jobTitleEn,
        jobTitleAr: req.body.jobTitleAr,
        parentId: req.body.parentId || null,
        level: parseInt(req.body.level) || 0,
        order: parseInt(req.body.order) || 0,
      };

      if (req.files?.image?.[0]) {
        data.imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      const teamMember = await this.aboutUsService.updateTeamMember(id, data);
      res.status(200).json({
        success: true,
        data: teamMember,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTeamMember = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.aboutUsService.deleteTeamMember(id);
      res.status(200).json({
        success: true,
        message: 'Team member deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createAward = async (req, res, next) => {
    try {
      // Get the active page settings ID
      const pageSettings = await this.aboutUsService.getPageSettings();
      const data = {
        aboutUsPageId: pageSettings.id,
        year: parseInt(req.body.year),
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      if (req.files?.logo?.[0]) {
        data.logoUrl = `/uploads/${req.files.logo[0].filename}`;
      }

      const award = await this.aboutUsService.createAward(data);
      res.status(201).json({
        success: true,
        data: award,
      });
    } catch (error) {
      next(error);
    }
  };

  updateAward = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = {
        year: parseInt(req.body.year),
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        order: parseInt(req.body.order) || 0,
      };

      if (req.files?.logo?.[0]) {
        data.logoUrl = `/uploads/${req.files.logo[0].filename}`;
      }

      const award = await this.aboutUsService.updateAward(id, data);
      res.status(200).json({
        success: true,
        data: award,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAward = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.aboutUsService.deleteAward(id);
      res.status(200).json({
        success: true,
        message: 'Award deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AboutUsController;
