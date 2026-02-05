import { PrismaClient } from '@prisma/client';
import { IMapSectionRepository } from '../../domain/repositories/IMapSectionRepository.js';

const prisma = new PrismaClient();

export class MapSectionRepository extends IMapSectionRepository {
  async getActive() {
    return await prisma.branchesMapSection.findFirst({
      where: { isActive: true },
      include: {
        branches: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findById(id) {
    return await prisma.branchesMapSection.findUnique({
      where: { id },
      include: {
        branches: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async create(data) {
    // Set any existing active section to inactive
    await prisma.branchesMapSection.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    return await prisma.branchesMapSection.create({
      data,
      include: {
        branches: true,
      },
    });
  }

  async update(id, data) {
    return await prisma.branchesMapSection.update({
      where: { id },
      data,
      include: {
        branches: true,
      },
    });
  }

  async delete(id) {
    return await prisma.branchesMapSection.delete({
      where: { id },
    });
  }

  async createBranch(data) {
    return await prisma.branch.create({
      data,
    });
  }

  async updateBranch(id, data) {
    return await prisma.branch.update({
      where: { id },
      data,
    });
  }

  async deleteBranch(id) {
    return await prisma.branch.delete({
      where: { id },
    });
  }

  async getBranches(mapSectionId) {
    return await prisma.branch.findMany({
      where: { mapSectionId },
      orderBy: { order: 'asc' },
    });
  }

  async findBranchById(id) {
    return await prisma.branch.findUnique({
      where: { id },
    });
  }
}

export default MapSectionRepository;


