const Order = require('../models/orderModel')
const User = require('../models/userModel')
const NumberId = require('../models/numberId')
const Version = require('../models/versionModel')
const DiscountCart = require('../models/discountCartModel')
const EmailService = require('./emailService')


const getAllOrder = (limit, page, sort, user, status) => {
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

            const userCondititon = user ? { user: user } : {}
            const statusCondititon = status ? { status: status } : {}
            const totalOrder = await Order.find({
                ...userCondititon,
                ...statusCondititon
            })

            const allOrder = await Order.find({
                ...userCondititon,
                ...statusCondititon
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)
                .populate('user')  // Populate user details
                .populate({
                    path: 'item',
                    populate: [
                        { path: 'product', populate: ['brand', 'category'] },
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })  // Populate item details, product, version, size, and color
                .populate('saleOff.voucherSaleOff')  // Populate saleOff discount
                .populate('ship.voucherShip')  // Populate ship discount
                .populate('payment.voucherPayment')


            resolve({
                status: "OK",
                message: "success",
                data: allOrder,
                total: totalOrder.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalOrder.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getDetailOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.findOne({
                orderId: orderId
            })
                .populate('user')  // Populate user details
                .populate({
                    path: 'item',
                    populate: [
                        { path: 'product', populate: ['brand', 'category'] },
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })  // Populate item details, product, version, size, and color
                .populate('saleOff.voucherSaleOff')  // Populate saleOff discount
                .populate('ship.voucherShip')  // Populate ship discount
                .populate('payment.voucherPayment')


            resolve({
                status: "OK",
                message: "success",
                data: allOrder,
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find()
                .distinct('user')  // Populate user details

            let allUser = []
            for (let order of allOrder) {
                allUser.push(await User.findById(order))
            }


            resolve({
                status: "OK",
                message: "success",
                data: allUser,
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberOrder = await NumberId.findOne({
                name: 'order'
            })
            let orderId = 'or'


            while ((orderId.length + (numberOrder.numberId + 1).toString().length) < 10) orderId += '0'

            await NumberId.findOneAndUpdate({
                name: 'order'
            }, {
                numberId: numberOrder.numberId + 1
            })

            orderId += (numberOrder.numberId + 1).toString()
            const { user, note, address, phone, email, item, saleOff, ship, payment, status } = newOrder
            const createOrder = await Order.create({
                orderId,
                user,
                note,
                address,
                phone,
                email,
                item,
                saleOff,
                ship,
                payment,
                status
            })

            if (createOrder) {
                for (let versison of createOrder.item) {
                    const upVersion = await Version.findOne({ _id: versison.version })
                    const result = await Version.findOneAndUpdate({ versionId: upVersion.versionId }, {
                        inStock: upVersion.inStock - versison.quantity
                    }, { new: true })
                }
                if (createOrder.saleOff.voucherSaleOff) {
                    const result = await DiscountCart.findOneAndUpdate({
                        user: createOrder.user,
                        discount: createOrder.saleOff.voucherSaleOff
                    },
                        {
                            isUse: true
                        },
                        {
                            new: true
                        }
                    )
                }
                if (createOrder.ship.voucherShip) {
                    const result = await DiscountCart.findOneAndUpdate({
                        user: createOrder.user,
                        discount: createOrder.ship.voucherShip
                    },
                        {
                            isUse: true
                        },
                        {
                            new: true
                        }
                    )
                }
                if (createOrder.payment.voucherPayment) {
                    const result = await DiscountCart.findOneAndUpdate({
                        user: createOrder.user,
                        discount: createOrder.payment.voucherPayment
                    },
                        {
                            isUse: true
                        },
                        {
                            new: true
                        }
                    )
                }
                resolve({
                    status: "OK",
                    message: "success",
                    data: createOrder,

                })
            }


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const updateOrder = (orderId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({ orderId: orderId }).populate('user')
            const updateOrder = await Order.findOneAndUpdate({ orderId: orderId }, obj, { new: true })

            if (order.status !== updateOrder.status) {
                EmailService.sendEmail(updateOrder, 'Cập nhật đơn hàng', 'Đơn hàng')
            }

            if (updateOrder.status === 'cancelled') {
                for (let versison of updateOrder.item) {
                    const upVersion = await Version.findOne({ _id: versison.version })
                    const result = await Version.findOneAndUpdate({ versionId: upVersion.versionId }, {
                        inStock: upVersion.inStock + versison.quantity
                    }, { new: true })
                }
            }


            resolve({
                status: "OK",
                message: "success",
                data: updateOrder
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllOrder,
    getDetailOrder,
    getUser,
    creatOrder,
    updateOrder
}