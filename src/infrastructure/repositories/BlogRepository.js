import { PrismaClient } from '@prisma/client';
import { IBlogRepository } from '../../domain/repositories/IBlogRepository.js';

const prisma = new PrismaClient();

export class BlogRepository extends IBlogRepository {
  async getAll() {
    return await prisma.blog.findMany({
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });
  }

  async getActive() {
    return await prisma.blog.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        category: true,
      },
    });
  }

  async findById(id) {
    return await prisma.blog.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  }

  async create(data) {
    return await prisma.blog.create({
      data,
    });
  }

  async update(id, data) {
    return await prisma.blog.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.blog.delete({
      where: { id },
    });
  }

  async getPageSettings() {
    let settings = await prisma.blogsPageSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.blogsPageSettings.create({
        data: {
          heroImageUrl: '/uploads/default-blogs-hero.jpg',
          titleEn: 'Blogs',
          titleAr: 'المقالات',
          descriptionEn: 'Explore our latest articles and insights.',
          descriptionAr: 'استكشف أحدث مقالاتنا ورؤانا.',
          heroSectionDescriptionEn: null,
          heroSectionDescriptionAr: null,
          gridSectionTitleEn: 'Blogs',
          gridSectionTitleAr: 'المقالات',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updatePageSettings(data) {
    let settings = await prisma.blogsPageSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.titleEn !== undefined) updateData.titleEn = data.titleEn;
    if (data.titleAr !== undefined) updateData.titleAr = data.titleAr;
    if (data.descriptionEn !== undefined) updateData.descriptionEn = data.descriptionEn;
    if (data.descriptionAr !== undefined) updateData.descriptionAr = data.descriptionAr;
    if (data.heroSectionDescriptionEn !== undefined) updateData.heroSectionDescriptionEn = data.heroSectionDescriptionEn;
    if (data.heroSectionDescriptionAr !== undefined) updateData.heroSectionDescriptionAr = data.heroSectionDescriptionAr;
    if (data.gridSectionTitleEn !== undefined) updateData.gridSectionTitleEn = data.gridSectionTitleEn;
    if (data.gridSectionTitleAr !== undefined) updateData.gridSectionTitleAr = data.gridSectionTitleAr;
    if (data.heroImageUrl !== undefined) updateData.heroImageUrl = data.heroImageUrl;

    if (settings) {
      return await prisma.blogsPageSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      return await prisma.blogsPageSettings.create({
        data: {
          heroImageUrl: data.heroImageUrl || '/uploads/default-blogs-hero.jpg',
          titleEn: data.titleEn || 'Blogs',
          titleAr: data.titleAr || 'المقالات',
          descriptionEn: data.descriptionEn || 'Explore our latest articles and insights.',
          descriptionAr: data.descriptionAr || 'استكشف أحدث مقالاتنا ورؤانا.',
          heroSectionDescriptionEn: data.heroSectionDescriptionEn || null,
          heroSectionDescriptionAr: data.heroSectionDescriptionAr || null,
          gridSectionTitleEn: data.gridSectionTitleEn || 'Blogs',
          gridSectionTitleAr: data.gridSectionTitleAr || 'المقالات',
          isActive: true,
        },
      });
    }
  }
}

export default BlogRepository;
