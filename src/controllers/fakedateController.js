const FakedataServices = require('../services/fakedataServices')
const review = async (req, res) => {
    try {
        const respone = await FakedataServices.review()
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

module.exports = {
    review
}