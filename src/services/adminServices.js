const Admin = require('../models/adminModel')
const jwt = require('./jwtServices')
const login = (obj) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await Admin.findOne({
                $and: [
                    { email: obj.email },
                    { password: obj.password }
                ]

            })

            const access_token = await jwt.genneralAccessToken({
                adminId: user.adminId,
                isAdmin: true
            })

            const refresh_token = await jwt.genneralRefreshToken({
                adminId: user.adminId,
                isAdmin: true
            })
            resolve({
                status: "OK",
                message: "success",
                data: user,
                access_token,
                refresh_token
            })
        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const refreshToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(token);
            resolve({
                status: "OK",
                message: "success",

            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    login,
    refreshToken
}