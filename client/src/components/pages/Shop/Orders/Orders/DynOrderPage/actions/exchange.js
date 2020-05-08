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
      
      // set current order state: delivering
      await api.put(`/order/${order._id}/update`, {
        state: 'delivering',
        deliv: order.deliv,
        stateText: '(교환건)'
      })
      resolve({
        success: true
      })
    }
    catch (e) {
      reject(e);
    }
  })
}