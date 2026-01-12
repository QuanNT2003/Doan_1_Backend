const cloudinary = require("cloudinary").v2;

// Thay thế bằng thông tin của bạn từ Cloudinary Dashboard
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
