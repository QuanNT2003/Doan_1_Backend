const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema(
    {
        name: { type: String, require: true },
        adminId: { type: String, require: true, unique: true },
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

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;