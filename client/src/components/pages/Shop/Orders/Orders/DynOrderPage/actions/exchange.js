import { setOrderState } from 'src/util/helpers';
import { validateDeliv } from './../actions';
import api from 'src/util/api';

export const exchangeOrder= (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      // validate deliv data
      const res = await validateDeliv(order);
      if (!res.isValid) {
        resolve({
          success: false,
          msg: res.msg
        })
      }
      
      // create new order
      const newOrderData = {
        ...order,
        _id: undefined,
        state: 'delivering'
      }
      await api.post('/order/create', newOrderData);
      
      // set current order state: exchanged
      await setOrderState(order._id, 'exchanged');
      resolve({
        success: true
      })
    }
    catch (e) {
      reject(e);
    }
  })
}