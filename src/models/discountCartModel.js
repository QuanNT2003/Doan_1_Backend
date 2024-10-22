const mongoose = require('mongoose')
const discountCartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isUse: { type: Boolean, default: false },
        discount: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Discount',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const DiscountCart = mongoose.model("DiscountCart", discountCartSchema);
module.exports = DiscountCart;