const Product = require('../models/productModel')
const NumberId = require('../models/numberId')
const cloudinary = require('../config/cloudinaryConfig');
const VersionServices = require('./versionServices')
const getProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const product = await Product.findOne({ productId: productId }).populate('brand').populate('category')

            resolve({
                status: "OK",
                message: "success",
                data: product,
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const getAllProduct = (limit, page, sort, brand, category, search, classify, min, max) => {
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

            const brandCondition = brand ? { brand: brand } : {}
            const categoryCondition = category ? { category: category } : {}
            const searchCondition = search ? { name: new RegExp(search, 'i') } : {}
            const classifyCondition = classify ? { classify: classify } : {}
            const priceCondition = (max && max !== 0) ? {
                $and: [{ price: { $gt: min } }, { price: { $lt: max } }]
            } : {}

            const totalProduct = await Product.find({
                ...brandCondition,
                ...categoryCondition,
                ...classifyCondition,
                ...searchCondition,
                ...priceCondition,
            })

            const allProduct = await Product.find({
                ...brandCondition,
                ...categoryCondition,
                ...classifyCondition,
                ...searchCondition,
                ...priceCondition,
            }).limit(limit).skip((page - 1) * limit).sort(sortObj).populate('brand').populate('category')


            resolve({
                status: "OK",
                message: "success",
                data: allProduct,
                total: totalProduct.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalProduct.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const creatProduct = (newProdutc) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberProduct = await NumberId.findOne({
                name: 'product'
            })
            let productId = 'pr'


            while ((productId.length + (numberProduct.numberId + 1).toString().length) < 10) productId += '0'

            await NumberId.findOneAndUpdate({
                name: 'product'
            }, {
                numberId: numberProduct.numberId + 1
            })

            productId += (numberProduct.numberId + 1).toString()
            const { name, description, cost, price, star, classify, discount, category, brand, images, sizes, colors } = newProdutc
            const createProduct = await Product.create({
                name,
                productId,
                description,
                cost,
                price,
                star,
                classify,
                discount,
                category,
                brand,
                images
            })

            if (createProduct) {
                for (let colorItem of colors) {
                    for (let sizeItem of sizes) {
                        const result = await VersionServices.addVersion({
                            productId: createProduct.productId,
                            size: sizeItem.value,
                            color: colorItem.value
                        })
                    }
                }
                resolve({
                    status: "OK",
                    message: "success",
                    data: createProduct,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const productNeedDelete = await Product.findOne({ productId: productId })

            for (let image of productNeedDelete.images) {
                const result = await cloudinary.uploader.destroy(image.publicId);
            }
            const version = await VersionServices.deleteVersion(productId)
            const product = await Product.findOneAndDelete({ productId: productId })

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

const updateProduct = (productId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateProduct = await Product.findOneAndUpdate({ productId: productId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateProduct
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getRelatedProducts = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const product = await Product.findOne({ productId: productId })

            relatedList = await Product.find({
                productId: { $ne: productId },
                $or: [
                    { classify: product.classify },
                    { brand: product.brand },
                    { category: product.category }
                ]
            }).limit(8)
            resolve({
                status: "OK",
                message: "success",
                data: relatedList,
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllProduct,
    getProduct,
    deleteProduct,
    creatProduct,
    updateProduct,
    getRelatedProducts
}