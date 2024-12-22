const NotifiServices = require('../services/notifiServices')
const getAllNotifi = async (req, res) => {
    try {
        const { userId } = req.query
        const respone = await NotifiServices.getAllNotifi(userId)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateNotifi = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await NotifiServices.updateNotifi(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

module.exports = {
    getAllNotifi,
    updateNotifi
}