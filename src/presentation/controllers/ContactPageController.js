export class ContactPageController {
  constructor(contactPageService) {
    this.contactPageService = contactPageService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.contactPageService.getSettings();
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
      const updateData = {
        ...req.body,
      };
      
      if (files?.heroImage?.[0]) {
        updateData.heroImageUrl = `/uploads/${files.heroImage[0].filename}`;
      }
      
      // Handle map coordinates
      if (req.body.mapLatitude !== undefined && req.body.mapLatitude !== '') {
        updateData.mapLatitude = parseFloat(req.body.mapLatitude);
      }
      if (req.body.mapLongitude !== undefined && req.body.mapLongitude !== '') {
        updateData.mapLongitude = parseFloat(req.body.mapLongitude);
      }

      const settings = await this.contactPageService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ContactPageController;
