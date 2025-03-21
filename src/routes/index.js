const ProductRouter = require('./productRouter')
const BrandRouter = require('./brandRouter')
const CategoryRouter = require('./categoryRouter')
const ImagesRouter = require('./imageRouter')
const SizeRouter = require('./sizeRouter')
const ColorRouter = require('./colorRouter')
const DiscountRouter = require('./discountRouter')
const VersionRouter = require('./versionRouter')
const UserRouter = require('./userRouter')
const ShoppingCart = require('./ShoppingCartRouter')
const NotifiRouter = require('./notifiRouter')
const DiscountCartRouter = require('./discountCartRouter')
const OrderRouter = require('./orderRouter')
const OrderProgressRouter = require('./orderProgressRouter')
const CommentRouter = require('./commentRouter')
const ImportRouter = require('./importRouter')
const ReturnRouter = require('./returnRouter')
const PayPalRouter = require('./paypalRouter')
const VNPayRouter = require('./vnpayRouter')
const ZaloPayRouter = require('./zaloPayRouter')
const ReportRouter = require('./reportRouter')
const AdminRouter = require('./adminRouter')
const FakeRouter = require('./fakedataRouter')
const ViewRouter = require('./viewRouter')
const MomoRouter = require('./momoRouter')
const routes = (app) => {
    app.use('/api/product', ProductRouter)
    app.use('/api/brand', BrandRouter)
    app.use('/api/category', CategoryRouter)
    app.use('/api/uploadImages', ImagesRouter)
    app.use('/api/size', SizeRouter)
    app.use('/api/color', ColorRouter)
    app.use('/api/discount', DiscountRouter)
    app.use('/api/version', VersionRouter)
    app.use('/api/user', UserRouter)
    app.use('/api/shoppingCart', ShoppingCart)
    app.use('/api/notifi', NotifiRouter)
    app.use('/api/discountCart', DiscountCartRouter)
    app.use('/api/order', OrderRouter)
    app.use('/api/orderprogress', OrderProgressRouter)
    app.use('/api/comment', CommentRouter)
    app.use('/api/import', ImportRouter)
    app.use('/api/return', ReturnRouter)
    app.use('/api/paypal', PayPalRouter)
    app.use('/api/vnpay', VNPayRouter)
    app.use('/api/report', ReportRouter)
    app.use('/api/admin', AdminRouter)
    app.use('/api/fakedata', FakeRouter)
    app.use('/api/view', ViewRouter)
    app.use('/api/zalopay', ZaloPayRouter)
    app.use('/api/momopay', MomoRouter)
}

module.exports = routes