export class DownloadAppSectionController {
  constructor(downloadAppSectionService) {
    this.downloadAppSectionService = downloadAppSectionService;
  }

  getActive = async (req, res, next) => {
    try {
      const section = await this.downloadAppSectionService.getActiveDownloadAppSection();
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await this.downloadAppSectionService.getDownloadAppSectionById(id);
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const sectionData = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn,
        descriptionAr: req.body.descriptionAr,
        backgroundColor: req.body.backgroundColor || '#1a1a1a',
        theme: req.body.theme || 'dark',
        appStoreLink: req.body.appStoreLink || null,
        googlePlayLink: req.body.googlePlayLink || null,
        enableInitialAnimation: req.body.enableInitialAnimation === 'true' || req.body.enableInitialAnimation === true,
        enableScrollAnimation: req.body.enableScrollAnimation === 'true' || req.body.enableScrollAnimation === true,
        isActive: true,
      };

      const section = await this.downloadAppSectionService.createDownloadAppSection(sectionData);
      res.status(201).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const updateData = {};
      if (req.body.titleEn !== undefined) updateData.titleEn = req.body.titleEn;
      if (req.body.titleAr !== undefined) updateData.titleAr = req.body.titleAr;
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr;
      if (req.body.backgroundColor !== undefined) updateData.backgroundColor = req.body.backgroundColor;
      if (req.body.theme !== undefined) updateData.theme = req.body.theme;
      if (req.body.appStoreLink !== undefined) updateData.appStoreLink = req.body.appStoreLink || null;
      if (req.body.googlePlayLink !== undefined) updateData.googlePlayLink = req.body.googlePlayLink || null;
      if (req.body.enableInitialAnimation !== undefined) {
        updateData.enableInitialAnimation = req.body.enableInitialAnimation === 'true' || req.body.enableInitialAnimation === true;
      }
      if (req.body.enableScrollAnimation !== undefined) {
        updateData.enableScrollAnimation = req.body.enableScrollAnimation === 'true' || req.body.enableScrollAnimation === true;
      }
      if (req.body.isActive !== undefined) {
        updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;
      }

      const section = await this.downloadAppSectionService.updateDownloadAppSection(id, updateData);
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.downloadAppSectionService.deleteDownloadAppSection(id);
      res.status(200).json({
        success: true,
        message: 'Download app section deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  uploadImage = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { imageType } = req.body; // 'backgroundImageUrl', 'appStoreImageUrl', 'googlePlayImageUrl', 'mobileAppImageUrl'
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      if (!['backgroundImageUrl', 'appStoreImageUrl', 'googlePlayImageUrl', 'mobileAppImageUrl'].includes(imageType)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image type',
        });
      }

      const imageUrl = `/uploads/${file.filename}`;
      const section = await this.downloadAppSectionService.updateImage(id, imageType, imageUrl);

      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default DownloadAppSectionController;

