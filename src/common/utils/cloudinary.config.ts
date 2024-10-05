import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ENVIRONMENT } from '../configs/environment';

cloudinary.config(ENVIRONMENT.CLOUDINARY.CLOUDINARY_URL);

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // @ts-ignore
    folder: 'merch',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

export async function uploadImage(file): Promise<any> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      })
      .end(file.buffer);
  });
}
