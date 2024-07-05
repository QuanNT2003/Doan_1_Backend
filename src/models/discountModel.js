const mongoose = require('mongoose')
const discountSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        discountId: { type: String, require: true, unique: true },
        note: { type: String },
        typeDiscount: { type: Boolean },
        classify: { type: String },
        apply: { type: Number },
        value: { type: Number },
        status: { type: Boolean },
        startDay: { type: Date },
        endDay: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Discount = mongoose.model("Discount", discountSchema);
module.exports = Discount;