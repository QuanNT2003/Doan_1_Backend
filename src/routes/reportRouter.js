const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/reportController')
const { authMiddleware } = require('../middleware/authMiddleware');
router.post('/get-top-product', ReportController.getTopProducts);
router.post('/get-top-brand', authMiddleware, ReportController.getTopBrands)
router.post('/get-top-cate', authMiddleware, ReportController.getTopCategories)
router.get('/get-revenue', authMiddleware, ReportController.getFinancialSummaryByTimePeriod)
module.exports = router