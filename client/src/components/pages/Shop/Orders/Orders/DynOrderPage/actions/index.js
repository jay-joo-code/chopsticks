import trackerUrl from 'src/util/path/trackerUrl';
import axios from 'axios';

export const validateDeliv = (order) => {
  return new Promise((resolve, reject) => {
    const { company, companyCode, invoice } = order.deliv;
    if (!company || !companyCode || !invoice) {
      resolve({ isValid: false, msg: '택배사 / 송장번호를 입력해주세요'});
    }
    
    axios.get(trackerUrl(order))
      .then((res) => {
        if (res.data.result === 'Y') {
          resolve({ isValid: true })
        }
        else if (res.data.code === '105') {
          resolve({ isValid: false, msg: res.data.msg })
        }
        else {
          resolve({ isValid: false, msg: '운송장이 아직 등록되지 않았거나 잘못된 운송장번호입니다.'});
        }
      })
      .catch((e) => reject(e))
  })
}