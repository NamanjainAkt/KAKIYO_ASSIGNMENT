import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFileToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = buffer.toString('base64');
  const mimeType = file.type || 'image/png';
  
  const uploadResponse = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Image}`, {
    folder: 'kakiyo_prospects',
  });
  return uploadResponse.secure_url;
}
