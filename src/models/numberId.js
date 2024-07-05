const mongoose = require('mongoose')
const numberIdSchema = new mongoose.Schema(
    {
        numberId: { type: Number, require: true },
        name: { type: String, require: true },

    },
    {
        timestamps: true,
    }
);

const NumberId = mongoose.model("NumberId", numberIdSchema);
module.exports = NumberId;