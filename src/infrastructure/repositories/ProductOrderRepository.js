import { PrismaClient } from '@prisma/client';
import { IProductOrderRepository } from '../../domain/repositories/IProductOrderRepository.js';

const prisma = new PrismaClient();

export class ProductOrderRepository extends IProductOrderRepository {
  async getAll() {
    return await prisma.productOrder.findMany({
      include: {
        product: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
            imageUrl: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return await prisma.productOrder.findUnique({
      where: { id },
      include: {
        product: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
            imageUrl: true,
            price: true,
          },
        },
      },
    });
  }

  async create(data) {
    return await prisma.productOrder.create({
      data: {
        productId: data.productId || null,
        name: data.name,
        email: data.email || null,
        phone: data.phone,
        countryCode: data.countryCode || '+971',
        message: data.message || null,
        status: data.status || 'pending',
        notes: data.notes || null,
      },
      include: {
        product: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
            imageUrl: true,
            price: true,
          },
        },
      },
    });
  }

  async update(id, data) {
    const updateData = {};
    if (data.status !== undefined) updateData.status = data.status;
    if (data.notes !== undefined) updateData.notes = data.notes;

    return await prisma.productOrder.update({
      where: { id },
      data: updateData,
      include: {
        product: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
            imageUrl: true,
            price: true,
          },
        },
      },
    });
  }

  async delete(id) {
    return await prisma.productOrder.delete({
      where: { id },
    });
  }
}

export default ProductOrderRepository;
