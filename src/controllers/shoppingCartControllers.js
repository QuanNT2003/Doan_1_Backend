const ShoppingCartServices = require('../services/shoppingCartServices')
const getAllShoppingCart = async (req, res) => {
    try {
        const { limit, page, sort, user } = req.query
        const respone = await ShoppingCartServices.getAllShoppingCart(Number(limit) || 8, Number(page) || 1, sort, user)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}



const deleteShoppingCart = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ShoppingCartServices.deleteShoppingCart(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateShoppingCart = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await ShoppingCartServices.updateShoppingCart(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}


const createShoppingCart = async (req, res) => {
    try {
        const respone = await ShoppingCartServices.creatShoppingCart(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllShoppingCart,
    createShoppingCart,
    deleteShoppingCart,
    updateShoppingCart
}
