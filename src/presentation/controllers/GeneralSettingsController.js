export class GeneralSettingsController {
  constructor(generalSettingsService) {
    this.generalSettingsService = generalSettingsService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.generalSettingsService.getSettings();
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
      const updateData = {
        currencyCode: req.body.currencyCode,
        currencySymbol: req.body.currencySymbol,
        currencyNameEn: req.body.currencyNameEn,
        currencyNameAr: req.body.currencyNameAr,
      };

      const settings = await this.generalSettingsService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GeneralSettingsController;
