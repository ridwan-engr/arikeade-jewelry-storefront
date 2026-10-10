import { Router } from 'express';
import multer from 'multer';
import { requireAdmin } from '../middleware/auth.js';
import cloudinary from '../config/cloudinary.js';

const router = Router();

const allowedTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif'
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 4
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedTypes.has(file.mimetype)) {
      return callback(new Error(
        'Unsupported image format. Use JPEG, PNG, WebP or AVIF.'
      ));
    }
    callback(null, true);
  }
});

function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'arikeade/products',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) {
          return reject(new Error('Cloudinary returned no secure image URL.'));
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          format: result.format
        });
      }
    );

    stream.end(file.buffer);
  });
}

router.post(
  '/images',
  requireAdmin,
  (req, res, next) => {
    upload.array('images', 4)(req, res, (error) => {
      if (error) {
        if (error instanceof multer.MulterError) {
          return res.status(400).json({
            message: error.code === 'LIMIT_FILE_SIZE'
              ? 'Each image must be 5 MB or smaller.'
              : 'Upload up to 4 images per request.'
          });
        }

        return res.status(400).json({
          message: error.message || 'Invalid image upload.'
        });
      }

      next();
    });
  },
  async (req, res) => {
    if (!req.files?.length) {
      return res.status(400).json({
        message: 'Select at least one image to upload.'
      });
    }

    try {
      const images = await Promise.all(
        req.files.map(uploadToCloudinary)
      );

      return res.status(201).json({ images });
    } catch (error) {
      console.error('Cloudinary image upload failed:', error.message);
      return res.status(502).json({
        message: 'Image upload failed. Please try again.'
      });
    }
  }
);

export default router;
