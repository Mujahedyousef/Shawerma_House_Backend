export class ColorController {
  constructor(colorService) {
    this.colorService = colorService;
  }

  getAll = async (req, res, next) => {
    try {
      const colors = await this.colorService.getAllColors();
      res.status(200).json({
        success: true,
        data: colors,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const colors = await this.colorService.getActiveColors();
      res.status(200).json({
        success: true,
        data: colors,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const color = await this.colorService.getColorById(id);
      res.status(200).json({
        success: true,
        data: color,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const colorData = {
        nameEn: req.body.nameEn,
        nameAr: req.body.nameAr,
        hexCode: req.body.hexCode || null,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      };

      const color = await this.colorService.createColor(colorData);
      res.status(201).json({
        success: true,
        data: color,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {};
      
      if (req.body.nameEn !== undefined) updateData.nameEn = req.body.nameEn;
      if (req.body.nameAr !== undefined) updateData.nameAr = req.body.nameAr;
      if (req.body.hexCode !== undefined) updateData.hexCode = req.body.hexCode || null;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive;

      const color = await this.colorService.updateColor(id, updateData);
      res.status(200).json({
        success: true,
        data: color,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.colorService.deleteColor(id);
      res.status(200).json({
        success: true,
        message: 'Color deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ColorController;
