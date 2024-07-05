const Brand = require('../models/brandModel')
const Product = require('../models/productModel')
const NumberId = require('../models/numberId')
const cloudinary = require('../config/cloudinaryConfig');
const getAllBrand = (limit, page, sort, nation) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {}
            if (sort) {
                sortObj[sort[1]] = sort[0]
            }
            else {
                sortObj = {
                    createdAt: -1,
                    updatedAt: -1
                }
            }

            const nationCondititon = nation ? { nation: nation } : {}

            const totalBrand = await Brand.find({
                ...nationCondititon
            })

            const allBrand = await Brand.find({
                ...nationCondititon
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)

            let brandlist = []
            for (let brand of allBrand) {
                const products = await Product.find({ brand: brand._id }).limit(8)
                brandlist.push({
                    brand: brand,
                    item: products
                })

            }

            resolve({
                status: "OK",
                message: "success",
                data: brandlist,
                total: totalBrand.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalBrand.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getAllNation = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const nation = await Brand.find().distinct('nation')

            resolve({
                status: "OK",
                message: "success",
                data: nation,

            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatBrand = (newBrand) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberBrand = await NumberId.findOne({
                name: 'brand'
            })
            let brandId = 'br'


            while ((brandId.length + (numberBrand.numberId + 1).toString().length) < 10) brandId += '0'

            await NumberId.findOneAndUpdate({
                name: 'brand'
            }, {
                numberId: numberBrand.numberId + 1
            })

            brandId += (numberBrand.numberId + 1).toString()
            const { name, phone, email, website, nation, image } = newBrand
            const createBrand = await Brand.create({
                name,
                brandId,
                phone,
                email,
                website,
                nation,
                image
            })

            if (createBrand) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createBrand,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getBrand = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(brandId);
            const brand = await Brand.findOne({ brandId: brandId })

            resolve({
                status: "OK",
                message: "success",
                data: brand,

            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteBrand = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brandDelete = await Brand.findOne({ brandId: brandId })

            for (let image of brandDelete.image) {
                const result = await cloudinary.uploader.destroy(image.publicId);
            }
            const brand = await Brand.findOneAndDelete({ brandId: brandId })

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

const updateBrand = (brandId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateBrand = await Brand.findOneAndUpdate({ brandId: brandId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateBrand
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllBrand,
    getAllNation,
    creatBrand,
    getBrand,
    deleteBrand,
    updateBrand
}