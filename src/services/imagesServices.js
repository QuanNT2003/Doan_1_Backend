const cloudinary = require('../config/cloudinaryConfig');

const uploadImages = (images) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resultImage = []

            for (let image of images) {
                await cloudinary.uploader.upload(image, { folder: 'shoe_shop' }, (error, result) => {
                    if (error) {
                        return res.status(500).send(error);
                    }
                    if (result) {
                        resultImage.push({
                            publicId: result.public_id,
                            url: result.url
                        })
                    }
                });


            }
            resolve({
                status: "OK",
                message: "success",
                data: resultImage,

            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteImages = (publicId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const result = await cloudinary.uploader.destroy(publicId);
            resolve({
                status: "OK",
                message: "success",


            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    uploadImages,
    deleteImages
}