import MapSectionRepository from '../../infrastructure/repositories/MapSectionRepository.js';
import { AppError } from '../../utils/AppError.js';

class MapSectionService {
  constructor() {
    this.mapSectionRepository = new MapSectionRepository();
  }

  async getActiveMapSection() {
    const mapSection = await this.mapSectionRepository.getActive();
    if (!mapSection) {
      throw new AppError('No active map section found', 404);
    }
    return mapSection;
  }

  async getMapSectionById(id) {
    const mapSection = await this.mapSectionRepository.findById(id);
    if (!mapSection) {
      throw new AppError('Map section not found', 404);
    }
    return mapSection;
  }

  async createMapSection(data) {
    return await this.mapSectionRepository.create(data);
  }

  async updateMapSection(id, data) {
    const mapSection = await this.mapSectionRepository.findById(id);
    if (!mapSection) {
      throw new AppError('Map section not found', 404);
    }
    return await this.mapSectionRepository.update(id, data);
  }

  async deleteMapSection(id) {
    const mapSection = await this.mapSectionRepository.findById(id);
    if (!mapSection) {
      throw new AppError('Map section not found', 404);
    }
    return await this.mapSectionRepository.delete(id);
  }

  async createBranch(data) {
    // Verify map section exists
    const mapSection = await this.mapSectionRepository.findById(
      data.mapSectionId
    );
    if (!mapSection) {
      throw new AppError('Map section not found', 404);
    }
    return await this.mapSectionRepository.createBranch(data);
  }

  async updateBranch(id, data) {
    const branch = await this.mapSectionRepository.findBranchById(id);
    if (!branch) {
      throw new AppError('Branch not found', 404);
    }
    return await this.mapSectionRepository.updateBranch(id, data);
  }

  async deleteBranch(id) {
    const branch = await this.mapSectionRepository.findBranchById(id);
    if (!branch) {
      throw new AppError('Branch not found', 404);
    }
    return await this.mapSectionRepository.deleteBranch(id);
  }

  async getBranches(mapSectionId) {
    return await this.mapSectionRepository.getBranches(mapSectionId);
  }

  async getBranchById(id) {
    const branch = await this.mapSectionRepository.findBranchById(id);
    if (!branch) {
      throw new AppError('Branch not found', 404);
    }
    return branch;
  }
}

export default MapSectionService;

