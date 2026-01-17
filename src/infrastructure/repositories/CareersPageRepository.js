import { PrismaClient } from '@prisma/client';
import { ICareersPageRepository } from '../../domain/repositories/ICareersPageRepository.js';

const prisma = new PrismaClient();

export class CareersPageRepository extends ICareersPageRepository {
  async getSettings() {
    let settings = await prisma.careersPageSettings.findFirst({
      where: { isActive: true },
      include: {
        jobBenefits: {
          orderBy: { order: 'asc' },
        },
        jobListings: {
          orderBy: { order: 'asc' },
        },
        whyWorkWithUsItems: {
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.careersPageSettings.create({
        data: {
          heroImageUrl: '/uploads/default-careers-hero.jpg',
          heroTitleEn: 'Careers',
          heroTitleAr: 'الوظائف',
          heroDescriptionEn: 'Join our team and build your career with us',
          heroDescriptionAr: 'انضم إلى فريقنا وابنِ مسيرتك المهنية معنا',
          whyWorkWithUsTitleEn: 'Why Work With Us?',
          whyWorkWithUsTitleAr: 'لماذا العمل معنا؟',
          isActive: true,
        },
        include: {
          jobBenefits: true,
          jobListings: true,
          whyWorkWithUsItems: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.careersPageSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.heroImageUrl !== undefined) updateData.heroImageUrl = data.heroImageUrl;
    if (data.heroTitleEn !== undefined) updateData.heroTitleEn = data.heroTitleEn;
    if (data.heroTitleAr !== undefined) updateData.heroTitleAr = data.heroTitleAr;
    if (data.heroDescriptionEn !== undefined) updateData.heroDescriptionEn = data.heroDescriptionEn;
    if (data.heroDescriptionAr !== undefined) updateData.heroDescriptionAr = data.heroDescriptionAr;
    if (data.whyWorkWithUsTitleEn !== undefined) updateData.whyWorkWithUsTitleEn = data.whyWorkWithUsTitleEn || null;
    if (data.whyWorkWithUsTitleAr !== undefined) updateData.whyWorkWithUsTitleAr = data.whyWorkWithUsTitleAr || null;

    if (settings) {
      return await prisma.careersPageSettings.update({
        where: { id: settings.id },
        data: updateData,
        include: {
          jobBenefits: {
            orderBy: { order: 'asc' },
          },
          jobListings: {
            orderBy: { order: 'asc' },
          },
          whyWorkWithUsItems: {
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      return await this.getSettings();
    }
  }

  async createJobBenefit(data) {
    return await prisma.careersJobBenefit.create({
      data,
    });
  }

  async updateJobBenefit(id, data) {
    return await prisma.careersJobBenefit.update({
      where: { id },
      data,
    });
  }

  async deleteJobBenefit(id) {
    return await prisma.careersJobBenefit.delete({
      where: { id },
    });
  }

  async createJobListing(data) {
    return await prisma.careersJobListing.create({
      data,
    });
  }

  async updateJobListing(id, data) {
    return await prisma.careersJobListing.update({
      where: { id },
      data,
    });
  }

  async deleteJobListing(id) {
    return await prisma.careersJobListing.delete({
      where: { id },
    });
  }

  async createWhyWorkWithUsItem(data) {
    return await prisma.careersWhyWorkWithUsItem.create({
      data,
    });
  }

  async updateWhyWorkWithUsItem(id, data) {
    return await prisma.careersWhyWorkWithUsItem.update({
      where: { id },
      data,
    });
  }

  async deleteWhyWorkWithUsItem(id) {
    return await prisma.careersWhyWorkWithUsItem.delete({
      where: { id },
    });
  }

  async getJobListingById(id) {
    return await prisma.careersJobListing.findUnique({
      where: { id },
      include: {
        careersPage: {
          include: {
            jobBenefits: {
              orderBy: { order: 'asc' },
            },
          },
        },
      },
    });
  }

  async createJobApplication(data) {
    return await prisma.jobApplication.create({
      data,
      include: {
        jobListing: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
          },
        },
      },
    });
  }

  async getAllJobApplications() {
    return await prisma.jobApplication.findMany({
      include: {
        jobListing: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getJobApplicationsByJobId(jobId) {
    return await prisma.jobApplication.findMany({
      where: { jobListingId: jobId },
      include: {
        jobListing: {
          select: {
            id: true,
            titleEn: true,
            titleAr: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

export default CareersPageRepository;
