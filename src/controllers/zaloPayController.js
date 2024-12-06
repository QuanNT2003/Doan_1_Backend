const ZaloPayServices = require('../services/zalopayService');
const createOrder = async (req, res) => {
    try {
        const data = await ZaloPayServices.createZaloPay(req.body);
        // console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
};

const callBack = async (req, res) => {
    try {
        const data = await ZaloPayServices.callBack(req.body);
        // console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
};

module.exports = { createOrder, callBack };