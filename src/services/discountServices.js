const Discount = require('../models/discountModel')
const DiscountCart = require('../models/discountCartModel')
const NumberId = require('../models/numberId')
const getDiscount = (discountId) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(discountId);
            const discount = await Discount.findOne({ discountId: discountId })

            resolve({
                status: "OK",
                message: "success",
                data: discount,
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getAllDiscount = (limit, page, sort, classify, status) => {
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

            const statusCondition = status ? { status: status } : {}
            const classifyCondition = classify ? { classify: classify } : {}

            const totalDiscount = await Discount.find({
                ...statusCondition,
                ...classifyCondition,

            })

            const allDiscount = await Discount.find({
                ...statusCondition,
                ...classifyCondition,
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)


            resolve({
                status: "OK",
                message: "success",
                data: allDiscount,
                total: totalDiscount.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalDiscount.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatDiscount = (newProdutc) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberDiscount = await NumberId.findOne({
                name: 'discount'
            })
            let discountId = 'ds'


            while ((discountId.length + (numberDiscount.numberId + 1).toString().length) < 10) discountId += '0'

            await NumberId.findOneAndUpdate({
                name: 'discount'
            }, {
                numberId: numberDiscount.numberId + 1
            })

            discountId += (numberDiscount.numberId + 1).toString()
            const { name, note, typeDiscount, classify, apply, value, status, startDay, endDay } = newProdutc
            const createDiscount = await Discount.create({
                name,
                discountId,
                note,
                typeDiscount,
                classify,
                apply,
                value,
                status,
                startDay,
                endDay
            })

            if (createDiscount) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createDiscount,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteDiscount = (discountId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const discount = await Discount.findOneAndDelete({ discountId: discountId })

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

const updateDiscount = (discountId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateDiscount = await Discount.findOneAndUpdate({ discountId: discountId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateDiscount
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getDiscountForUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const listHave = await DiscountCart.find({
                user: userId
            }).distinct('discount')

            const listDiscount = await Discount.find({
                _id: { $nin: listHave }
            })


            resolve({
                status: "OK",
                message: "success",
                data: listDiscount
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllDiscount,
    getDiscount,
    deleteDiscount,
    creatDiscount,
    updateDiscount,
    getDiscountForUser
}