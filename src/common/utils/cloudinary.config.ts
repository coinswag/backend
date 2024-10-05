import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ENVIRONMENT } from '../configs/environment';

console.log(ENVIRONMENT.CLOUDINARY.CLOUDINARY_URL);

try {
  const cloudinaryConfig = cloudinary.config({
    cloud_name: ENVIRONMENT.CLOUDINARY.CLOUD_NAME,
    api_key: ENVIRONMENT.CLOUDINARY.API_KEY,
    api_secret: ENVIRONMENT.CLOUDINARY.API_SECRET,
  });
  if (
    !cloudinaryConfig.cloud_name ||
    !cloudinaryConfig.api_key ||
    !cloudinaryConfig.api_secret
  ) {
    throw new Error('Cloudinary configuration is incomplete');
  }
} catch (error) {
  console.error('Error configuring Cloudinary:', error);
  process.exit(1); // Exit the application if Cloudinary can't be configured
}

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'merch',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  } as any, // Use 'as any' instead of @ts-ignore if type issues persist
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
