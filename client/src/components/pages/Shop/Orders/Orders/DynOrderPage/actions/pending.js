import api from 'src/util/api';
import { sendAlertOnEvent } from 'src/util/bizm';

export const setDelivering = (orderData, method) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = orderData;
      
      if (method === 'byId') {
        const orderRes = await api.get(`/order/${orderData}`);
        order = orderRes.data;
      }
            
      await api.put(`/order/${order._id}/update`, { state: 'delivering' });
      
      // bizm alert
      const number = order.buyer.mobile
      const data = {
        itemName: order.cartObj.item.name,
        shopTitle: order.seller.shop.title,
        buyerName: order.buyer.name,
        delivCompany: order.deliv.company,
        invoice: order.deliv.invoice,
        url: 'https://chopsticks.market/profile/orders'
      }
      sendAlertOnEvent(number, 'ORDER_SENT', data);
      resolve();
    }
    catch (e) {
      reject(e);
    }
  })
}