
const cloudinary = require('cloudinary').v2;

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload gambar ke Cloudinary
 * @param {Buffer} fileBuffer - Buffer gambar dari multer
 * @returns {Promise<string|null>} - URL gambar
 */

//fungsi convert buffer ke base64
async function uploadImage(fileBuffer) {
  if (!fileBuffer) return null;

  try {
    // Convert buffer ke base64
    const base64Image = `data:image/jpeg;base64,${fileBuffer.toString('base64')}`;

    // Upload ke Cloudinary
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'saling-jaga', // Folder di Cloudinary
      resource_type: 'auto'  // Auto detect tipe file
    });

    console.log('Image uploaded to Cloudinary:', result.secure_url);
    

    return result.secure_url;

  } catch (error) {
    console.error('Error uploading to Cloudinary:', error.message);
    return null;
  }
}

module.exports = { uploadImage };