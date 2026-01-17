export class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  getAll = async (req, res, next) => {
    try {
      const filters = {
        page: req.query.page || 1,
        limit: req.query.limit || 12,
        search: req.query.search || '',
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        categoryIds: req.query.categoryIds ? (Array.isArray(req.query.categoryIds) ? req.query.categoryIds : [req.query.categoryIds]) : [],
        productTypeIds: req.query.productTypeIds ? (Array.isArray(req.query.productTypeIds) ? req.query.productTypeIds : [req.query.productTypeIds]) : [],
        brandLogoIds: req.query.brandLogoIds ? (Array.isArray(req.query.brandLogoIds) ? req.query.brandLogoIds : [req.query.brandLogoIds]) : [],
        colorIds: req.query.colorIds ? (Array.isArray(req.query.colorIds) ? req.query.colorIds : [req.query.colorIds]) : [],
        countryIds: req.query.countryIds ? (Array.isArray(req.query.countryIds) ? req.query.countryIds : [req.query.countryIds]) : [],
        yearIds: req.query.yearIds ? (Array.isArray(req.query.yearIds) ? req.query.yearIds : [req.query.yearIds]) : [],
        sortBy: req.query.sortBy || 'order',
        sortOrder: req.query.sortOrder || 'asc',
      };

      const result = await this.productService.getAllProducts(filters);
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getActive = async (req, res, next) => {
    try {
      const filters = {
        page: req.query.page || 1,
        limit: req.query.limit || 12,
        search: req.query.search || '',
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        categoryIds: req.query.categoryIds ? (Array.isArray(req.query.categoryIds) ? req.query.categoryIds : [req.query.categoryIds]) : [],
        productTypeIds: req.query.productTypeIds ? (Array.isArray(req.query.productTypeIds) ? req.query.productTypeIds : [req.query.productTypeIds]) : [],
        brandLogoIds: req.query.brandLogoIds ? (Array.isArray(req.query.brandLogoIds) ? req.query.brandLogoIds : [req.query.brandLogoIds]) : [],
        colorIds: req.query.colorIds ? (Array.isArray(req.query.colorIds) ? req.query.colorIds : [req.query.colorIds]) : [],
        countryIds: req.query.countryIds ? (Array.isArray(req.query.countryIds) ? req.query.countryIds : [req.query.countryIds]) : [],
        yearIds: req.query.yearIds ? (Array.isArray(req.query.yearIds) ? req.query.yearIds : [req.query.yearIds]) : [],
        sortBy: req.query.sortBy || 'order',
        sortOrder: req.query.sortOrder || 'asc',
      };

      const result = await this.productService.getActiveProducts(filters);
      res.status(200).json({
        success: true,
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  getSimilarProducts = async (req, res, next) => {
    try {
      const { id } = req.params;
      const limit = parseInt(req.query.limit) || 4;
      const similarProducts = await this.productService.getSimilarProducts(id, limit);
      res.status(200).json({
        success: true,
        data: similarProducts,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const files = req.files || {};
      const imageFiles = files.images || [];
      const imageUrls = imageFiles.length > 0 
        ? imageFiles.map(file => `/uploads/${file.filename}`)
        : (req.body.imageUrls ? JSON.parse(req.body.imageUrls) : []);
      
      const firstImageUrl = imageUrls.length > 0 ? imageUrls[0] : req.body.imageUrl || '';
      
      // Handle media file upload
      let mediaUrl = req.body.mediaUrl || null;
      let mediaType = req.body.mediaType || null;
      const mediaFile = files.mediaFile ? files.mediaFile[0] : null;
      if (mediaFile) {
        mediaUrl = `/uploads/${mediaFile.filename}`;
        // Determine media type from file extension
        const ext = mediaFile.originalname.split('.').pop().toLowerCase();
        mediaType = ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext) ? 'video' : 'image';
      }

      // Handle technical data sheet file upload
      let technicalDataSheetUrl = req.body.technicalDataSheetUrl || null;
      const technicalDataSheetFile = files.technicalDataSheet ? files.technicalDataSheet[0] : null;
      if (technicalDataSheetFile) {
        technicalDataSheetUrl = `/uploads/${technicalDataSheetFile.filename}`;
      }

      // Handle catalog file upload
      let catalogUrl = req.body.catalogUrl || null;
      const catalogFile = files.catalog ? files.catalog[0] : null;
      if (catalogFile) {
        catalogUrl = `/uploads/${catalogFile.filename}`;
      }
      
      const productData = {
        titleEn: req.body.titleEn,
        titleAr: req.body.titleAr,
        descriptionEn: req.body.descriptionEn || null,
        descriptionAr: req.body.descriptionAr || null,
        imageUrl: firstImageUrl,
        imageUrls: imageUrls,
        price: req.body.price,
        oldPrice: req.body.oldPrice || null,
        availability: req.body.availability ? parseInt(req.body.availability) : null,
        warranty: req.body.warranty || null,
        detailedDescriptionEn: req.body.detailedDescriptionEn || null,
        detailedDescriptionAr: req.body.detailedDescriptionAr || null,
        mediaUrl: mediaUrl,
        mediaType: mediaType,
        technicalDataSheetUrl: technicalDataSheetUrl,
        catalogUrl: catalogUrl,
        similarProductIds: req.body.similarProductIds ? JSON.parse(req.body.similarProductIds) : [],
        categoryId: req.body.categoryId && req.body.categoryId !== '' ? req.body.categoryId : null,
        productTypeId: req.body.productTypeId || null,
        brandLogoId: req.body.brandLogoId || null,
        colorIds: req.body.colorIds ? JSON.parse(req.body.colorIds) : [],
        countryId: req.body.countryId && req.body.countryId !== '' ? req.body.countryId : null,
        yearId: req.body.yearId && req.body.yearId !== '' ? req.body.yearId : null,
        year: req.body.year && req.body.year !== '' ? req.body.year : null,
        technicalSpecs: req.body.technicalSpecs ? JSON.parse(req.body.technicalSpecs) : [],
        order: parseInt(req.body.order) || 0,
        isActive: req.body.isActive === 'true' || req.body.isActive === true,
      };

      const product = await this.productService.createProduct(productData);
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const files = req.files || {};
      const imageFiles = files.images || [];
      const updateData = {};

      if (req.body.titleEn !== undefined) updateData.titleEn = req.body.titleEn;
      if (req.body.titleAr !== undefined) updateData.titleAr = req.body.titleAr;
      if (req.body.descriptionEn !== undefined) updateData.descriptionEn = req.body.descriptionEn || null;
      if (req.body.descriptionAr !== undefined) updateData.descriptionAr = req.body.descriptionAr || null;
      if (req.body.price !== undefined) updateData.price = req.body.price;
      if (req.body.oldPrice !== undefined) updateData.oldPrice = req.body.oldPrice || null;
      if (req.body.availability !== undefined) updateData.availability = req.body.availability ? parseInt(req.body.availability) : null;
      if (req.body.warranty !== undefined) updateData.warranty = req.body.warranty || null;
      if (req.body.detailedDescriptionEn !== undefined) updateData.detailedDescriptionEn = req.body.detailedDescriptionEn || null;
      if (req.body.detailedDescriptionAr !== undefined) updateData.detailedDescriptionAr = req.body.detailedDescriptionAr || null;
      if (req.body.mediaUrl !== undefined) updateData.mediaUrl = req.body.mediaUrl || null;
      if (req.body.mediaType !== undefined) updateData.mediaType = req.body.mediaType || null;
      if (req.body.similarProductIds !== undefined) updateData.similarProductIds = req.body.similarProductIds ? JSON.parse(req.body.similarProductIds) : [];
      if (req.body.categoryId !== undefined) updateData.categoryId = req.body.categoryId && req.body.categoryId !== '' ? req.body.categoryId : null;
      if (req.body.productTypeId !== undefined) updateData.productTypeId = req.body.productTypeId || null;
      if (req.body.brandLogoId !== undefined) updateData.brandLogoId = req.body.brandLogoId || null;
      if (req.body.colorIds !== undefined) updateData.colorIds = req.body.colorIds ? JSON.parse(req.body.colorIds) : [];
      if (req.body.countryId !== undefined) updateData.countryId = req.body.countryId && req.body.countryId !== '' ? req.body.countryId : null;
      if (req.body.yearId !== undefined) updateData.yearId = req.body.yearId && req.body.yearId !== '' ? req.body.yearId : null;
      if (req.body.year !== undefined) updateData.year = req.body.year && req.body.year !== '' ? req.body.year : null;
      if (req.body.order !== undefined) updateData.order = parseInt(req.body.order);
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === 'true' || req.body.isActive === true;

      // Handle multiple image uploads
      // imageUrls from body represents the final list of images that should exist (after deletions)
      // New file uploads should be merged with this list
      let finalImageUrls = [];
      
      if (req.body.imageUrls !== undefined) {
        finalImageUrls = req.body.imageUrls ? JSON.parse(req.body.imageUrls) : [];
      }
      
      // If new files are uploaded, add their URLs to the final list
      if (imageFiles.length > 0) {
        const newImageUrls = imageFiles.map(file => `/uploads/${file.filename}`);
        // Merge new images with existing ones (avoid duplicates)
        finalImageUrls = [...finalImageUrls, ...newImageUrls.filter(url => !finalImageUrls.includes(url))];
      }
      
      // Set the final image list and main image
      if (finalImageUrls.length > 0) {
        updateData.imageUrls = finalImageUrls;
        updateData.imageUrl = finalImageUrls[0]; // First image is the main one
      } else if (req.body.imageUrl !== undefined) {
        // If no images but imageUrl is provided, use it
        updateData.imageUrl = req.body.imageUrl || '';
        updateData.imageUrls = [];
      }

      // Handle media file upload (video or image)
      const mediaFile = files.mediaFile ? files.mediaFile[0] : null;
      if (mediaFile) {
        updateData.mediaUrl = `/uploads/${mediaFile.filename}`;
        // Determine media type from file extension
        const ext = mediaFile.originalname.split('.').pop().toLowerCase();
        updateData.mediaType = ['mp4', 'webm', 'ogg', 'mov', 'avi'].includes(ext) ? 'video' : 'image';
      } else if (req.body.mediaUrl !== undefined) {
        // If mediaUrl is provided directly (from form or existing)
        updateData.mediaUrl = req.body.mediaUrl || null;
        updateData.mediaType = req.body.mediaType || null;
      }

      // Handle technical data sheet file upload
      const technicalDataSheetFile = files.technicalDataSheet ? files.technicalDataSheet[0] : null;
      if (technicalDataSheetFile) {
        updateData.technicalDataSheetUrl = `/uploads/${technicalDataSheetFile.filename}`;
      } else if (req.body.technicalDataSheetUrl !== undefined) {
        updateData.technicalDataSheetUrl = req.body.technicalDataSheetUrl || null;
      }

      // Handle catalog file upload
      const catalogFile = files.catalog ? files.catalog[0] : null;
      if (catalogFile) {
        updateData.catalogUrl = `/uploads/${catalogFile.filename}`;
      } else if (req.body.catalogUrl !== undefined) {
        updateData.catalogUrl = req.body.catalogUrl || null;
      }

      // Handle technical specs
      if (req.body.technicalSpecs !== undefined) {
        updateData.technicalSpecs = req.body.technicalSpecs ? JSON.parse(req.body.technicalSpecs) : [];
      }

      const product = await this.productService.updateProduct(id, updateData);
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  };

  getFilterOptions = async (req, res, next) => {
    try {
      const options = await this.productService.getFilterOptions();
      res.status(200).json({
        success: true,
        data: options,
      });
    } catch (error) {
      next(error);
    }
  };

  getPageSettings = async (req, res, next) => {
    try {
      const settings = await this.productService.getPageSettings();
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePageSettings = async (req, res, next) => {
    try {
      const file = req.file;
      const updateData = {
        heroTitleEn: req.body.heroTitleEn,
        heroTitleAr: req.body.heroTitleAr,
      };
      
      // Only update image if a new file is uploaded
      if (file) {
        updateData.heroImageUrl = `/uploads/${file.filename}`;
      } else if (req.body.heroImageUrl !== undefined) {
        // Allow updating imageUrl from body if no file is uploaded
        updateData.heroImageUrl = req.body.heroImageUrl || null;
      }
      
      const settings = await this.productService.updatePageSettings(updateData);
      res.status(200).json({
        success: true,
        data: settings,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
