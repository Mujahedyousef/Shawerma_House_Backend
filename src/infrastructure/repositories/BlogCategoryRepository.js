import { PrismaClient } from '@prisma/client';
import { IBlogCategoryRepository } from '../../domain/repositories/IBlogCategoryRepository.js';

const prisma = new PrismaClient();

export class BlogCategoryRepository extends IBlogCategoryRepository {
  async getAll() {
    return await prisma.blogCategory.findMany({
      orderBy: { order: 'asc' },
    });
  }

  async getActive() {
    return await prisma.blogCategory.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async findById(id) {
    return await prisma.blogCategory.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.blogCategory.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.blogCategory.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.blogCategory.delete({
      where: { id },
    });
  }
}

export default BlogCategoryRepository;
