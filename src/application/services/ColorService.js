export class ColorService {
  constructor(colorRepository) {
    this.colorRepository = colorRepository;
  }

  async getAllColors() {
    return await this.colorRepository.getAll();
  }

  async getActiveColors() {
    return await this.colorRepository.getActive();
  }

  async getColorById(id) {
    return await this.colorRepository.findById(id);
  }

  async createColor(data) {
    return await this.colorRepository.create(data);
  }

  async updateColor(id, data) {
    return await this.colorRepository.update(id, data);
  }

  async deleteColor(id) {
    return await this.colorRepository.delete(id);
  }
}

export default ColorService;
