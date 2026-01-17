export class ThemeController {
  constructor(themeService) {
    this.themeService = themeService;
  }

  getSettings = async (req, res, next) => {
    try {
      const settings = await this.themeService.getSettings();
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
        // Brand colors
        colorBrand: req.body.colorBrand,
        colorBrandDark: req.body.colorBrandDark,
        colorAccent: req.body.colorAccent,
        colorDestructive: req.body.colorDestructive,
        colorWarning: req.body.colorWarning,
        colorInfo: req.body.colorInfo,
        colorRing: req.body.colorRing,
        
        // Light Mode Colors
        colorBg1: req.body.colorBg1,
        colorBg2: req.body.colorBg2,
        colorCard: req.body.colorCard,
        colorBorder: req.body.colorBorder,
        colorText: req.body.colorText,
        colorText2: req.body.colorText2,
        colorTextMuted: req.body.colorTextMuted,
        colorTextMuted2: req.body.colorTextMuted2,
        
        // Dark Mode Colors
        colorBg1Dark: req.body.colorBg1Dark,
        colorBg2Dark: req.body.colorBg2Dark,
        colorCardDark: req.body.colorCardDark,
        colorBorderDark: req.body.colorBorderDark,
        colorTextDark: req.body.colorTextDark,
        colorText2Dark: req.body.colorText2Dark,
        colorTextMutedDark: req.body.colorTextMutedDark,
        colorTextMuted2Dark: req.body.colorTextMuted2Dark,
        
        // Section Colors
        colorSectionLight: req.body.colorSectionLight,
        colorSectionDark: req.body.colorSectionDark,
        colorTextOnLight: req.body.colorTextOnLight,
        colorTextOnDark: req.body.colorTextOnDark,
        colorSectionMuted: req.body.colorSectionMuted,
        
        // Section Colors Dark Mode
        colorSectionLightDark: req.body.colorSectionLightDark,
        colorSectionDarkDark: req.body.colorSectionDarkDark,
        colorTextOnLightDark: req.body.colorTextOnLightDark,
        colorTextOnDarkDark: req.body.colorTextOnDarkDark,
        colorSectionMutedDark: req.body.colorSectionMutedDark,
        
        // Button Colors - Light Mode
        colorButtonPrimaryBg: req.body.colorButtonPrimaryBg,
        colorButtonPrimaryBgHover: req.body.colorButtonPrimaryBgHover,
        colorButtonPrimaryText: req.body.colorButtonPrimaryText,
        colorButtonPrimaryTextHover: req.body.colorButtonPrimaryTextHover,
        colorButtonSecondaryBg: req.body.colorButtonSecondaryBg,
        colorButtonSecondaryBgHover: req.body.colorButtonSecondaryBgHover,
        colorButtonSecondaryText: req.body.colorButtonSecondaryText,
        colorButtonSecondaryTextHover: req.body.colorButtonSecondaryTextHover,
        
        // Button Colors - Dark Mode
        colorButtonPrimaryBgDark: req.body.colorButtonPrimaryBgDark,
        colorButtonPrimaryBgHoverDark: req.body.colorButtonPrimaryBgHoverDark,
        colorButtonPrimaryTextDark: req.body.colorButtonPrimaryTextDark,
        colorButtonPrimaryTextHoverDark: req.body.colorButtonPrimaryTextHoverDark,
        colorButtonSecondaryBgDark: req.body.colorButtonSecondaryBgDark,
        colorButtonSecondaryBgHoverDark: req.body.colorButtonSecondaryBgHoverDark,
        colorButtonSecondaryTextDark: req.body.colorButtonSecondaryTextDark,
        colorButtonSecondaryTextHoverDark: req.body.colorButtonSecondaryTextHoverDark,
        
        // Fonts
        fontFamily: req.body.fontFamily,
        fontFamilyAr: req.body.fontFamilyAr,
      };

      const settings = await this.themeService.updateSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ThemeController;

