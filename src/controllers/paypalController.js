const PayPalServices = require('../services/paypalServices')

const createOrderPayPal = async (req, res) => {
    try {
        const respone = await PayPalServices.createOrderPayPal(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        console.error(e);
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    createOrderPayPal
}