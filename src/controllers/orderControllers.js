const OrderServices = require('../services/orderServices')
const getAllOrder = async (req, res) => {
    try {
        const { limit, page, sort, user, status } = req.query
        const respone = await OrderServices.getAllOrder(Number(limit) || 8, Number(page) || 1, sort, user, status)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailOrder = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await OrderServices.getDetailOrder(id)
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
        const respone = await OrderServices.getUser()
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createOrder = async (req, res) => {
    try {
        const respone = await OrderServices.creatOrder(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await OrderServices.updateOrder(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllOrder,
    getDetailOrder,
    getAllUser,
    createOrder,
    updateOrder
}