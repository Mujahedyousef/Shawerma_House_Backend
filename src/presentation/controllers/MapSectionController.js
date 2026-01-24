import MapSectionService from '../../application/services/MapSectionService.js';

class MapSectionController {
  constructor() {
    this.mapSectionService = new MapSectionService();
  }

  getActiveMapSection = async (req, res, next) => {
    try {
      const mapSection = await this.mapSectionService.getActiveMapSection();
      res.status(200).json({
        success: true,
        data: mapSection,
      });
    } catch (error) {
      next(error);
    }
  };

  getMapSectionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const mapSection = await this.mapSectionService.getMapSectionById(id);
      res.status(200).json({
        success: true,
        data: mapSection,
      });
    } catch (error) {
      next(error);
    }
  };

  createMapSection = async (req, res, next) => {
    try {
      const mapSection = await this.mapSectionService.createMapSection(
        req.body
      );
      res.status(201).json({
        success: true,
        data: mapSection,
        message: 'Map section created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  updateMapSection = async (req, res, next) => {
    try {
      const { id } = req.params;
      const mapSection = await this.mapSectionService.updateMapSection(
        id,
        req.body
      );
      res.status(200).json({
        success: true,
        data: mapSection,
        message: 'Map section updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMapSection = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.mapSectionService.deleteMapSection(id);
      res.status(200).json({
        success: true,
        message: 'Map section deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  createBranch = async (req, res, next) => {
    try {
      const branch = await this.mapSectionService.createBranch(req.body);
      res.status(201).json({
        success: true,
        data: branch,
        message: 'Branch created successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  updateBranch = async (req, res, next) => {
    try {
      const { id } = req.params;
      const branch = await this.mapSectionService.updateBranch(id, req.body);
      res.status(200).json({
        success: true,
        data: branch,
        message: 'Branch updated successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  deleteBranch = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.mapSectionService.deleteBranch(id);
      res.status(200).json({
        success: true,
        message: 'Branch deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getBranches = async (req, res, next) => {
    try {
      const { mapSectionId } = req.params;
      const branches = await this.mapSectionService.getBranches(mapSectionId);
      res.status(200).json({
        success: true,
        data: branches,
      });
    } catch (error) {
      next(error);
    }
  };

  getBranchById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const branch = await this.mapSectionService.getBranchById(id);
      res.status(200).json({
        success: true,
        data: branch,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default MapSectionController;

