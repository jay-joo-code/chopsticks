import api from 'src/util/api';
import { setOrderState } from 'src/util/helpers';

export const refundOrder = (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('order', order);
      await api.post(`/order/${order._id}/cancel`);
      await setOrderState(order._id, 'refunded');
      resolve();
    }
    catch (e) {
      reject(e);
    }
  })
}