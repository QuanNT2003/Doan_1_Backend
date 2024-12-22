const mongoose = require('mongoose')
const notifiSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        note: { type: String },
        title: { type: String },
        status: { type: Boolean }
    },
    {
        timestamps: true,
    }
);

const Notifi = mongoose.model("Notifi", notifiSchema);
module.exports = Notifi;