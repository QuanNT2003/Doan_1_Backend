const Import = require('../models/importModel')
const Version = require('../models/versionModel')
const NumberId = require('../models/numberId')
const getAllImport = (limit, page, sort) => {
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


            const totalImport = await Import.find({

            })

            const allImport = await Import.find({
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)
                .populate('product')
                .populate({
                    path: 'item',
                    populate: [
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })



            resolve({
                status: "OK",
                message: "success",
                data: allImport,
                total: totalImport.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalImport.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatImport = (newImport) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberImport = await NumberId.findOne({
                name: 'import'
            })
            let importId = 'ip'


            while ((importId.length + (numberImport.numberId + 1).toString().length) < 10) importId += '0'

            await NumberId.findOneAndUpdate({
                name: 'import'
            }, {
                numberId: numberImport.numberId + 1
            })

            importId += (numberImport.numberId + 1).toString()
            const { product, item, totalQuantity, totalCost } = newImport
            const createImport = await Import.create({
                importId,
                product,
                item,
                totalQuantity,
                totalCost
            })

            if (createImport) {
                for (let versison of createImport.item) {
                    const upVersion = await Version.findOne({ _id: versison.version })
                    const result = await Version.findOneAndUpdate({ versionId: upVersion.versionId }, {
                        inStock: upVersion.inStock + versison.quantity
                    }, { new: true })
                }

                resolve({
                    status: "OK",
                    message: "success",
                    data: createImport,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getDetailImport = (importId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const brand = await Import.findOne({ importId: importId })
                .populate({
                    path: 'product',
                    populate: [
                        'brand',
                        'category' // Populate version, size, and color
                    ],
                })
                .populate({
                    path: 'item',
                    populate: [
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })

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

module.exports = {
    creatImport,
    getAllImport,
    getDetailImport
}