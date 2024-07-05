const ColorServices = require('../services/colorServices')
const getAllColor = async (req, res) => {
    try {
        const respone = await ColorServices.getAllColor()
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

module.exports = {
    getAllColor
}
