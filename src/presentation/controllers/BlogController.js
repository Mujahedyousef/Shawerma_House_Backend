export class BlogController {
  constructor(blogService) {
    this.blogService = blogService;
  }

  getAllBlogs = async (req, res, next) => {
    try {
      const blogs = await this.blogService.getAllBlogs();
      res.status(200).json({
        success: true,
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  };

  getActiveBlogs = async (req, res, next) => {
    try {
      const blogs = await this.blogService.getActiveBlogs();
      res.status(200).json({
        success: true,
        data: blogs,
      });
    } catch (error) {
      next(error);
    }
  };

  getBlogById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const blog = await this.blogService.getBlogById(id);
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found',
        });
      }
      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  };

  createBlog = async (req, res, next) => {
    try {
      const files = req.files;
      const blogData = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn || null,
        descriptionAr: req.body.descriptionAr || null,
        contentEn: req.body.contentEn || null,
        contentAr: req.body.contentAr || null,
        conclusionEn: req.body.conclusionEn || null,
        conclusionAr: req.body.conclusionAr || null,
        authorEn: req.body.authorEn || null,
        authorAr: req.body.authorAr || null,
        date: new Date(req.body.date),
        link: req.body.link || null,
        categoryId: req.body.categoryId || null,
        showInHero: req.body.showInHero === 'true' || req.body.showInHero === true,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      if (files?.image?.[0]) {
        blogData.imageUrl = `/uploads/${files.image[0].filename}`;
      }

      const blog = await this.blogService.createBlog(blogData);
      res.status(201).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  };

  updateBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      const files = req.files;
      const updateData = {};

      if (req.body.titleEn !== undefined) updateData.titleEn = req.body.titleEn;
      if (req.body.titleAr !== undefined) updateData.titleAr = req.body.titleAr;
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn || null;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr || null;
      if (req.body.contentEn !== undefined) updateData.contentEn = req.body.contentEn || null;
      if (req.body.contentAr !== undefined) updateData.contentAr = req.body.contentAr || null;
      if (req.body.conclusionEn !== undefined) updateData.conclusionEn = req.body.conclusionEn || null;
      if (req.body.conclusionAr !== undefined) updateData.conclusionAr = req.body.conclusionAr || null;
      if (req.body.authorEn !== undefined) updateData.authorEn = req.body.authorEn || null;
      if (req.body.authorAr !== undefined) updateData.authorAr = req.body.authorAr || null;
      if (req.body.date !== undefined) updateData.date = new Date(req.body.date);
      if (req.body.link !== undefined) updateData.link = req.body.link || null;
      if (req.body.categoryId !== undefined) updateData.categoryId = req.body.categoryId || null;
      if (req.body.showInHero !== undefined) updateData.showInHero = req.body.showInHero === 'true' || req.body.showInHero === true;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      if (files?.image?.[0]) {
        updateData.imageUrl = `/uploads/${files.image[0].filename}`;
      }

      const blog = await this.blogService.updateBlog(id, updateData);
      res.status(200).json({
        success: true,
        data: blog,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteBlog = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.blogService.deleteBlog(id);
      res.status(200).json({
        success: true,
        message: 'Blog deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getPageSettings = async (req, res, next) => {
    try {
      const settings = await this.blogService.getPageSettings();
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
      const updateData = {
        ...req.body,
      };

      if (files?.heroImage?.[0]) {
        updateData.heroImageUrl = `/uploads/${files.heroImage[0].filename}`;
      }

      // Handle heroSectionDescription fields
      if (req.body.heroSectionDescriptionEn !== undefined) {
        updateData.heroSectionDescriptionEn = req.body.heroSectionDescriptionEn || null;
      }
      if (req.body.heroSectionDescriptionAr !== undefined) {
        updateData.heroSectionDescriptionAr = req.body.heroSectionDescriptionAr || null;
      }
      // Handle gridSectionTitle fields
      if (req.body.gridSectionTitleEn !== undefined) {
        updateData.gridSectionTitleEn = req.body.gridSectionTitleEn || null;
      }
      if (req.body.gridSectionTitleAr !== undefined) {
        updateData.gridSectionTitleAr = req.body.gridSectionTitleAr || null;
      }

      const settings = await this.blogService.updatePageSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BlogController;
