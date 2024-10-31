const User = require('../models/userModel')
const Product = require('../models/productModel')
const Comment = require('../models/commentModel')
const fakedata = [
    {
        start: 1,
        note: 'Rất thất vọng, sản phẩm khác hoàn toàn quảng cáo'
    },
    {
        start: 1,
        note: 'shop giao hàng bị lỗi, nhưng giải quyết cho khách hàng thì chậm chạp. Đã lấy keo dán nhưng đi được vài ngày thì đứt ra lại. Có video mở hàng nhưng lại không giải quyết được. Quá tệ'
    },
    {
        start: 1,
        note: 'Mình mới mua, giày có mùi thì k nói.Nhưng mà mới mua có vết đứt chỗ dép mình liên hệ shop shop không thấy trả lời ,'
    },
    {
        start: 1,
        note: 'Keo giống sắp bung quá này mà chạy chắc văng đế quá thấy ko hoài lòng nhiều chỗ giống bung keo vs chày vài chỗ'
    },
    {
        start: 1,
        note: 'Các bạn chú ý, size thực tế chênh lệch nhau đến như vậy, quá bực mình khi nhận giày luôn. Mong shop cải thiện'
    },
    {
        start: 1,
        note: 'Mua đúng size mà chật k đi nổi. Đ** hiểu form kiểu gì luôn'
    },
    {
        start: 1,
        note: 'Sai hoàn toàn tiền nào với hình ảnh minh họa của shop đã đăng'
    },
    {
        start: 1,
        note: 'Lỏng lẻo, quá đểu,  nói chung tệ không nên mua, phí tiền'
    },
    {
        start: 1,
        note: 'Màu sắc ko giống như quảng cáo giao hàng sản phẩm tốt ko rách bao bì bên trong đề giày như là dép mủ'
    },
    {
        start: 2,
        note: 'Đẹp quá'
    },
    {
        start: 2,
        note: 'Quá thất vọng xấu hơn trong hình ko có tính thẩm mỹ tôi thất buồn'
    },
    {
        start: 2,
        note: 'Aii mua di ở nhà thì dc chứ di học hayy dii chơi thì phènn vãii'
    },
    {
        start: 2,
        note: 'Mang bị đau chân'
    },
    {
        start: 2,
        note: 'Tưởng đôi dép kẹp k. Tiền nào của náy. Để mang ở nhà thì ok'
    },
    {
        start: 2,
        note: 'Giao hàng chậm nhưng khá đẹp nên 2*'
    },
    {
        start: 2,
        note: 'Giày shop giao không giống như mẫu shop đăng bán. Chỉ được mỗi cái giao hàng đầy đủ và nhanh thôi😞'
    },
    {
        start: 2,
        note: 'Xấu vãi khác xa với quảng cáo quảng cáo nói láo chán thiệt luôn'
    },
    {
        start: 3,
        note: 'Trên mạng nhìn đẹp lắm hàng về xấu lắm huyên ko nên mua đế mỏng phần ngón quá to'
    },
    {
        start: 3,
        note: 'Hàng nhận bị cong ạ.'
    },
    {
        start: 3,
        note: 'Hàng thì đi đc mà mùi rất hôi và shop mong ra thêm size 39 shop ra cái 38 39 mà giáo cho mik 38 mà ko vừa.mong shop lưu ý'
    },
    {
        start: 3,
        note: 'Hợp với giá tiền.'
    },
    {
        start: 3,
        note: 'Cũng tạm'
    },
    {
        start: 3,
        note: 'Đã mua ở shop nhiều rồi'
    },
    {
        start: 3,
        note: 'Hàng đẹp , khá ưng í mình và giao hàng nhanh '
    },
    {
        start: 3,
        note: 'Hàng thì chất lượng mang ổn mà màu xấu hong dẹp như mô tả'
    },
    {
        start: 4,
        note: 'Ok đẹp mang vừa chân thích thì mua khôg thích thì vẫn mua'
    },
    {
        start: 4,
        note: 'Hàng bền đẹp đáng thử mỗi tội nhầm size.  Nhưng ko sao ổn , mặc được'
    },
    {
        start: 4,
        note: 'Hàng thì đi đc mà mùi rất hôi và shop mong ra thêm size 39 shop ra cái 38 39 mà giáo cho mik 38 mà ko vừa.mong shop lưu ý'
    },
    {
        start: 4,
        note: 'Hợp với giá tiền.'
    },
    {
        start: 4,
        note: 'Hạnh phúc không phải là được nhiều người yêu, mà là được một người yêu rất nhiều'
    },
    {
        start: 4,
        note: 'Đã mua ở shop nhiều rồi'
    },
    {
        start: 4,
        note: 'đẹp, đáng để mua jehehehehehehehdjeheheheheheheh'
    },
    {
        start: 4,
        note: 'mua nhìu lần rồi rất ok'
    },
    {
        start: 4,
        note: 'Chất liệu thì hơi cứng cũng có nhiều chỗ bị lỗi nhưng với giá này thì ok'
    },
    {
        start: 4,
        note: 'Tốt'
    },
    {
        start: 4,
        note: 'dép đẹp nhưng mà nếu shop có thên size nhỏ nx okk tại vì chân mình nhỏ mà kh có size nên hơi rộng ạ'
    },
    {
        start: 5,
        note: 'Mang êm đặt màu đậm nhưng nhìn ko đâm quá'
    },
    {
        start: 5,
        note: 'Đúng với hình ảnh da mềm đương may chắc chắn giá rẻ nữa'
    },
    {
        start: 5,
        note: 'Dép đẹp nên mua đi chuẩn size giao hàng nhanh đunga với mô tả của shop nên ủng hộ nhee'
    },
    {
        start: 5,
        note: 'Tốt chất lượng'
    },
    {
        start: 5,
        note: 'Hạnh phúc không phải là được nhiều người yêu, mà là được một người yêu rất nhiều'
    },
    {
        start: 5,
        note: 'Vừa đẹp hợp với số tiền mình bỏ ra nói chung là đẹp'
    },
    {
        start: 5,
        note: 'đẹp, đáng để mua jehehehehehehehdjeheheheheheheh'
    },
    {
        start: 5,
        note: 'mua nhìu lần rồi rất ok'
    },
    {
        start: 5,
        note: 'Đúng mô tả nc là đẹp so vs giá tiền hợp lí, đẹp nhé cả nhà'
    },
    {
        start: 5,
        note: 'Tốt'
    },
    {
        start: 5,
        note: 'Đóng gói sản phẩm chắc chắn và cẩn thận. Chất lương sản phẩm tuyệt vời. Giao hàng nhanh và shop tư vấn nhiệt tình. Sẽ quay lại ủng hộ shop'
    },
]
function getRandomNumber(n) {
    return Math.floor(Math.random() * (n + 1));
}
const review = () => {
    return new Promise(async (resolve, reject) => {

        const user = await User.find({})
        const product = await Product.find({}).distinct('productId')

        for (i = 0; i < product.length; i++) {
            for (j = 0; j < user.length; j++) {
                const comment = fakedata[getRandomNumber(fakedata.length - 1)];
                const newComment = await Comment.create({
                    productId: product[i],
                    user: user[j]._id,
                    star: comment.start,
                    note: comment.note
                })

            }


        }
        try {
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

module.exports = {
    review
}

