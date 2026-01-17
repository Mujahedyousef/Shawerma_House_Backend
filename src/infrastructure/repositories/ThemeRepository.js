import { PrismaClient } from '@prisma/client';
import { IThemeRepository } from '../../domain/repositories/IThemeRepository.js';

const prisma = new PrismaClient();

export class ThemeRepository extends IThemeRepository {
  async getSettings() {
    let settings = await prisma.themeSettings.findFirst({
      where: { isActive: true },
    });

    // Create default settings if none exist
    if (!settings) {
      settings = await prisma.themeSettings.create({
        data: {
          colorBrand: '#3daae1',
          colorBrandDark: '#1c90ce',
          colorAccent: '#22c55e',
          colorDestructive: '#ef4444',
          colorWarning: '#f59e0b',
          colorInfo: '#3b82f6',
          colorRing: '#3daae1',
          // Light Mode
          colorBg1: '#f1f5f9',
          colorBg2: '#ffffff',
          colorCard: '#ffffff',
          colorBorder: '#e5e7eb',
          colorText: '#020617',
          colorText2: '#64748b',
          colorTextMuted: '#64748b',
          colorTextMuted2: '#94a3b8',
          // Dark Mode
          colorBg1Dark: '#020617',
          colorBg2Dark: '#0f172a',
          colorCardDark: '#1e293b',
          colorBorderDark: '#334155',
          colorTextDark: '#ffffff',
          colorText2Dark: '#cbd5e1',
          colorTextMutedDark: '#cbd5e1',
          colorTextMuted2Dark: '#94a3b8',
          // Section Colors
          colorSectionLight: '#F8F9FB',
          colorSectionDark: '#0b1320',
          colorTextOnLight: '#0b1320',
          colorTextOnDark: '#ffffff',
          colorSectionMuted: '#f8fafc',
          // Section Colors Dark Mode
          colorSectionLightDark: '#0f172a',
          colorSectionDarkDark: '#f1f5f9',
          colorTextOnLightDark: '#ffffff',
          colorTextOnDarkDark: '#0b1320',
          colorSectionMutedDark: '#1e293b',
          // Button Colors - Light Mode
          colorButtonPrimaryBg: '#020617',
          colorButtonPrimaryBgHover: '#0f172a',
          colorButtonPrimaryText: '#ffffff',
          colorButtonPrimaryTextHover: '#ffffff',
          colorButtonSecondaryBg: 'transparent',
          colorButtonSecondaryBgHover: '#f1f5f9',
          colorButtonSecondaryText: '#020617',
          colorButtonSecondaryTextHover: '#020617',
          // Button Colors - Dark Mode
          colorButtonPrimaryBgDark: '#ffffff',
          colorButtonPrimaryBgHoverDark: '#f1f5f9',
          colorButtonPrimaryTextDark: '#020617',
          colorButtonPrimaryTextHoverDark: '#020617',
          colorButtonSecondaryBgDark: 'transparent',
          colorButtonSecondaryBgHoverDark: '#1e293b',
          colorButtonSecondaryTextDark: '#ffffff',
          colorButtonSecondaryTextHoverDark: '#ffffff',
          fontFamily: 'Inter',
          fontFamilyAr: 'Tajawal',
          isActive: true,
        },
      });
    }

    return settings;
  }

