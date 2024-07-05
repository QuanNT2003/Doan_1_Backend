const mongoose = require('mongoose')
const returnSchema = new mongoose.Schema(
    {
        returnId: { type: String, require: true, unique: true },
        orderId: { type: String },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: { type: String },
        exchange: { type: Boolean },
        returnItem: {
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
        },
        exchangeItem: {
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
        }
    },
    {
        timestamps: true,
    }
);

const Return = mongoose.model("Return", returnSchema);
module.exports = Return;