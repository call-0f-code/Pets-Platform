//path: Backend/utils/cloudinaryUpload.js
import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer, folder = "pet_documents") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
        folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

export default uploadToCloudinary;