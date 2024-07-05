const mongoose = require('mongoose')
const brandSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        brandId: { type: String, require: true, unique: true },
        image: [
            {
                publicId: { type: String },
                url: { type: String },
            }
        ],

        email: { type: String },
        phone: { type: String },
        note: { type: String },
        web: { type: String },
        nation: { type: String }
    },
    {
        timestamps: true,
    }
);

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;