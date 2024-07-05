const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        productId: { type: String, require: true, unique: true },
        description: { type: String },
        cost: { type: Number },
        price: { type: Number },
        star: { type: Number },
        classify: { type: String },
        discount: { type: Number },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            required: true,
        },
        images: [
            {
                publicId: { type: String },
                url: { type: String },
            }
        ]
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;