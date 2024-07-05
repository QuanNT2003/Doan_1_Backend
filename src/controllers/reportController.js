const ReportServices = require('../services/reportServices')

const getTopProducts = async (req, res) => {
    try {
        const { year, month } = req.body
        const respone = await ReportServices.getTopProducts(year, month)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getTopBrands = async (req, res) => {
    try {
        const { year, month } = req.body
        const respone = await ReportServices.getTopBrands(year, month)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getTopCategories = async (req, res) => {
    try {
        const { year, month } = req.body
        const respone = await ReportServices.getTopCategories(year, month)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

const getFinancialSummaryByTimePeriod = async (req, res) => {
    try {
        const { startDate, endDate, groupBy } = req.query
        const respone = await ReportServices.getFinancialSummaryByTimePeriod(startDate, endDate, groupBy)
        return res.status(200).json(respone)
    }
    catch (e) {
        return res.status(404).json({
            messge: e
        })
    }
}

module.exports = {
    getTopBrands,
    getTopCategories,
    getTopProducts,
    getFinancialSummaryByTimePeriod
}