const OrderProgress = require('../models/orderProgressModel')
const Notifi = require('../models/notifiModel')
const User = require('../models/userModel')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Sử dụng TLS
    auth: {
        user: 'tqshoeshop@gmail.com',
        pass: 'batsqmwltrruuqwb'
    }
});

const sendEmail = (order, subject, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(order);

            let string = ''
            let title = ''

            if (order.status === 'received') {
                string = 'đã được tiếp nhận'
                title = 'Tiếp nhận'
            }
            else if (order.status === 'delivering') {
                string = 'đang được vận chuyển'
                title = 'Đang giao'
            }
            else if (order.status === 'delivered') {
                string = 'đã được giao'
                title = 'Đã giao'
            }
            else if (order.status === 'cancelled') {
                string = 'đã hủy. Lý do : ' + order.note
                title = 'Đã hủy'
            }

            const user = await User.findOne({ _id: order.user })

            mailOptions = {
                from: 'AdminTQShop <tqshoeshop@gmail.com>',
                to: type === 'Đơn hàng' ? order.email : user.email,
                subject: subject,
                html: `<p>${type} của bạn ${string}</p> 
                    <p>Đơn hàng mã số ${order._id}.</p>
                    <p>Thông tin vận chuyển: email ${order.email}, số điện thoại ${order.phone}. Địa chỉ nhận hàng: ${order.address}</p>
                    <p>Vui lòng chú ý email và ứng dụng để cập nhật tình trạng đơn hàng sớm nhất</p>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Lỗi gửi email", error);
                    reject(error);
                } else {
                    resolve({
                        data: info.response // You can return the email response
                    });
                }
            });


            const result = await OrderProgress.create({
                orderId: type === 'Đơn hàng' ? order.orderId : order.returnId,
                title: title,
                note: type + " của bạn " + string
            })

            const notifi = await Notifi.create({
                user: order.user,
                note: type + " #" + order._id + " " + string
            })

        }
        catch (e) {
            console.error(e);
            reject(e)
        }
    })
}

module.exports = {
    sendEmail
}