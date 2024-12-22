const Notifi = require('../models/notifiModel')
const User = require('../models/userModel')
const getAllNotifi = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {
                createdAt: -1,
                updatedAt: -1
            }

            const user = await User.findOne({ userId: userId })

            const userCondititon = userId ? { user: user._id } : {}

            const allNotifi = await Notifi.find({
                ...userCondititon
            }).limit(7).sort(sortObj)

            resolve({
                status: "OK",
                message: "success",
                data: allNotifi,

            })

        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const updateNotifi = (id, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateNotifi = await Notifi.findOneAndUpdate({ _id: id }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateNotifi
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllNotifi,
    updateNotifi
}