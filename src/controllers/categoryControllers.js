const CategoryServices = require('../services/categoryServices')
const getAllCategory = async (req, res) => {
    try {
        const { limit, page, sort } = req.query
        const respone = await CategoryServices.getAllCategory(Number(limit) || 8, Number(page) || 1, sort)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}


module.exports = {
    getAllCategory,
}
