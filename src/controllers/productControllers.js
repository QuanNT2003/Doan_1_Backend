const ProductServices = require('../services/productServices')
const getAllProduct = async (req, res) => {
    try {
        const { limit, page, brand, category, search, sort, classify, min, max } = req.query
        const respone = await ProductServices.getAllProduct(Number(limit) || 8, Number(page) || 1, sort, brand, category, search, classify, min, max)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailProduct = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ProductServices.getProduct(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ProductServices.deleteProduct(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createProduct = async (req, res) => {
    try {
        const respone = await ProductServices.creatProduct(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await ProductServices.updateProduct(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getRelatedProducts = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ProductServices.getRelatedProducts(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllProduct,
    getDetailProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getRelatedProducts
}

