const Order = require('../models/orderModel')
const Import = require('../models/importModel')

const getTopBrands = (year, month) => {
    return new Promise(async (resolve, reject) => {
        try {

            const startDate = new Date(year, month - 1, 1); // First day of the specified month
            const endDate = new Date(year, month, 1); // First day of the next month

            const result = await Order.aggregate([
                {
                    $match: {
                        status: 'delivered',
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate,
                        },
                    },
                },
                { $unwind: "$item" },
                {
                    $lookup: {
                        from: 'products', // Ensure this matches the actual name of your Product collection
                        localField: 'item.product',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                { $unwind: "$productDetails" },
                {
                    $group: {
                        _id: "$productDetails.brand", // Group by the brand field in the Product schema
                        quantities: { $sum: "$item.quantity" },
                    },
                },
                { $sort: { totalQuantity: -1 } },
                { $limit: 10 },
                {
                    $lookup: {
                        from: 'brands', // Ensure this matches the actual name of your Brand collection
                        localField: '_id',
                        foreignField: '_id',
                        as: 'brandDetails',
                    },
                },
                { $unwind: "$brandDetails" },
                {
                    $project: {
                        _id: 0,
                        brandNames: "$brandDetails.name", // Assuming 'name' is a field in your Brand schema
                        quantities: 1,
                    },
                },
            ]);

            let brandNames = []
            let quantities = []

            for (let item of result) {
                brandNames.push(item.brandNames)
                quantities.push(item.quantities)
            }
            resolve({
                status: "OK",
                message: "success",
                brandNames: brandNames,
                quantities: quantities
            })

        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getTopCategories = (year, month) => {
    return new Promise(async (resolve, reject) => {
        try {

            const startDate = new Date(year, month - 1, 1); // First day of the specified month
            const endDate = new Date(year, month, 1); // First day of the next month

            const result = await Order.aggregate([
                {
                    $match: {
                        status: 'delivered',
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate,
                        },
                    },
                },
                { $unwind: "$item" },
                {
                    $lookup: {
                        from: 'products', // Ensure this matches the actual name of your Product collection
                        localField: 'item.product',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                { $unwind: "$productDetails" },
                {
                    $group: {
                        _id: "$productDetails.category", // Group by the category field in the Product schema
                        quantities: { $sum: "$item.quantity" },
                    },
                },
                { $sort: { totalQuantity: -1 } },
                { $limit: 10 },
                {
                    $lookup: {
                        from: 'categories', // Ensure this matches the actual name of your Category collection
                        localField: '_id',
                        foreignField: '_id',
                        as: 'categoryDetails',
                    },
                },
                { $unwind: "$categoryDetails" },
                {
                    $project: {
                        _id: 0,
                        categorieNames: "$categoryDetails.name", // Assuming 'name' is a field in your Category schema
                        quantities: 1,
                    },
                },
            ]);
            let categorieNames = []
            let quantities = []

            for (let item of result) {
                categorieNames.push(item.categorieNames)
                quantities.push(item.quantities)
            }

            resolve({
                status: "OK",
                message: "success",
                categorieNames: categorieNames,
                quantities: quantities
            })

        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getTopProducts = (year, month) => {
    return new Promise(async (resolve, reject) => {
        try {
            const startDate = new Date(year, month - 1, 1); // First day of the specified month
            const endDate = new Date(year, month, 1); // First day of the next month
            const result = await Order.aggregate([
                {
                    $match: {
                        status: 'delivered',
                        createdAt: {
                            $gte: startDate,
                            $lt: endDate,
                        },
                    },
                },
                { $unwind: "$item" },
                {
                    $group: {
                        _id: "$item.product",
                        quantities: { $sum: "$item.quantity" },
                    },
                },
                { $sort: { quantities: -1 } }, // Corrected field name for sorting
                { $limit: 10 },
                {
                    $lookup: {
                        from: 'products', // Make sure this matches the actual name of your Product collection
                        localField: '_id',
                        foreignField: '_id',
                        as: 'productDetails',
                    },
                },
                { $unwind: "$productDetails" },
                {
                    $project: {
                        _id: 0,
                        productId: "$_id",
                        quantities: 1,
                        productNames: "$productDetails.name",
                        product: "$productDetails",
                    },
                },
            ]);

            let productNames = []
            let quantities = []
            let product = []
            for (let item of result) {
                productNames.push(item.productNames)
                quantities.push(item.quantities)
                product.push(item.product)
            }
            resolve({
                status: "OK",
                message: "success",
                productNames: productNames,
                quantities: quantities,
                data: product
            })

        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

const getFinancialSummaryByTimePeriod = (startDate, endDate, groupBy) => {
    return new Promise(async (resolve, reject) => {
        const matchStageOrders = {
            $match: {
                status: 'delivered',
                createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) }
            }
        };

        const matchStageImports = {
            $match: {
                createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) }
            }
        };

        let groupId;
        switch (groupBy) {
            case 'day':
                groupId = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' }, day: { $dayOfMonth: '$createdAt' } };
                break;
            case 'month':
                groupId = { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } };
                break;
            case 'year':
                groupId = { year: { $year: '$createdAt' } };
                break;
            default:
                throw new Error('Invalid groupBy parameter. It must be one of "day", "month", or "year".');
        }

        const groupStageOrders = {
            $group: {
                _id: groupId,
                totalRevenue: { $sum: '$payment.total' }
            }
        };

        const groupStageImports = {
            $group: {
                _id: groupId,
                totalCost: { $sum: '$totalCost' }
            }
        };

        const projectStageOrders = {
            $project: {
                _id: 0,
                period: '$_id',
                totalRevenue: 1
            }
        };

        const projectStageImports = {
            $project: {
                _id: 0,
                period: '$_id',
                totalCost: 1
            }
        };

        const pipelineOrders = [matchStageOrders, groupStageOrders, projectStageOrders];
        const pipelineImports = [matchStageImports, groupStageImports, projectStageImports];

        try {
            const ordersResults = await Order.aggregate(pipelineOrders);
            const importsResults = await Import.aggregate(pipelineImports);

            // Process results to separate into timePeriods, totalRevenue, and totalCost arrays
            const combinedResults = {};

            ordersResults.forEach(result => {
                let periodStr;
                switch (groupBy) {
                    case 'day':
                        periodStr = `${result.period.year}-${result.period.month}-${result.period.day}`;
                        break;
                    case 'month':
                        periodStr = `${result.period.year}-${result.period.month}`;
                        break;
                    case 'year':
                        periodStr = `${result.period.year}`;
                        break;
                }
                if (!combinedResults[periodStr]) {
                    combinedResults[periodStr] = { totalRevenue: 0, totalCost: 0 };
                }
                combinedResults[periodStr].totalRevenue = result.totalRevenue;
            });

            importsResults.forEach(result => {
                let periodStr;
                switch (groupBy) {
                    case 'day':
                        periodStr = `${result.period.year}-${result.period.month}-${result.period.day}`;
                        break;
                    case 'month':
                        periodStr = `${result.period.year}-${result.period.month}`;
                        break;
                    case 'year':
                        periodStr = `${result.period.year}`;
                        break;
                }
                if (!combinedResults[periodStr]) {
                    combinedResults[periodStr] = { totalRevenue: 0, totalCost: 0 };
                }
                combinedResults[periodStr].totalCost = result.totalCost;
            });

            const timePeriods = Object.keys(combinedResults).sort((a, b) => new Date(a) - new Date(b));
            const totalRevenue = timePeriods.map(period => combinedResults[period].totalRevenue);
            const totalCost = timePeriods.map(period => combinedResults[period].totalCost);

            resolve({
                status: "OK",
                message: "success",
                totalRevenue: totalRevenue,
                totalCost: totalCost,
                timePeriods: timePeriods
            })
        } catch (err) {
            console.error('Error fetching financial summary:', err);
            throw err;
        }
    })
}
module.exports = {
    getTopBrands,
    getTopCategories,
    getTopProducts,
    getFinancialSummaryByTimePeriod
}