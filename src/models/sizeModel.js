const mongoose = require('mongoose')
const sizeSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        sizeId: { type: String, require: true, unique: true },
    },
    {
        timestamps: true,
    }
);

const Size = mongoose.model("Size", sizeSchema);
module.exports = Size;