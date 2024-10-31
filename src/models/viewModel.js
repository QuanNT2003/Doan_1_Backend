const mongoose = require('mongoose')
const viewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const View = mongoose.model("View", viewSchema);
module.exports = View;