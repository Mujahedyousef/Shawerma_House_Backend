import { PrismaClient } from '@prisma/client';
import { IAboutUsRepository } from '../../domain/repositories/IAboutUsRepository.js';

const prisma = new PrismaClient();

export class AboutUsRepository extends IAboutUsRepository {
  async getPageSettings() {
    let settings = await prisma.aboutUsPageSettings.findFirst({
      where: { isActive: true },
      include: {
        metrics: {
          orderBy: { order: 'asc' },
        },
        navigationButtons: {
          orderBy: { order: 'asc' },
        },
        storyItems: {
          orderBy: { order: 'asc' },
        },
        coreValues: {
          orderBy: { order: 'asc' },
        },
        teamMembers: {
          orderBy: [{ level: 'asc' }, { order: 'asc' }],
        },
        awards: {
          orderBy: { order: 'asc' },
        },
      },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.aboutUsPageSettings.create({
        data: {
          heroImageUrl: '/uploads/default-about-us-hero.jpg',
          heroTitleEn: 'About Us',
          heroTitleAr: 'من نحن',
          heroDescriptionEn: 'We are a leading provider of construction materials and solutions.',
          heroDescriptionAr: 'نحن مزود رائد لمواد البناء والحلول.',
          visionSectionTitleEn: 'Our Vision',
          visionSectionTitleAr: 'رؤيتنا',
          visionTextEn: 'To be a leading partner in construction material solutions.',
          visionTextAr: 'أن نكون شريكًا رائدًا في حلول مواد البناء.',
          visionImageUrl: '/uploads/default-vision-image.jpg',
          messageSectionTitleEn: 'Our Message',
          messageSectionTitleAr: 'رسالتنا',
          messageTextEn: 'To be the first partner in Jordan and the region for building material solutions.',
          messageTextAr: 'أن نكون الشريك الأول في الأردن والمنطقة لحلول مواد البناء.',
          messageBannerTextEn: 'To be the first partner in Jordan and the region for building material solutions.',
          messageBannerTextAr: 'أن نكون الشريك الأول في الأردن والمنطقة لحلول مواد البناء.',
          messageImageUrl: '/uploads/default-message-image.jpg',
          ourStorySectionTitleEn: 'Our Story',
          ourStorySectionTitleAr: 'قصتنا',
          ourStorySectionSubtitleEn: 'Company History',
          ourStorySectionSubtitleAr: 'تاريخ الشركة',
          isActive: true,
        },
        include: {
          metrics: true,
          navigationButtons: true,
          storyItems: true,
          coreValues: true,
          teamMembers: true,
          awards: true,
        },
      });
    }

    return settings;
  }

  async updatePageSettings(data) {
    let settings = await prisma.aboutUsPageSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    if (data.heroImageUrl !== undefined) updateData.heroImageUrl = data.heroImageUrl;
    if (data.heroTitleEn !== undefined) updateData.heroTitleEn = data.heroTitleEn;
    if (data.heroTitleAr !== undefined) updateData.heroTitleAr = data.heroTitleAr;
    if (data.heroDescriptionEn !== undefined) updateData.heroDescriptionEn = data.heroDescriptionEn;
    if (data.heroDescriptionAr !== undefined) updateData.heroDescriptionAr = data.heroDescriptionAr;
    if (data.visionSectionTitleEn !== undefined) updateData.visionSectionTitleEn = data.visionSectionTitleEn;
    if (data.visionSectionTitleAr !== undefined) updateData.visionSectionTitleAr = data.visionSectionTitleAr;
    if (data.visionTextEn !== undefined) updateData.visionTextEn = data.visionTextEn;
    if (data.visionTextAr !== undefined) updateData.visionTextAr = data.visionTextAr;
    if (data.visionImageUrl !== undefined) updateData.visionImageUrl = data.visionImageUrl;
    if (data.visionQuoteTextEn !== undefined) updateData.visionQuoteTextEn = data.visionQuoteTextEn;
    if (data.visionQuoteTextAr !== undefined) updateData.visionQuoteTextAr = data.visionQuoteTextAr;
    if (data.visionQuoteAuthorNameEn !== undefined) updateData.visionQuoteAuthorNameEn = data.visionQuoteAuthorNameEn;
    if (data.visionQuoteAuthorNameAr !== undefined) updateData.visionQuoteAuthorNameAr = data.visionQuoteAuthorNameAr;
    if (data.visionQuoteAuthorTitleEn !== undefined) updateData.visionQuoteAuthorTitleEn = data.visionQuoteAuthorTitleEn;
    if (data.visionQuoteAuthorTitleAr !== undefined) updateData.visionQuoteAuthorTitleAr = data.visionQuoteAuthorTitleAr;
    if (data.visionQuoteAuthorImageUrl !== undefined) updateData.visionQuoteAuthorImageUrl = data.visionQuoteAuthorImageUrl;
    if (data.messageSectionTitleEn !== undefined) updateData.messageSectionTitleEn = data.messageSectionTitleEn || null;
    if (data.messageSectionTitleAr !== undefined) updateData.messageSectionTitleAr = data.messageSectionTitleAr || null;
    if (data.messageTextEn !== undefined) updateData.messageTextEn = data.messageTextEn || null;
    if (data.messageTextAr !== undefined) updateData.messageTextAr = data.messageTextAr || null;
    if (data.messageBannerTextEn !== undefined) updateData.messageBannerTextEn = data.messageBannerTextEn || null;
    if (data.messageBannerTextAr !== undefined) updateData.messageBannerTextAr = data.messageBannerTextAr || null;
    if (data.messageImageUrl !== undefined) updateData.messageImageUrl = data.messageImageUrl;
    if (data.ourStorySectionTitleEn !== undefined) updateData.ourStorySectionTitleEn = data.ourStorySectionTitleEn || null;
    if (data.ourStorySectionTitleAr !== undefined) updateData.ourStorySectionTitleAr = data.ourStorySectionTitleAr || null;
    if (data.ourStorySectionSubtitleEn !== undefined) updateData.ourStorySectionSubtitleEn = data.ourStorySectionSubtitleEn || null;
    if (data.ourStorySectionSubtitleAr !== undefined) updateData.ourStorySectionSubtitleAr = data.ourStorySectionSubtitleAr || null;
    if (data.coreValuesSectionTitleEn !== undefined) updateData.coreValuesSectionTitleEn = data.coreValuesSectionTitleEn || null;
    if (data.coreValuesSectionTitleAr !== undefined) updateData.coreValuesSectionTitleAr = data.coreValuesSectionTitleAr || null;
    if (data.coreValuesSectionSubtitleEn !== undefined) updateData.coreValuesSectionSubtitleEn = data.coreValuesSectionSubtitleEn || null;
    if (data.coreValuesSectionSubtitleAr !== undefined) updateData.coreValuesSectionSubtitleAr = data.coreValuesSectionSubtitleAr || null;
    if (data.teamSectionTitleEn !== undefined) updateData.teamSectionTitleEn = data.teamSectionTitleEn || null;
    if (data.teamSectionTitleAr !== undefined) updateData.teamSectionTitleAr = data.teamSectionTitleAr || null;
    if (data.teamSectionSubtitleEn !== undefined) updateData.teamSectionSubtitleEn = data.teamSectionSubtitleEn || null;
    if (data.teamSectionSubtitleAr !== undefined) updateData.teamSectionSubtitleAr = data.teamSectionSubtitleAr || null;
    if (data.awardsSectionTitleEn !== undefined) updateData.awardsSectionTitleEn = data.awardsSectionTitleEn || null;
    if (data.awardsSectionTitleAr !== undefined) updateData.awardsSectionTitleAr = data.awardsSectionTitleAr || null;
    if (data.awardsSectionSubtitleEn !== undefined) updateData.awardsSectionSubtitleEn = data.awardsSectionSubtitleEn || null;
    if (data.awardsSectionSubtitleAr !== undefined) updateData.awardsSectionSubtitleAr = data.awardsSectionSubtitleAr || null;

    if (settings) {
      return await prisma.aboutUsPageSettings.update({
        where: { id: settings.id },
        data: updateData,
        include: {
          metrics: {
            orderBy: { order: 'asc' },
          },
          navigationButtons: {
            orderBy: { order: 'asc' },
          },
          storyItems: {
            orderBy: { order: 'asc' },
          },
          coreValues: {
            orderBy: { order: 'asc' },
          },
          teamMembers: {
            orderBy: [{ level: 'asc' }, { order: 'asc' }],
          },
          awards: {
            orderBy: { order: 'asc' },
          },
        },
      });
    } else {
      // Create if doesn't exist
      return await this.getPageSettings();
    }
  }

  async createStoryItem(data) {
    return await prisma.aboutUsStoryItem.create({
      data,
    });
  }

  async updateStoryItem(id, data) {
    return await prisma.aboutUsStoryItem.update({
      where: { id },
      data,
    });
  }

  async deleteStoryItem(id) {
    return await prisma.aboutUsStoryItem.delete({
      where: { id },
    });
  }

  async createMetric(data) {
    return await prisma.aboutUsMetric.create({
      data,
    });
  }

  async updateMetric(id, data) {
    return await prisma.aboutUsMetric.update({
      where: { id },
      data,
    });
  }

  async deleteMetric(id) {
    return await prisma.aboutUsMetric.delete({
      where: { id },
    });
  }

  async createNavigationButton(data) {
    return await prisma.aboutUsNavigationButton.create({
      data,
    });
  }

  async updateNavigationButton(id, data) {
    return await prisma.aboutUsNavigationButton.update({
      where: { id },
      data,
    });
  }

  async deleteNavigationButton(id) {
    return await prisma.aboutUsNavigationButton.delete({
      where: { id },
    });
  }

  async createCoreValue(data) {
    return await prisma.aboutUsCoreValue.create({
      data,
    });
  }

  async updateCoreValue(id, data) {
    return await prisma.aboutUsCoreValue.update({
      where: { id },
      data,
    });
  }

  async deleteCoreValue(id) {
    return await prisma.aboutUsCoreValue.delete({
      where: { id },
    });
  }

  async createTeamMember(data) {
    return await prisma.aboutUsTeamMember.create({
      data,
    });
  }

  async updateTeamMember(id, data) {
    return await prisma.aboutUsTeamMember.update({
      where: { id },
      data,
    });
  }

  async deleteTeamMember(id) {
    return await prisma.aboutUsTeamMember.delete({
      where: { id },
    });
  }

  async getTeamMembersHierarchy(aboutUsPageId) {
    const allMembers = await prisma.aboutUsTeamMember.findMany({
      where: { aboutUsPageId },
      orderBy: [{ level: 'asc' }, { order: 'asc' }],
    });

    // Build hierarchy
    const membersMap = new Map();
    const rootMembers = [];

    // First pass: create map
    allMembers.forEach(member => {
      membersMap.set(member.id, { ...member, children: [] });
    });

    // Second pass: build tree
    allMembers.forEach(member => {
      const memberNode = membersMap.get(member.id);
      if (member.parentId) {
        const parent = membersMap.get(member.parentId);
        if (parent) {
          parent.children.push(memberNode);
        }
      } else {
        rootMembers.push(memberNode);
      }
    });

    return rootMembers;
  }

  async createAward(data) {
    return await prisma.aboutUsAward.create({
      data,
    });
  }

  async updateAward(id, data) {
    return await prisma.aboutUsAward.update({
      where: { id },
      data,
    });
  }

  async deleteAward(id) {
    return await prisma.aboutUsAward.delete({
      where: { id },
    });
  }
}

export default AboutUsRepository;