  async updateSettings(data) {
    let settings = await prisma.themeSettings.findFirst({
      where: { isActive: true },
    });

    const updateData = {};
    
    // Helper function to check if a value should be updated (not null, not undefined, and not empty string)
    const shouldUpdate = (value) => value !== undefined && value !== null && value !== '';
    
    // Only update fields that are provided and valid
    if (shouldUpdate(data.colorBrand)) updateData.colorBrand = data.colorBrand;
    if (shouldUpdate(data.colorBrandDark)) updateData.colorBrandDark = data.colorBrandDark;
    if (shouldUpdate(data.colorAccent)) updateData.colorAccent = data.colorAccent;
    if (shouldUpdate(data.colorDestructive)) updateData.colorDestructive = data.colorDestructive;
    if (shouldUpdate(data.colorWarning)) updateData.colorWarning = data.colorWarning;
    if (shouldUpdate(data.colorInfo)) updateData.colorInfo = data.colorInfo;
    if (shouldUpdate(data.colorRing)) updateData.colorRing = data.colorRing;
    
    // Light Mode
    if (shouldUpdate(data.colorBg1)) updateData.colorBg1 = data.colorBg1;
    if (shouldUpdate(data.colorBg2)) updateData.colorBg2 = data.colorBg2;
    if (shouldUpdate(data.colorCard)) updateData.colorCard = data.colorCard;
    if (shouldUpdate(data.colorBorder)) updateData.colorBorder = data.colorBorder;
    if (shouldUpdate(data.colorText)) updateData.colorText = data.colorText;
    if (shouldUpdate(data.colorText2)) updateData.colorText2 = data.colorText2;
    if (shouldUpdate(data.colorTextMuted)) updateData.colorTextMuted = data.colorTextMuted;
    if (shouldUpdate(data.colorTextMuted2)) updateData.colorTextMuted2 = data.colorTextMuted2;
    
    // Dark Mode
    if (shouldUpdate(data.colorBg1Dark)) updateData.colorBg1Dark = data.colorBg1Dark;
    if (shouldUpdate(data.colorBg2Dark)) updateData.colorBg2Dark = data.colorBg2Dark;
    if (shouldUpdate(data.colorCardDark)) updateData.colorCardDark = data.colorCardDark;
    if (shouldUpdate(data.colorBorderDark)) updateData.colorBorderDark = data.colorBorderDark;
    if (shouldUpdate(data.colorTextDark)) updateData.colorTextDark = data.colorTextDark;
    if (shouldUpdate(data.colorText2Dark)) updateData.colorText2Dark = data.colorText2Dark;
    if (shouldUpdate(data.colorTextMutedDark)) updateData.colorTextMutedDark = data.colorTextMutedDark;
    if (shouldUpdate(data.colorTextMuted2Dark)) updateData.colorTextMuted2Dark = data.colorTextMuted2Dark;
    
    // Section Colors
    if (shouldUpdate(data.colorSectionLight)) updateData.colorSectionLight = data.colorSectionLight;
    if (shouldUpdate(data.colorSectionDark)) updateData.colorSectionDark = data.colorSectionDark;
    if (shouldUpdate(data.colorTextOnLight)) updateData.colorTextOnLight = data.colorTextOnLight;
    if (shouldUpdate(data.colorTextOnDark)) updateData.colorTextOnDark = data.colorTextOnDark;
    if (shouldUpdate(data.colorSectionMuted)) updateData.colorSectionMuted = data.colorSectionMuted;
    
    // Section Colors Dark Mode
    if (shouldUpdate(data.colorSectionLightDark)) updateData.colorSectionLightDark = data.colorSectionLightDark;
    if (shouldUpdate(data.colorSectionDarkDark)) updateData.colorSectionDarkDark = data.colorSectionDarkDark;
    if (shouldUpdate(data.colorTextOnLightDark)) updateData.colorTextOnLightDark = data.colorTextOnLightDark;
    if (shouldUpdate(data.colorTextOnDarkDark)) updateData.colorTextOnDarkDark = data.colorTextOnDarkDark;
    if (shouldUpdate(data.colorSectionMutedDark)) updateData.colorSectionMutedDark = data.colorSectionMutedDark;
    
    // Button Colors - Light Mode
    if (shouldUpdate(data.colorButtonPrimaryBg)) updateData.colorButtonPrimaryBg = data.colorButtonPrimaryBg;
    if (shouldUpdate(data.colorButtonPrimaryBgHover)) updateData.colorButtonPrimaryBgHover = data.colorButtonPrimaryBgHover;
    if (shouldUpdate(data.colorButtonPrimaryText)) updateData.colorButtonPrimaryText = data.colorButtonPrimaryText;
    if (shouldUpdate(data.colorButtonPrimaryTextHover)) updateData.colorButtonPrimaryTextHover = data.colorButtonPrimaryTextHover;
    if (shouldUpdate(data.colorButtonSecondaryBg)) updateData.colorButtonSecondaryBg = data.colorButtonSecondaryBg;
    if (shouldUpdate(data.colorButtonSecondaryBgHover)) updateData.colorButtonSecondaryBgHover = data.colorButtonSecondaryBgHover;
    if (shouldUpdate(data.colorButtonSecondaryText)) updateData.colorButtonSecondaryText = data.colorButtonSecondaryText;
    if (shouldUpdate(data.colorButtonSecondaryTextHover)) updateData.colorButtonSecondaryTextHover = data.colorButtonSecondaryTextHover;
    
    // Button Colors - Dark Mode
    if (shouldUpdate(data.colorButtonPrimaryBgDark)) updateData.colorButtonPrimaryBgDark = data.colorButtonPrimaryBgDark;
    if (shouldUpdate(data.colorButtonPrimaryBgHoverDark)) updateData.colorButtonPrimaryBgHoverDark = data.colorButtonPrimaryBgHoverDark;
    if (shouldUpdate(data.colorButtonPrimaryTextDark)) updateData.colorButtonPrimaryTextDark = data.colorButtonPrimaryTextDark;
    if (shouldUpdate(data.colorButtonPrimaryTextHoverDark)) updateData.colorButtonPrimaryTextHoverDark = data.colorButtonPrimaryTextHoverDark;
    if (shouldUpdate(data.colorButtonSecondaryBgDark)) updateData.colorButtonSecondaryBgDark = data.colorButtonSecondaryBgDark;
    if (shouldUpdate(data.colorButtonSecondaryBgHoverDark)) updateData.colorButtonSecondaryBgHoverDark = data.colorButtonSecondaryBgHoverDark;
    if (shouldUpdate(data.colorButtonSecondaryTextDark)) updateData.colorButtonSecondaryTextDark = data.colorButtonSecondaryTextDark;
    if (shouldUpdate(data.colorButtonSecondaryTextHoverDark)) updateData.colorButtonSecondaryTextHoverDark = data.colorButtonSecondaryTextHoverDark;
    
    if (shouldUpdate(data.fontFamily)) updateData.fontFamily = data.fontFamily;
    if (shouldUpdate(data.fontFamilyAr)) updateData.fontFamilyAr = data.fontFamilyAr;

    if (settings) {
      return await prisma.themeSettings.update({
        where: { id: settings.id },
        data: updateData,
      });
    } else {
      // Create with defaults if no settings exist
      return await prisma.themeSettings.create({
        data: {
          colorBrand: data.colorBrand || '#3daae1',
          colorBrandDark: data.colorBrandDark || '#1c90ce',
          colorAccent: data.colorAccent || '#22c55e',
          colorDestructive: data.colorDestructive || '#ef4444',
          colorWarning: data.colorWarning || '#f59e0b',
          colorInfo: data.colorInfo || '#3b82f6',
          colorRing: data.colorRing || data.colorBrand || '#3daae1',
          // Light Mode
          colorBg1: data.colorBg1 || '#f1f5f9',
          colorBg2: data.colorBg2 || '#ffffff',
          colorCard: data.colorCard || '#ffffff',
          colorBorder: data.colorBorder || '#e5e7eb',
          colorText: data.colorText || '#020617',
          colorText2: data.colorText2 || '#64748b',
          colorTextMuted: data.colorTextMuted || '#64748b',
          colorTextMuted2: data.colorTextMuted2 || '#94a3b8',
          // Dark Mode
          colorBg1Dark: data.colorBg1Dark || '#020617',
          colorBg2Dark: data.colorBg2Dark || '#0f172a',
          colorCardDark: data.colorCardDark || '#1e293b',
          colorBorderDark: data.colorBorderDark || '#334155',
          colorTextDark: data.colorTextDark || '#ffffff',
          colorText2Dark: data.colorText2Dark || '#cbd5e1',
          colorTextMutedDark: data.colorTextMutedDark || '#cbd5e1',
          colorTextMuted2Dark: data.colorTextMuted2Dark || '#94a3b8',
          // Section Colors
          colorSectionLight: data.colorSectionLight || '#F8F9FB',
          colorSectionDark: data.colorSectionDark || '#0b1320',
          colorTextOnLight: data.colorTextOnLight || '#0b1320',
          colorTextOnDark: data.colorTextOnDark || '#ffffff',
          colorSectionMuted: data.colorSectionMuted || '#f8fafc',
          // Section Colors Dark Mode
          colorSectionLightDark: data.colorSectionLightDark || '#0f172a',
          colorSectionDarkDark: data.colorSectionDarkDark || '#f1f5f9',
          colorTextOnLightDark: data.colorTextOnLightDark || '#ffffff',
          colorTextOnDarkDark: data.colorTextOnDarkDark || '#0b1320',
          colorSectionMutedDark: data.colorSectionMutedDark || '#1e293b',
          // Button Colors - Light Mode
          colorButtonPrimaryBg: data.colorButtonPrimaryBg || '#020617',
          colorButtonPrimaryBgHover: data.colorButtonPrimaryBgHover || '#0f172a',
          colorButtonPrimaryText: data.colorButtonPrimaryText || '#ffffff',
          colorButtonPrimaryTextHover: data.colorButtonPrimaryTextHover || '#ffffff',
          colorButtonSecondaryBg: data.colorButtonSecondaryBg || 'transparent',
          colorButtonSecondaryBgHover: data.colorButtonSecondaryBgHover || '#f1f5f9',
          colorButtonSecondaryText: data.colorButtonSecondaryText || '#020617',
          colorButtonSecondaryTextHover: data.colorButtonSecondaryTextHover || '#020617',
          // Button Colors - Dark Mode
          colorButtonPrimaryBgDark: data.colorButtonPrimaryBgDark || '#ffffff',
          colorButtonPrimaryBgHoverDark: data.colorButtonPrimaryBgHoverDark || '#f1f5f9',
          colorButtonPrimaryTextDark: data.colorButtonPrimaryTextDark || '#020617',
          colorButtonPrimaryTextHoverDark: data.colorButtonPrimaryTextHoverDark || '#020617',
          colorButtonSecondaryBgDark: data.colorButtonSecondaryBgDark || 'transparent',
          colorButtonSecondaryBgHoverDark: data.colorButtonSecondaryBgHoverDark || '#1e293b',
          colorButtonSecondaryTextDark: data.colorButtonSecondaryTextDark || '#ffffff',
          colorButtonSecondaryTextHoverDark: data.colorButtonSecondaryTextHoverDark || '#ffffff',
          fontFamily: data.fontFamily || 'Inter',
          fontFamilyAr: data.fontFamilyAr || 'Tajawal',
          isActive: true,
        },
      });
    }
  }
}

export default ThemeRepository;

