export class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  getActiveSection = async (req, res, next) => {
    try {
      const section = await this.projectService.getActiveProjectsSection();
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProjects = async (req, res, next) => {
    try {
      const projects = await this.projectService.getAllProjects();
      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  };

  getActiveProjects = async (req, res, next) => {
    try {
      const projects = await this.projectService.getActiveProjects();
      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      next(error);
    }
  };

  getProjectById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const project = await this.projectService.getProjectById(id);
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  createProject = async (req, res, next) => {
    try {
      const file = req.file;
      const heroFile = req.files?.heroImage?.[0];

      const projectData = {
        ...req.body,
        imageUrl: file ? `/uploads/${file.filename}` : req.body.imageUrl,
        heroImageUrl: heroFile ? `/uploads/${heroFile.filename}` : req.body.heroImageUrl || null,
        descriptionEn: req.body.descriptionEn || null,
        descriptionAr: req.body.descriptionAr || null,
        contentEn: req.body.contentEn || null,
        contentAr: req.body.contentAr || null,
        specifications: req.body.specifications && req.body.specifications.trim() !== '' ? JSON.parse(req.body.specifications) : null,
        productsCount: parseInt(req.body.productsCount) || 0,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
        projectsSectionId: req.body.projectsSectionId || null,
      };
      const project = await this.projectService.createProject(projectData);
      res.status(201).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProject = async (req, res, next) => {
    try {
      const { id } = req.params;
      const file = req.file;
      const heroFile = req.files?.heroImage?.[0];

      const updateData = {
        ...req.body,
        productsCount: req.body.productsCount ? parseInt(req.body.productsCount) : undefined,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined ? req.body.isActive === 'true' || req.body.isActive === true : undefined,
      };

      if (file) {
        updateData.imageUrl = `/uploads/${file.filename}`;
      }

      if (heroFile) {
        updateData.heroImageUrl = `/uploads/${heroFile.filename}`;
      }

      // Handle optional fields
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn || null;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr || null;
      if (req.body.contentEn !== undefined) updateData.contentEn = req.body.contentEn || null;
      if (req.body.contentAr !== undefined) updateData.contentAr = req.body.contentAr || null;
      if (req.body.specifications !== undefined) {
        updateData.specifications = req.body.specifications && req.body.specifications.trim() !== '' ? JSON.parse(req.body.specifications) : null;
      }
      if (req.body.heroImageUrl === '') updateData.heroImageUrl = null;

      const project = await this.projectService.updateProject(id, updateData);
      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProject = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.projectService.deleteProject(id);
      res.status(200).json({
        success: true,
        message: 'Project deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  uploadProjectLogo = async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { order } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const logoData = {
        imageUrl: `/uploads/${file.filename}`,
        order: parseInt(order) || 0,
      };

      const logo = await this.projectService.addProjectLogo(projectId, logoData);
      res.status(201).json({
        success: true,
        data: logo,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProjectLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
      const logo = await this.projectService.updateProjectLogo(logoId, req.body);
      res.status(200).json({
        success: true,
        data: logo,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProjectLogo = async (req, res, next) => {
    try {
      const { logoId } = req.params;
      await this.projectService.deleteProjectLogo(logoId);
      res.status(200).json({
        success: true,
        message: 'Project logo deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Gallery Images Methods
  uploadProjectGalleryImage = async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const { order } = req.body;
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const imageData = {
        imageUrl: `/uploads/${file.filename}`,
        order: parseInt(order) || 0,
      };

      const image = await this.projectService.addProjectGalleryImage(projectId, imageData);
      res.status(201).json({
        success: true,
        data: image,
      });
    } catch (error) {
      next(error);
    }
  };

  uploadMultipleProjectGalleryImages = async (req, res, next) => {
    try {
      const { projectId } = req.params;
      const files = req.files; // With upload.array(), files are directly in req.files as an array

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'No files uploaded',
        });
      }

      const images = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageData = {
          imageUrl: `/uploads/${file.filename}`,
          order: i,
        };
        const image = await this.projectService.addProjectGalleryImage(projectId, imageData);
        images.push(image);
      }

      res.status(201).json({
        success: true,
        data: images,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProjectGalleryImage = async (req, res, next) => {
    try {
      const { imageId } = req.params;
      const image = await this.projectService.updateProjectGalleryImage(imageId, req.body);
      res.status(200).json({
        success: true,
        data: image,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProjectGalleryImage = async (req, res, next) => {
    try {
      const { imageId } = req.params;
      await this.projectService.deleteProjectGalleryImage(imageId);
      res.status(200).json({
        success: true,
        message: 'Project gallery image deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  // Section Settings Methods
  createSectionSettings = async (req, res, next) => {
    try {
      const section = await this.projectService.createSectionSettings(req.body);
      res.status(201).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };

  updateSectionSettings = async (req, res, next) => {
    try {
      const { id } = req.params;
      const section = await this.projectService.updateSectionSettings(id, req.body);
      res.status(200).json({
        success: true,
        data: section,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProjectController;
