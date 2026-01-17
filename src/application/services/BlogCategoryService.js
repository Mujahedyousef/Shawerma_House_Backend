export class BlogCategoryService {
  constructor(blogCategoryRepository) {
    this.blogCategoryRepository = blogCategoryRepository;
  }

  async getAllBlogCategories() {
    return await this.blogCategoryRepository.getAll();
  }

  async getActiveBlogCategories() {
    return await this.blogCategoryRepository.getActive();
  }

  async getBlogCategoryById(id) {
    const category = await this.blogCategoryRepository.findById(id);
    if (!category) {
      throw new Error('Blog category not found');
    }
    return category;
  }

  async createBlogCategory(data) {
    return await this.blogCategoryRepository.create(data);
  }

  async updateBlogCategory(id, data) {
    const category = await this.blogCategoryRepository.findById(id);
    if (!category) {
      throw new Error('Blog category not found');
    }
    return await this.blogCategoryRepository.update(id, data);
  }

  async deleteBlogCategory(id) {
    const category = await this.blogCategoryRepository.findById(id);
    if (!category) {
      throw new Error('Blog category not found');
    }
    return await this.blogCategoryRepository.delete(id);
  }
}

export default BlogCategoryService;
