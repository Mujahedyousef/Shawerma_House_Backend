export class IBlogRepository {
  async getAll() {
    throw new Error('getAll() must be implemented');
  }

  async getActive() {
    throw new Error('getActive() must be implemented');
  }

  async findById(id) {
    throw new Error('findById() must be implemented');
  }

  async create(data) {
    throw new Error('create() must be implemented');
  }

  async update(id, data) {
    throw new Error('update() must be implemented');
  }

  async delete(id) {
    throw new Error('delete() must be implemented');
  }

  async getPageSettings() {
    throw new Error('getPageSettings() must be implemented');
  }

  async updatePageSettings(data) {
    throw new Error('updatePageSettings() must be implemented');
  }
}

export default IBlogRepository;
