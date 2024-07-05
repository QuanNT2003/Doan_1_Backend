const AdminServices = require('../services/adminServices')

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

module.exports = {
    login,
}
