const Size = require('../models/sizeModel')

const getAllSize = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const sizeList = await Size.find().sort({
                name: 1
            })

            resolve({
                status: "OK",
                message: "success",
                data: sizeList,

            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    getAllSize
}