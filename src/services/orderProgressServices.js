const OrderProgress = require('../models/orderProgressModel')

const getAllOrderProgress = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {
                createdAt: -1,
                updatedAt: -1
            }

            const orderIdCondititon = orderId ? { orderId: orderId } : {}


            const allOrderProgress = await OrderProgress.find({
                ...orderIdCondititon,

            }).sort(sortObj)



            resolve({
                status: "OK",
                message: "success",
                data: allOrderProgress,
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getAllReturnProgress = (returnId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {
                createdAt: -1,
                updatedAt: -1
            }

            const returnIdCondititon = returnId ? { returnId: returnId } : {}

            const allOrderProgress = await OrderProgress.find({
                ...returnIdCondititon
            }).sort(sortObj)



            resolve({
                status: "OK",
                message: "success",
                data: allOrderProgress,
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    getAllOrderProgress,
    getAllReturnProgress
}