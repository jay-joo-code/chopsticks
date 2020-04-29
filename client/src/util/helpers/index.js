import api from 'src/util/api';
import log from 'src/util/log';
import axios from 'axios';
import trackerUrl from 'src/util/path/trackerUrl';

export const cartObjToOptsString = (cartObj) => {
  if (!cartObj || !cartObj.item.optGrps) return '';
  
  const strArray = cartObj.item.optGrps.map((optGrp, i) => {
    return optGrp.opts[cartObj.optionsIndex[i]].name
  })
  return strArray.join(', ')
}

// if delivery is complete
// automatically update state: delivering to complete
export const updateDelivState = async (uid, userType) => {
  try {
    const { data: orders } = await api.get(`/order/${userType}/${uid}?state=delivering`);
    orders.map( async (order) => {
      const { data } = await axios.get(trackerUrl(order));
      if (data.complete) {
        await api.put(`/order/${order._id}/update`, { state: 'complete' })
      }
    })
  } catch (e) {
    log(`ERROR updateDelivState`, e)
  }
}

export const setOrderState = (orderId, newState, stateMsg) => {
  return new Promise((resolve, reject) => {
    const data = {
      state: newState,
      stateMsg: stateMsg || undefined
    }
    api.put(`/order/${orderId}/update`, data)
      .then((res) => {
        resolve(res.data)
      })
      .catch((e) => reject(e))
  })
}

export const isSoldout = (item) => {
  if (item.madeOnOrder) return false;
  
  if (item.optData.length !== 0) {
    let allItemsSoldOut = true;
    item.optData.map((opt) => {
      if (opt.qty !== 0) allItemsSoldOut = false;
    })
    return allItemsSoldOut;
  }
  else {
    if (item.stock === 0) return true;
  }
}