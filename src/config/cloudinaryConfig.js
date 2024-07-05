const cloudinary = require('cloudinary').v2;

// Thay thế bằng thông tin của bạn từ Cloudinary Dashboard
cloudinary.config({
    cloud_name: "djsidnerl",
    api_key: "177439736951965",
    api_secret: 'aTU5ztrvUvDHm6tSybqePylSq8I',
});

module.exports = cloudinary;