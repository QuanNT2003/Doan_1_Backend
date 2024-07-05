const mongoose = require('mongoose')
const importSchema = new mongoose.Schema(
    {
        importId: { type: String, require: true, unique: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        item: [
            {
                version: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Version',
                    required: true,
                },
                quantity: { type: Number, require: true },
            }
        ],
        totalQuantity: { type: Number, require: true },
        totalCost: { type: Number, require: true },

    },
    {
        timestamps: true,
    }
);

const Import = mongoose.model("Import", importSchema);
module.exports = Import;