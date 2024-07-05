const Version = require('../models/versionModel')
const Color = require('../models/colorModel')
const Size = require('../models/sizeModel')
const NumberId = require('../models/numberId')
const getAllVersion = (limit, page, sort, productId, color, size) => {
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

            const productIdCondition = productId ? { productId: productId } : {}
            const colorCondition = color ? { color: color } : {}
            const sizeCondition = size ? { size: size } : {}

            const totalVersion = await Version.find({
                ...productIdCondition,
                ...sizeCondition,
                ...colorCondition

            })

            const allVersion = await Version.find({
                ...productIdCondition,
                ...sizeCondition,
                ...colorCondition

            }).limit(limit).skip((page - 1) * limit).sort(sortObj).populate('size').populate('color')


            resolve({
                status: "OK",
                message: "success",
                data: allVersion,
                total: totalVersion.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalVersion.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getAllSize = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSize = await Version.find({ productId: productId }).distinct('size')
            const sizeList = await Size.find({ _id: allSize }).sort({
                name: 1
            })
            resolve({
                status: "OK",
                message: "success",
                data: sizeList,
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getAllColor = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allSize = await Version.find({ productId: productId }).distinct('color')
            const ColorList = await Color.find({ _id: allSize }).sort({
                name: 1
            })
            resolve({
                status: "OK",
                message: "success",
                data: ColorList,
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const addVersion = (newVersion) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberVerison = await NumberId.findOne({
                name: 'version'
            })
            let versionId = 've'

            while ((versionId.length + (numberVerison.numberId + 1).toString().length) < 10) versionId += '0'

            await NumberId.findOneAndUpdate({
                name: 'version'
            }, {
                numberId: numberVerison.numberId + 1
            })

            versionId += (numberVerison.numberId + 1).toString()
            const { productId, size, color } = newVersion
            const createVersison = await Version.create({
                versionId,
                productId,
                size,
                color,
                inStock: 5
            })
            if (createVersison) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createVersison,
                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteVersion = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await Version.deleteMany({ productId: productId })
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
    getAllVersion,
    getAllSize,
    getAllColor,
    addVersion,
    deleteVersion
}