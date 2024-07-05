const DiscountServices = require('../services/discountServices')
const getAllDiscount = async (req, res) => {
    try {
        const { limit, page, sort, classify, status } = req.query
        const respone = await DiscountServices.getAllDiscount(Number(limit) || 8, Number(page) || 1, sort, classify, status)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailDiscount = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await DiscountServices.getDiscount(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await DiscountServices.deleteDiscount(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createDiscount = async (req, res) => {
    try {
        const respone = await DiscountServices.creatDiscount(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateDiscount = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await DiscountServices.updateDiscount(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDiscountForUser = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await DiscountServices.getDiscountForUser(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllDiscount,
    getDetailDiscount,
    createDiscount,
    deleteDiscount,
    updateDiscount,
    getDiscountForUser
}

