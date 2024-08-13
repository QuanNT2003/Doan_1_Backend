const AdminServices = require('../services/adminServices')
const JwtServices = require('../services/jwtServices')
const login = async (req, res) => {
    try {
        const respone = await AdminServices.login(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body
        const respone = await JwtServices.refreshTokenService(refreshToken)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    login,
    refreshToken
}
