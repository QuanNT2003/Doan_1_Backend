const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema(
    {
        productId: { type: String, require: true },
        images: [
            {
                publicId: { type: String },
                url: { type: String },
            }
        ],
        approve: { type: Boolean, default: true },
        note: { type: String },
        rating: { type: Number },
        like: { type: Number },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rep: { type: Boolean, default: false },
        rep_detail: {
            note: { type: String },
            like: { type: Number },
        }

    },
    {
        timestamps: true,
    }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;