export class UploadController {
  uploadImage = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      
      res.status(200).json({
        success: true,
        data: {
          url: fileUrl,
          filename: req.file.filename,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

export default UploadController;
