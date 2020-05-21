import api from 'src/util/api';
import log from 'src/util/log';
import { sendAlertOnEvent } from 'src/util/bizm';

export const cancelOrder = (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      await api.post(`/order/${order._id}/cancel`);
          
      // 취소 승인 알림톡
      const number = order.deliv.mobile;
      const data = {
        itemName: order.cartObj.item.name,
        sellerName: order.seller.shop.title,
        buyerName: order.buyer.name,
        price: order.cartObj.price,
        transactionMethod: order.bootpay.method,
      }
      await sendAlertOnEvent(number, 'CANCEL_APPROVED', data);
      resolve();
    }
    catch (e) {
      log('ERROR actions/cancelOrder', e)
      reject(e);
    }
  })
}