const ShoppingCart = require('../models/shoppingCartModel')
const NumberId = require('../models/numberId')

const getAllShoppingCart = (limit, page, sort, userId) => {
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

            const userCondititon = userId ? { user: userId } : {}

            const totalShoppingCart = await ShoppingCart.find({
                ...userCondititon
            })

            const allShoppingCart = await ShoppingCart.find({
                ...userCondititon
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)
                .populate('user')
                .populate('product')
                .populate({
                    path: 'version',
                    populate: [
                        { path: 'size' },
                        { path: 'color' },
                    ],
                })


            resolve({
                status: "OK",
                message: "success",
                data: allShoppingCart,
                total: totalShoppingCart.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalShoppingCart.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatShoppingCart = (newShoppingCart) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberShoppingCart = await NumberId.findOne({
                name: 'shoppingCart'
            })
            let shoppingCartId = 'sh'


            while ((shoppingCartId.length + (numberShoppingCart.numberId + 1).toString().length) < 12) shoppingCartId += '0'

            await NumberId.findOneAndUpdate({
                name: 'shoppingCart'
            }, {
                numberId: numberShoppingCart.numberId + 1
            })

            shoppingCartId += (numberShoppingCart.numberId + 1).toString()
            const { user, quantity, product, version } = newShoppingCart
            const createShoppingCart = await ShoppingCart.create({
                shoppingCartId,
                user,
                quantity,
                product,
                version
            })

            if (createShoppingCart) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createShoppingCart,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteShoppingCart = (shoppingCartId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const shoppingCart = await ShoppingCart.findOneAndDelete({ shoppingCartId: shoppingCartId })

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

const updateShoppingCart = (shoppingCartId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateShoppingCart = await ShoppingCart.findOneAndUpdate({ shoppingCartId: shoppingCartId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateShoppingCart
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllShoppingCart,
    creatShoppingCart,
    deleteShoppingCart,
    updateShoppingCart
}