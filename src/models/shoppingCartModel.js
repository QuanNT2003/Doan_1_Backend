const mongoose = require('mongoose')
const shoppingCartSchema = new mongoose.Schema(
    {
        shoppingCartId: { type: String, require: true, unique: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        quantity: { type: Number },
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
    {
        timestamps: true,
    }
);

const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);
module.exports = ShoppingCart;