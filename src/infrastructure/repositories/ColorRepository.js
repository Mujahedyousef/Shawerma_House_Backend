import { PrismaClient } from '@prisma/client';
import { IColorRepository } from '../../domain/repositories/IColorRepository.js';

const prisma = new PrismaClient();

export class ColorRepository extends IColorRepository {
  async getAll() {
    return await prisma.color.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.color.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.color.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.color.create({
      data: {
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        hexCode: data.hexCode || null,
        order: parseInt(data.order) || 0,
        isActive: data.isActive !== undefined ? data.isActive : true,
      },
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.nameEn !== undefined) updateData.nameEn = data.nameEn;
    if (data.nameAr !== undefined) updateData.nameAr = data.nameAr;
    if (data.hexCode !== undefined) updateData.hexCode = data.hexCode || null;
    if (data.order !== undefined) updateData.order = parseInt(data.order);
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return await prisma.color.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id) {
    return await prisma.color.delete({
      where: { id },
    });
  }
}

export default ColorRepository;
