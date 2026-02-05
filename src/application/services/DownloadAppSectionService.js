import fs from 'fs/promises';
import path from 'path';

export class DownloadAppSectionService {
  constructor(downloadAppSectionRepository) {
    this.downloadAppSectionRepository = downloadAppSectionRepository;
  }

  async getActiveDownloadAppSection() {
    return await this.downloadAppSectionRepository.getActive();
  }

  async getDownloadAppSectionById(id) {
    const section = await this.downloadAppSectionRepository.findById(id);
    if (!section) {
      throw new Error('Download app section not found');
    }
    return section;
  }

  async createDownloadAppSection(data) {
    return await this.downloadAppSectionRepository.create(data);
  }

  async updateDownloadAppSection(id, data) {
    const section = await this.downloadAppSectionRepository.findById(id);
    if (!section) {
      throw new Error('Download app section not found');
    }
    return await this.downloadAppSectionRepository.update(id, data);
  }

  async deleteDownloadAppSection(id) {
    const section = await this.downloadAppSectionRepository.findById(id);
    if (!section) {
      throw new Error('Download app section not found');
    }

    // Delete associated image files if they exist
    const imagesToDelete = [
      section.backgroundImageUrl,
      section.appStoreImageUrl,
      section.googlePlayImageUrl,
      section.mobileAppImageUrl,
    ].filter(Boolean);

    for (const imageUrl of imagesToDelete) {
      if (imageUrl && !imageUrl.startsWith('http')) {
        try {
          const imagePath = path.join(process.cwd(), 'public', imageUrl);
          await fs.unlink(imagePath);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }
    }

    return await this.downloadAppSectionRepository.delete(id);
  }

  async updateImage(id, imageType, imageUrl) {
    const section = await this.downloadAppSectionRepository.findById(id);
    if (!section) {
      throw new Error('Download app section not found');
    }

    // Delete old image if exists
    const oldImageUrl = section[imageType];
    if (oldImageUrl && !oldImageUrl.startsWith('http')) {
      try {
        const oldImagePath = path.join(process.cwd(), 'public', oldImageUrl);
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    return await this.downloadAppSectionRepository.update(id, {
      [imageType]: imageUrl,
    });
  }

  async deleteImage(id, imageType) {
    const section = await this.downloadAppSectionRepository.findById(id);
    if (!section) {
      throw new Error('Download app section not found');
    }

    // Delete image file if exists
    const imageUrl = section[imageType];
    if (imageUrl && !imageUrl.startsWith('http')) {
      try {
        const imagePath = path.join(process.cwd(), 'public', imageUrl);
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image file:', error);
      }
    }

    // Update database to set image field to null
    return await this.downloadAppSectionRepository.update(id, {
      [imageType]: null,
    });
  }
}

export default DownloadAppSectionService;

