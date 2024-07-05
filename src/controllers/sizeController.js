const SizeServices = require('../services/sizeServices')
const getAllSize = async (req, res) => {
    try {
        const respone = await SizeServices.getAllSize()
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

module.exports = {
    getAllSize
}
