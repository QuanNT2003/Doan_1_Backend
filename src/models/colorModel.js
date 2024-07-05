const mongoose = require('mongoose')
const colorSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        colorId: { type: String, require: true, unique: true },
        colorNameOne: { type: String },
        colorOneCode: { type: String },
        colorNameTwo: { type: String },
        colorTwoCode: { type: String },
    },
    {
        timestamps: true,
    }
);

const Color = mongoose.model("Color", colorSchema);
module.exports = Color;