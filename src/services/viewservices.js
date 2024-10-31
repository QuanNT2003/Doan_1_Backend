const View = require('../models/viewModel')

const getAllView = (limit, page, sort, userId) => {
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

            const userCondititon = userId ? { user: userId } : {}

            const totalView = await View.find({
                ...userCondititon
            })

            const allView = await View.find({
                ...userCondititon
            }).limit(limit).skip((page - 1) * limit).sort(sortObj)
                .populate('user')
                .populate('product')


            resolve({
                status: "OK",
                message: "success",
                data: allView,
                total: totalView.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalView.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const creatView = (newView) => {
    return new Promise(async (resolve, reject) => {
        try {

            const { user, product } = newView
            const createView = await View.create({
                user,
                product,
            })

            if (createView) {
                resolve({
                    status: "OK",
                    message: "success",
                    data: createView,

                })
            }



        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const deleteView = (viewId) => {
    return new Promise(async (resolve, reject) => {
        try {

            const view = await View.findOneAndDelete({ _id: viewId })

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

const updateView = (viewId, obj) => {
    return new Promise(async (resolve, reject) => {
        try {
            const updateView = await View.findOneAndUpdate({ _id: viewId }, obj, { new: true })

            resolve({
                status: "OK",
                message: "success",
                data: updateView
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}
module.exports = {
    getAllView,
    creatView,
    deleteView,
    updateView
}