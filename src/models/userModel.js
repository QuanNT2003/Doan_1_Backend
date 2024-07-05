const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        userId: { type: String, require: true, unique: true },
        sex: { type: String },
        email: { type: String, require: true },
        password: { type: String },
        phone: { type: String, require: true },
        dayOfBirth: { type: Date },
        nation: { type: String },
        address: { type: String },
        images: [
            {
                publicId: { type: String },
                url: { type: String },
            }
        ],
        note: { type: String },
        active: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
module.exports = User;