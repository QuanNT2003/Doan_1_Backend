const UserServices = require('../services/userServices')
const getAllUser = async (req, res) => {
    try {
        const { limit, page, active, search, sort } = req.query
        const respone = await UserServices.getAllUser(Number(limit) || 8, Number(page) || 1, sort, active, search)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getDetailUser = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await UserServices.getUser(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await UserServices.deleteUser(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const createUser = async (req, res) => {
    try {
        const respone = await UserServices.creatUser(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await UserServices.updateUser(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const login = async (req, res) => {
    try {
        const respone = await UserServices.login(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const respone = await UserServices.sendOtp(email)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllUser,
    getDetailUser,
    createUser,
    deleteUser,
    updateUser,
    login,
    sendOtp
}
