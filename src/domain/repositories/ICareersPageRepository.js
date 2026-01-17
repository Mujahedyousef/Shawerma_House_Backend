export class ICareersPageRepository {
  async getSettings() {
    throw new Error('getSettings() must be implemented');
  }

  async updateSettings(data) {
    throw new Error('updateSettings() must be implemented');
  }

  async createJobBenefit(data) {
    throw new Error('createJobBenefit() must be implemented');
  }

  async updateJobBenefit(id, data) {
    throw new Error('updateJobBenefit() must be implemented');
  }

  async deleteJobBenefit(id) {
    throw new Error('deleteJobBenefit() must be implemented');
  }

  async createJobListing(data) {
    throw new Error('createJobListing() must be implemented');
  }

  async updateJobListing(id, data) {
    throw new Error('updateJobListing() must be implemented');
  }

  async deleteJobListing(id) {
    throw new Error('deleteJobListing() must be implemented');
  }

  async createWhyWorkWithUsItem(data) {
    throw new Error('createWhyWorkWithUsItem() must be implemented');
  }

  async updateWhyWorkWithUsItem(id, data) {
    throw new Error('updateWhyWorkWithUsItem() must be implemented');
  }

  async deleteWhyWorkWithUsItem(id) {
    throw new Error('deleteWhyWorkWithUsItem() must be implemented');
  }

  async getJobListingById(id) {
    throw new Error('getJobListingById() must be implemented');
  }

  async createJobApplication(data) {
    throw new Error('createJobApplication() must be implemented');
  }

  async getAllJobApplications() {
    throw new Error('getAllJobApplications() must be implemented');
  }

  async getJobApplicationsByJobId(jobId) {
    throw new Error('getJobApplicationsByJobId() must be implemented');
  }
}

export default ICareersPageRepository;
