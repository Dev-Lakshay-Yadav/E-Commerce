import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer'

cloudinary.config({
  cloud_name: "dzmngkef1",
  api_key: "193682469366285",
  api_secret: "0tnYqfcQ5t-jlYZFMKHK0aTCGGc",
});

const storage = new multer.memoryStorage();

export async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto", 
  });
  return result;
}

export const upload = multer({ storage });