const DiscountCart = require('../models/discountCartModel')
const NumberId = require('../models/numberId')
const getAllDiscountCart = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {
                createdAt: -1,
                updatedAt: -1
            }


            const userCondititon = userId ? { user: userId } : {}

            const allDiscountCart = await DiscountCart.find({
                ...userCondititon,
                isUse: false
            }).sort(sortObj).populate('discount')

            let pay = allDiscountCart.filter((item) => item.discount.classify === 'pay')
            let ship = allDiscountCart.filter((item) => item.discount.classify === 'ship')
            let sale = allDiscountCart.filter((item) => item.discount.classify === 'sale')
            resolve({
                status: "OK",
                message: "success",
                sale: sale,
                pay: pay,
                ship: ship
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatDiscountCart = (newProdutc) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberDiscountCart = await NumberId.findOne({
                name: 'discountCart'
            })
            let discountCartId = 'ds'


            while ((discountCartId.length + (numberDiscountCart.numberId + 1).toString().length) < 12) discountCartId += '0'

            await NumberId.findOneAndUpdate({
                name: 'discountCart'
            }, {
                numberId: numberDiscountCart.numberId + 1
            })

            discountCartId += (numberDiscountCart.numberId + 1).toString()
            const { user, discount } = newProdutc
            const createDiscountCart = await DiscountCart.create({
                discountCartId,
                user,
                discount
            })

            if (createDiscountCart) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createDiscountCart,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    getAllDiscountCart,
    creatDiscountCart
}