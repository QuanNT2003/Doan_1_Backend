const Admin = require('../models/adminModel')

const login = (obj) => {
    return new Promise(async (resolve, reject) => {
        try {

            const user = await Admin.findOne({
                $and: [
                    { email: obj.email },
                    { password: obj.password }
                ]

            })

            resolve({
                status: "OK",
                message: "success",
                data: user,
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
}