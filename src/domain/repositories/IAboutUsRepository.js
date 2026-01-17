export class IAboutUsRepository {
  async getPageSettings() {
    throw new Error('getPageSettings() must be implemented');
  }

  async updatePageSettings(data) {
    throw new Error('updatePageSettings() must be implemented');
  }

  async createMetric(data) {
    throw new Error('createMetric() must be implemented');
  }

  async updateMetric(id, data) {
    throw new Error('updateMetric() must be implemented');
  }

  async deleteMetric(id) {
    throw new Error('deleteMetric() must be implemented');
  }

  async createNavigationButton(data) {
    throw new Error('createNavigationButton() must be implemented');
  }

  async updateNavigationButton(id, data) {
    throw new Error('updateNavigationButton() must be implemented');
  }

  async deleteNavigationButton(id) {
    throw new Error('deleteNavigationButton() must be implemented');
  }

  async createStoryItem(data) {
    throw new Error('createStoryItem() must be implemented');
  }

  async updateStoryItem(id, data) {
    throw new Error('updateStoryItem() must be implemented');
  }

  async deleteStoryItem(id) {
    throw new Error('deleteStoryItem() must be implemented');
  }
}

export default IAboutUsRepository;
