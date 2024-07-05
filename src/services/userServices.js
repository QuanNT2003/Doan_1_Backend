const User = require('../models/userModel')
const NumberId = require('../models/numberId')
const cloudinary = require('../config/cloudinaryConfig');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator')
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Sử dụng TLS
    auth: {
        user: 'tqshoeshop@gmail.com',
        pass: 'batsqmwltrruuqwb'
    }
});

const getUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await User.findOne({ userId: userId })

            resolve({
                status: "OK",
                message: "success",
                data: user,
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const getAllUser = (limit, page, sort, active, search) => {
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

            const activeCondition = active ? { active: active } : {}
            const searchCondition = search ? { name: new RegExp(search, 'i') } : {}

            const totalUser = await User.find({
                ...activeCondition,
                ...searchCondition

            })

            const allUser = await User.find({
                ...activeCondition,
                ...searchCondition

            }).limit(limit).skip((page - 1) * limit).sort(sortObj)


            resolve({
                status: "OK",
                message: "success",
                data: allUser,
                total: totalUser.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalUser.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
const creatUser = (newProdutc) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberUser = await NumberId.findOne({
                name: 'user'
            })
            let userId = 'us'


            while ((userId.length + (numberUser.numberId + 1).toString().length) < 10) userId += '0'

            await NumberId.findOneAndUpdate({
                name: 'user'
            }, {
                numberId: numberUser.numberId + 1
            })

            userId += (numberUser.numberId + 1).toString()
            const { name, sex, email, password, phone, dayOfBirth, nation, address, avatar, note } = newProdutc
            const createUser = await User.create({
                name,
                userId,
                sex, email,
                password,
                phone,
                dayOfBirth,
                nation,
                address,
                avatar,
                note
            })

            if (createUser) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createUser,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const UserNeedDelete = await User.findOne({ userId: userId })


            const result = await cloudinary.uploader.destroy(UserNeedDelete.avatar.publicId);

            const User = await User.findOneAndDelete({ userId: userId })

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

const updateUser = (userId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateUser = await User.findOneAndUpdate({ userId: userId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateUser
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const login = (obj) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await User.findOne({
                $and: [
                    { email: obj.email },
                    { password: obj.password }
                ]

            })

            resolve({
                status: "OK",
                message: "success",
                data: user,
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const sendOtp = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            mailOptions = {
                from: 'AdminTQShop <tqshoeshop@gmail.com>',
                to: email,
                subject: 'Send Otp',
                html: `<p>Otp để kích hoạt tài khoản của bạn là : ${otp}</p> `
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
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllUser,
    getUser,
    deleteUser,
    creatUser,
    updateUser,
    login,
    sendOtp
}