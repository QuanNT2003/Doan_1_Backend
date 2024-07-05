const Color = require('../models/colorModel')

const getAllColor = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const ColorList = await Color.find().sort({
                name: 1
            })

            resolve({
                status: "OK",
                message: "success",
                data: ColorList,

            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    getAllColor
}