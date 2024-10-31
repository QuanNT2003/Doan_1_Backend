const ViewServices = require('../services/viewservices')
const getAllView = async (req, res) => {
    try {
        const { limit, page, sort, user } = req.query
        const respone = await ViewServices.getAllView(Number(limit) || 8, Number(page) || 1, sort, user)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}



const deleteView = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await ViewServices.deleteView(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateView = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await ViewServices.updateView(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}


const createView = async (req, res) => {
    try {
        const respone = await ViewServices.creatView(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllView,
    createView,
    deleteView,
    updateView
}
