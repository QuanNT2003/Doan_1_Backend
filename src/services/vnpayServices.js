const moment = require('moment');
const querystring = require('qs');
const crypto = require('crypto');

const create_payment = (req) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(req.body);
            process.env.TZ = 'Asia/Ho_Chi_Minh';

            let date = new Date();
            let createDate = moment(date).format('YYYYMMDDHHmmss');

            const ipAddr = req.body?.clientIp ||
                req.headers['x-forwarded-for']?.split(',')[0] ||
                req.connection?.remoteAddress ||
                req.socket?.remoteAddress ||
                req.connection?.socket?.remoteAddress ||
                '127.0.0.1';

            let tmnCode = 'MT8X9ZYV';
            let secretKey = '5B2CHGTIN12EKD8ZA905ATYELP7ZWGMR'; // Thay thế bằng secretKey thực tế
            let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
            let returnUrl = 'http://localhost:3000/order_colection/detail/' + req.body.orderId;
            let orderId = req.body.orderId;
            let amount = req.body.amount;
            let bankCode = req.body.bankCode;

            let locale = req.body.language || 'vn';
            let currCode = 'VND';
            let vnp_Params = {
                'vnp_Version': '2.1.0',
                'vnp_Command': 'pay',
                'vnp_TmnCode': tmnCode,
                'vnp_Locale': locale,
                'vnp_CurrCode': currCode,
                'vnp_TxnRef': orderId + createDate,
                'vnp_OrderInfo': 'thanh toan don hang ma GD:' + orderId,
                'vnp_OrderType': 'other',
                'vnp_Amount': amount * 100, // Số tiền phải là số nguyên
                'vnp_ReturnUrl': returnUrl,
                'vnp_IpAddr': ipAddr,
                'vnp_CreateDate': createDate
            };
            if (bankCode) {
                vnp_Params['vnp_BankCode'] = bankCode;
            }

            // Sắp xếp các tham số theo thứ tự từ điển
            vnp_Params = sortObject(vnp_Params);

            // Tạo chuỗi signData
            let signData = querystring.stringify(vnp_Params, { encode: false });
            console.log('signData:', signData);

            // Tạo chữ ký
            let hmac = crypto.createHmac("sha512", secretKey);
            let signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
            console.log('signed:', signed);

            // Thêm chữ ký vào tham số
            vnp_Params['vnp_SecureHash'] = signed;

            // Tạo URL thanh toán
            let vnpUrlWithParams = vnpUrl + '?' + querystring.stringify(vnp_Params, { encode: false });
            console.log('vnpUrl:', vnpUrlWithParams);

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: vnpUrlWithParams
            });
        } catch (e) {
            reject(e);
        }
    });
};

const sortObject = (obj) => {
    let sorted = {};
    let keys = Object.keys(obj).sort();
    for (let key of keys) {
        sorted[key] = obj[key];
    }
    return sorted;
};

module.exports = { create_payment };
