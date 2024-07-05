const Notifi = require('../models/notifiModel')

const getAllNotifi = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {
                createdAt: -1,
                updatedAt: -1
            }

            const userCondititon = userId ? { userId: userId } : {}

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

module.exports = {
    getAllNotifi
}