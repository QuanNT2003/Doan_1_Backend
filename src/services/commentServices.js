const Comment = require('../models/commentModel')
const cloudinary = require('../config/cloudinaryConfig');
const NumberId = require('../models/numberId')
const getAllComment = (limit, page, sort, star, user, productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let sortObj = {}
            if (sort) {
                sortObj[sort[1]] = sort[0]
            }
            else {
                sortObj = {
                    createdAt: -1,
                    updatedAt: -1
                }
            }

            const starCondititon = star ? { star: star } : {}
            const userCondititon = user ? { user: user } : {}
            const productIdCondititon = productId ? { productId: productId } : {}
            const totalComment = await Comment.find({
                ...starCondititon,
                ...userCondititon,
                ...productIdCondititon
            })

            const allComment = await Comment.find({
                ...starCondititon,
                ...userCondititon,
                ...productIdCondititon
            }).limit(limit).skip((page - 1) * limit).sort(sortObj).populate('user')



            resolve({
                status: "OK",
                message: "success",
                data: allComment,
                total: totalComment.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalComment.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatComment = (newComment) => {
    return new Promise(async (resolve, reject) => {
        try {
            const numberComment = await NumberId.findOne({
                name: 'comment'
            })
            let commentId = 'cm'


            while ((commentId.length + (numberComment.numberId + 1).toString().length) < 12) commentId += '0'

            await NumberId.findOneAndUpdate({
                name: 'comment'
            }, {
                numberId: numberComment.numberId + 1
            })

            commentId += (numberComment.numberId + 1).toString()
            const { productId, images, note, star, like, user, rep_detail } = newComment
            const createComment = await Comment.create({
                productId,
                commentId,
                images,
                note,
                star,
                like,
                user,
                rep_detail
            })

            if (createComment) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createComment,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const updateComment = (commentId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateComment = await Comment.findOneAndUpdate({ commentId: commentId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateComment
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteComment = (commentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const commentDelete = await Comment.findOne({ commentId: commentId })

            for (let image of commentDelete.images) {
                const result = await cloudinary.uploader.destroy(image.publicId);
            }
            const comment = await Comment.findOneAndDelete({ commentId: commentId })

            resolve({
                status: "OK",
                message: "success",
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllComment,
    creatComment,
    updateComment,
    deleteComment
}