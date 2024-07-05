const mongoose = require('mongoose')
const notifiSchema = new mongoose.Schema(
    {
        userId: { type: String, require: true },
        note: { type: String },
    },
    {
        timestamps: true,
    }
);

const Notifi = mongoose.model("Notifi", notifiSchema);
module.exports = Notifi;