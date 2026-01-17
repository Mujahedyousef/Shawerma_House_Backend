export class BlogCategoryController {
  constructor(blogCategoryService) {
    this.blogCategoryService = blogCategoryService;
  }

  getAll = async (req, res, next) => {
    try {
      const categories = await this.blogCategoryService.getAllBlogCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const categories = await this.blogCategoryService.getActiveBlogCategories();
      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await this.blogCategoryService.getBlogCategoryById(id);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const category = await this.blogCategoryService.createBlogCategory({
        ...req.body,
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      });
      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateData = {
        ...req.body,
        order: req.body.order ? parseInt(req.body.order) : undefined,
        isActive: req.body.isActive !== undefined 
          ? (req.body.isActive === 'true' || req.body.isActive === true)
          : undefined,
      };
      const category = await this.blogCategoryService.updateBlogCategory(id, updateData);
      res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.blogCategoryService.deleteBlogCategory(id);
      res.status(200).json({
        success: true,
        message: 'Blog category deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default BlogCategoryController;
