const mongoose = require('mongoose')
const verisonSchema = new mongoose.Schema(
    {
        versionId: { type: String, require: true, unique: true },
        productId: { type: String },
        inStock: { type: Number },
        size: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Size',
            required: true,
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Version = mongoose.model("Version", verisonSchema);
module.exports = Version;