const OderProgressServices = require('../services/orderProgressServices')

const getAllOrderProgress = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await OderProgressServices.getAllOrderProgress(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getAllReturnProgress = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await OderProgressServices.getAllReturnProgress(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllOrderProgress,
    getAllReturnProgress
}