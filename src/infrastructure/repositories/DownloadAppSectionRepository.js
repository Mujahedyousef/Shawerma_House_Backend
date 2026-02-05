import { PrismaClient } from '@prisma/client';
import { IDownloadAppSectionRepository } from '../../domain/repositories/IDownloadAppSectionRepository.js';

const prisma = new PrismaClient();

export class DownloadAppSectionRepository extends IDownloadAppSectionRepository {
  async getActive() {
    return await prisma.downloadAppSection.findFirst({
      where: { isActive: true },
    });
  }

  async findById(id) {
    return await prisma.downloadAppSection.findUnique({
      where: { id },
    });
  }

  async create(data) {
    // Set any existing active section to inactive
    await prisma.downloadAppSection.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    return await prisma.downloadAppSection.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.downloadAppSection.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.downloadAppSection.delete({
      where: { id },
    });
  }
}

export default DownloadAppSectionRepository;

