const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        orderId: { type: String, require: true, unique: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        note: { type: String },
        address: { type: String },
        phone: { type: String },
        email: { type: String },
        item: [
            {
                quantity: { type: Number },
                total: { type: Number },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                version: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Version',
                    required: true,
                },
                comment: {
                    type: Boolean
                },
                exchange_return: {
                    type: Boolean
                }
            }
        ],
        saleOff: {
            voucherSaleOff: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Discount',
            },
            totalSaleOff: { type: Number },
        },
        ship: {
            shipCost: { type: Number },
            voucherShip: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Discount',
            },
            shipTotal: { type: Number },
        },
        payment: {
            subTotal: { type: Number },
            voucherPayment: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Discount',
            },
            paymentTotal: { type: Number },
            total: { type: Number },
            paymentType: { type: String },
            paid: { type: Number },
            remain: { type: Number },
        },
        status: { type: String },
        paymentPending: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;