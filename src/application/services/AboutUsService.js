export class AboutUsService {
  constructor(aboutUsRepository) {
    this.aboutUsRepository = aboutUsRepository;
  }

  async getPageSettings() {
    return await this.aboutUsRepository.getPageSettings();
  }

  async updatePageSettings(data) {
    return await this.aboutUsRepository.updatePageSettings(data);
  }

  async createMetric(data) {
    return await this.aboutUsRepository.createMetric(data);
  }

  async updateMetric(id, data) {
    return await this.aboutUsRepository.updateMetric(id, data);
  }

  async deleteMetric(id) {
    return await this.aboutUsRepository.deleteMetric(id);
  }

  async createNavigationButton(data) {
    return await this.aboutUsRepository.createNavigationButton(data);
  }

  async updateNavigationButton(id, data) {
    return await this.aboutUsRepository.updateNavigationButton(id, data);
  }

  async deleteNavigationButton(id) {
    return await this.aboutUsRepository.deleteNavigationButton(id);
  }

  async createStoryItem(data) {
    return await this.aboutUsRepository.createStoryItem(data);
  }

  async updateStoryItem(id, data) {
    return await this.aboutUsRepository.updateStoryItem(id, data);
  }

  async deleteStoryItem(id) {
    return await this.aboutUsRepository.deleteStoryItem(id);
  }

  async createCoreValue(data) {
    return await this.aboutUsRepository.createCoreValue(data);
  }

  async updateCoreValue(id, data) {
    return await this.aboutUsRepository.updateCoreValue(id, data);
  }

  async deleteCoreValue(id) {
    return await this.aboutUsRepository.deleteCoreValue(id);
  }

  async createTeamMember(data) {
    return await this.aboutUsRepository.createTeamMember(data);
  }

  async updateTeamMember(id, data) {
    return await this.aboutUsRepository.updateTeamMember(id, data);
  }

  async deleteTeamMember(id) {
    return await this.aboutUsRepository.deleteTeamMember(id);
  }

  async getTeamMembersHierarchy(aboutUsPageId) {
    return await this.aboutUsRepository.getTeamMembersHierarchy(aboutUsPageId);
  }

  async createAward(data) {
    return await this.aboutUsRepository.createAward(data);
  }

  async updateAward(id, data) {
    return await this.aboutUsRepository.updateAward(id, data);
  }

  async deleteAward(id) {
    return await this.aboutUsRepository.deleteAward(id);
  }
}

export default AboutUsService;
