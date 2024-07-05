const ReturnServices = require('../services/returnServices')
const getAllReturn = async (req, res) => {
    try {
        const { limit, page, sort, user, status } = req.query
        const respone = await ReturnServices.getAllReturn(Number(limit) || 8, Number(page) || 1, sort, user, status)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailReturn = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ReturnServices.getDetailReturn(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const respone = await ReturnServices.getUser()
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createReturn = async (req, res) => {
    try {
        const respone = await ReturnServices.creatReturn(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateReturn = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await ReturnServices.updateReturn(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllReturn,
    getDetailReturn,
    getAllUser,
    createReturn,
    updateReturn
}