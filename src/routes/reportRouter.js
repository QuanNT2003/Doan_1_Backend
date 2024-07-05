const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController')

router.post('/get-top-product', ReportController.getTopProducts);
router.post('/get-top-brand', ReportController.getTopBrands)
router.post('/get-top-cate', ReportController.getTopCategories)
router.get('/get-revenue', ReportController.getFinancialSummaryByTimePeriod)
module.exports = router