export class CareersPageService {
  constructor(careersPageRepository) {
    this.careersPageRepository = careersPageRepository;
  }

  async getSettings() {
    return await this.careersPageRepository.getSettings();
  }

  async updateSettings(data) {
    return await this.careersPageRepository.updateSettings(data);
  }

  async createJobBenefit(data) {
    return await this.careersPageRepository.createJobBenefit(data);
  }

  async updateJobBenefit(id, data) {
    return await this.careersPageRepository.updateJobBenefit(id, data);
  }

  async deleteJobBenefit(id) {
    return await this.careersPageRepository.deleteJobBenefit(id);
  }

  async createJobListing(data) {
    return await this.careersPageRepository.createJobListing(data);
  }

  async updateJobListing(id, data) {
    return await this.careersPageRepository.updateJobListing(id, data);
  }

  async deleteJobListing(id) {
    return await this.careersPageRepository.deleteJobListing(id);
  }

  async createWhyWorkWithUsItem(data) {
    return await this.careersPageRepository.createWhyWorkWithUsItem(data);
  }

  async updateWhyWorkWithUsItem(id, data) {
    return await this.careersPageRepository.updateWhyWorkWithUsItem(id, data);
  }

  async deleteWhyWorkWithUsItem(id) {
    return await this.careersPageRepository.deleteWhyWorkWithUsItem(id);
  }

  async getJobListingById(id) {
    return await this.careersPageRepository.getJobListingById(id);
  }

  async createJobApplication(data) {
    return await this.careersPageRepository.createJobApplication(data);
  }

  async getAllJobApplications() {
    return await this.careersPageRepository.getAllJobApplications();
  }

  async getJobApplicationsByJobId(jobId) {
    return await this.careersPageRepository.getJobApplicationsByJobId(jobId);
  }
}

export default CareersPageService;
