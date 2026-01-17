import { PrismaClient } from '@prisma/client';
import { IGeneralSettingsRepository } from '../../domain/repositories/IGeneralSettingsRepository.js';

const prisma = new PrismaClient();

export class GeneralSettingsRepository extends IGeneralSettingsRepository {
  async getSettings() {
    let settings = await prisma.generalSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.generalSettings.create({
        data: {
          currencyCode: 'AED',
          currencySymbol: 'د.إ',
          currencyNameEn: 'UAE Dirham',
          currencyNameAr: 'درهم إماراتي',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.generalSettings.findFirst({
      where: { isActive: true },
    });

    if (settings) {
      return await prisma.generalSettings.update({
        where: { id: settings.id },
        data: {
          currencyCode: data.currencyCode,
          currencySymbol: data.currencySymbol,
          currencyNameEn: data.currencyNameEn,
          currencyNameAr: data.currencyNameAr,
        },
      });
    } else {
      return await prisma.generalSettings.create({
        data: {
          currencyCode: data.currencyCode || 'AED',
          currencySymbol: data.currencySymbol || 'د.إ',
          currencyNameEn: data.currencyNameEn || 'UAE Dirham',
          currencyNameAr: data.currencyNameAr || 'درهم إماراتي',
          isActive: true,
        },
      });
    }
  }
}

export default GeneralSettingsRepository;
