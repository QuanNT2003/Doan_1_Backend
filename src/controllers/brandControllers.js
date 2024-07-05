const BrandServices = require('../services/brandServices')
const getAllBrand = async (req, res) => {
    try {
        const { limit, page, sort, nation } = req.query
        const respone = await BrandServices.getAllBrand(Number(limit) || 8, Number(page) || 1, sort, nation)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailBrand = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await BrandServices.getBrand(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await BrandServices.deleteBrand(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateBrand = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await BrandServices.updateBrand(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getNation = async (req, res) => {
    try {
        const respone = await BrandServices.getAllNation()
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createBrand = async (req, res) => {
    try {
        const respone = await BrandServices.creatBrand(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllBrand,
    getDetailBrand,
    getNation,
    createBrand,
    deleteBrand,
    updateBrand
}
