const CommentServices = require('../services/commentServices')
const getAllComment = async (req, res) => {
    try {
        const { limit, page, sort, star, user, productId } = req.query
        const respone = await CommentServices.getAllComment(Number(limit) || 8, Number(page) || 1, sort, star, user, productId)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}


const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const respone = await CommentServices.deleteComment(id)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const updateComment = async (req, res) => {
    try {
        const { id } = req.params

        const respone = await CommentServices.updateComment(id, req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}


const createComment = async (req, res) => {
    try {
        const respone = await CommentServices.creatComment(req.body)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}
module.exports = {
    getAllComment,
    createComment,
    deleteComment,
    updateComment
}