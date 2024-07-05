const mongoose = require('mongoose')
const orderProgressSchema = new mongoose.Schema(
    {
        orderId: { type: String },
        returnId: { type: String },
        title: { type: String },
        note: { type: String }

    },
    {
        timestamps: true,
    }
);

const OrderProgress = mongoose.model("OrderProgress", orderProgressSchema);
module.exports = OrderProgress;