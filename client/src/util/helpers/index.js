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
// update state: delivering to complete
export const updateDelivState = async (uid, userType) => {
  try {
    const { data: orders } = await api.get(`/order/${userType}/${uid}?state=delivering`)
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