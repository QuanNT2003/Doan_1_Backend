const VNPayServices = require('../services/vnpayServices');

const createOrder = async (req, res) => {
    try {
        const data = await VNPayServices.create_payment(req);
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error("Failed to create order:", error);
        res.status(500).json({ error: "Failed to create order." });
    }
};

module.exports = { createOrder };
