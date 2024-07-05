const ImportServices = require('../services/importServices')
const getAllImport = async (req, res) => {
    try {
        const { limit, page, sort } = req.query
        const respone = await ImportServices.getAllImport(Number(limit) || 8, Number(page) || 1, sort)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createImport = async (req, res) => {
    try {
        const respone = await ImportServices.creatImport(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailImport = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ImportServices.getDetailImport(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}


module.exports = {
    getAllImport,
    createImport,
    getDetailImport
}