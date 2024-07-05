const VersionServices = require('../services/versionServices')
const getAllVersion = async (req, res) => {
    try {
        const { limit, page, sort, productId, color, size } = req.query
        const respone = await VersionServices.getAllVersion(Number(limit) || 8, Number(page) || 1, sort, productId, color, size)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getAllSize = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await VersionServices.getAllSize(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getAllColor = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await VersionServices.getAllColor(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

module.exports = {
    getAllVersion,
    getAllColor,
    getAllSize
}