export class BlogService {
  constructor(blogRepository) {
    this.blogRepository = blogRepository;
  }

  async getAllBlogs() {
    return await this.blogRepository.getAll();
  }

  async getActiveBlogs() {
    return await this.blogRepository.getActive();
  }

  async getBlogById(id) {
    return await this.blogRepository.findById(id);
  }

  async createBlog(data) {
    return await this.blogRepository.create(data);
  }

  async updateBlog(id, data) {
    return await this.blogRepository.update(id, data);
  }

  async deleteBlog(id) {
    return await this.blogRepository.delete(id);
  }

  async getPageSettings() {
    return await this.blogRepository.getPageSettings();
  }

  async updatePageSettings(data) {
    return await this.blogRepository.updatePageSettings(data);
  }
}

export default BlogService;
