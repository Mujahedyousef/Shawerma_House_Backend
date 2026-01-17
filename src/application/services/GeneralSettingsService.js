export class GeneralSettingsService {
  constructor(generalSettingsRepository) {
    this.generalSettingsRepository = generalSettingsRepository;
  }

  async getSettings() {
    return await this.generalSettingsRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.generalSettingsRepository.updateSettings(data);
  }
}

export default GeneralSettingsService;
