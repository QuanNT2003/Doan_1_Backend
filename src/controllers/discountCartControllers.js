const DiscountCartServices = require('../services/discountCartServices')
const getAllDiscountCart = async (req, res) => {
    try {
        const { id } = req.query
        const respone = await DiscountCartServices.getAllDiscountCart(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}



const createDiscountCart = async (req, res) => {
    try {
        const respone = await DiscountCartServices.creatDiscountCart(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}




module.exports = {
    getAllDiscountCart,
    createDiscountCart,

}