const Return = require('../models/returnModel')
const User = require('../models/userModel')
const NumberId = require('../models/numberId')
const Version = require('../models/versionModel')
const DiscountCart = require('../models/discountCartModel')
const OrderProgress = require('../models/orderProgressModel')
const Notifi = require('../models/notifiModel')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Sử dụng TLS
    auth: {
        user: 'tqshoeshop@gmail.com',
        pass: 'batsqmwltrruuqwb'
    }
});

const getAllReturn = (limit, page, sort, user, status) => {
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
            const totalReturn = await Return.find({
                ...userCondititon,
                ...statusCondititon
            })

            const allReturn = await Return.find({
                ...userCondititon,
                ...statusCondititon
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)
                .populate('user')  // Populate user details
                .populate({
                    path: 'returnItem',
                    populate: [
                        { path: 'product', populate: ['brand', 'category'] },
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })  // Populate item details, product, version, size, and color
                .populate({
                    path: 'exchangeItem',
                    populate: [
                        { path: 'product', populate: ['brand', 'category'] },
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })


            resolve({
                status: "OK",
                message: "success",
                data: allReturn,
                total: totalReturn.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalReturn.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getDetailReturn = (returnId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allReturn = await Return.findOne({
                returnId: returnId
            })
                .populate('user')  // Populate user details
                .populate({
                    path: 'returnItem',
                    populate: [
                        { path: 'product', populate: ['brand', 'category'] },
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })  // Populate item details, product, version, size, and color
                .populate({
                    path: 'exchangeItem',
                    populate: [
                        { path: 'product', populate: ['brand', 'category'] },
                        { path: 'version', populate: ['size', 'color'] }, // Populate version, size, and color
                    ],
                })


            resolve({
                status: "OK",
                message: "success",
                data: allReturn,
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
            const allReturn = await Return.find()
                .distinct('user')  // Populate user details

            let allUser = []
            for (let Return of allReturn) {
                allUser.push(await User.findById(Return))
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

const creatReturn = (newReturn) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberReturn = await NumberId.findOne({
                name: 'return'
            })
            let returnId = 'rt'


            while ((returnId.length + (numberReturn.numberId + 1).toString().length) < 10) returnId += '0'

            await NumberId.findOneAndUpdate({
                name: 'return'
            }, {
                numberId: numberReturn.numberId + 1
            })

            returnId += (numberReturn.numberId + 1).toString()
            const { user, status, orderId, exchange, returnItem, exchangeItem } = newReturn
            const createReturn = await Return.create({
                returnId,
                user,
                status,
                orderId,
                exchange,
                returnItem,
                exchangeItem
            })

            if (createReturn) {

                resolve({
                    status: "OK",
                    message: "success",
                    data: createReturn,

                })
            }


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const updateReturn = (returnId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const returnOrder = await Return.findOne({ returnId: returnId }).populate('user')
            const updateReturn = await Return.findOneAndUpdate({ returnId: returnId }, obj, { new: true })


            let string = ''
            let title = ''

            if (updateReturn.status === 'received') {
                string = 'đã được tiếp nhận'
                title = 'Tiếp nhận'
            }
            else if (updateReturn.status === 'delivering') {
                string = 'đang được vận chuyển'
                title = 'Đang giao'
            }
            else if (updateReturn.status === 'delivered') {
                string = 'đã được giao'
                title = 'Đã giao'
            }
            else if (updateReturn.status === 'cancelled') {
                string = 'đã hủy. Lý do : ' + updateReturn.note
                title = 'Đã hủy'
            }

            if (returnOrder.status !== updateReturn.status) {
                mailOptions = {
                    from: 'AdminTQShop <tqshoeshop@gmail.com>',
                    to: returnOrder.user.email,
                    subject: 'Cập nhật đơn hoàn hàng',
                    html: `<p>Đơn hoàn trả hàng của bạn ${string}</p> `
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        resolve({
                            data: otp
                        });
                    }
                });


                const result = await OrderProgress.create({
                    returnId: returnId,
                    title: title,
                    note: "Đơn hoàn trả hàng của bạn " + string
                })

                const notifi = await Notifi.create({
                    userId: returnOrder.user.userId,
                    note: "Đơn hoàn trả hàng #" + returnOrder._id + " " + string
                })
            }

            if (updateReturn.status === 'delivered') {

                const upVersion = await Version.findById(updateReturn.returnItem.version)
                const result = await Version.findOneAndUpdate({ versionId: upVersion.versionId }, {
                    inStock: upVersion.inStock + updateReturn.returnItem.quantity
                }, { new: true })

                if (updateReturn.exchange === true) {
                    const upVersion = await Version.findById(updateReturn.exchangeItem.version)
                    const result = await Version.findOneAndUpdate({ versionId: upVersion.versionId }, {
                        inStock: upVersion.inStock - updateReturn.exchangeItem.quantity
                    }, { new: true })
                }
            }


            resolve({
                status: "OK",
                message: "success",
                data: updateReturn
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllReturn,
    getDetailReturn,
    creatReturn,
    updateReturn,
    getUser
}