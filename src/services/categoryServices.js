const Category = require('../models/categoryModel')

const getAllCategory = ({ limit, page, sort }) => {
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



            const totalCategory = await Category.find({

            })

            const allCategory = await Category.find({

            }).limit(limit).skip((page - 1) * limit).sort(sortObj)

            resolve({
                status: "OK",
                message: "success",
                data: allCategory,
                total: totalCategory.length,
                pageCurrent: page,
                totalPage: Math.ceil(totalCategory.length / limit)
            })


        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    getAllCategory,
}