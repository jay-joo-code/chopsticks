import axios from 'axios';
import log from 'src/util/log';

const BASE_DEV = 'https://dev-alimtalk-api.bizmsg.kr:1443';
const BASE_PROD = 'https://alimtalk-api.bizmsg.kr';

const bizm = axios.create({
  baseURL: BASE_PROD,
  headers: {'userid': 'chopsticks'}
});

const formatNumber = (number) => {
  return '+82' + number.substr(1);
}

export const sendAlert = (number) => {
  const data = [{
    'message_type': 'AT',
    'phn': formatNumber(number),
    'profile': 'beaed98a65b993e706e963a8aa941c2db48e4938',
    'reserveDt': '00000000000000',
    'tmplId': 'chopsticks_template_01',
    'msg': '홍길동님의 택배가 (시간)에 발송되었습니다. '
  }]
  
  bizm.post(`/v2/sender/send`, data)
    .then((res) => {
      log('sendAlert res', res);
    })
    .catch((e) => {
      log('sendAlert error', e);
    })
}

export const sendAlertOnEvent = (number, event, data) => {
  const eventToConfig = {
    'NEW_ORDER': {
      'msg': newOrderMsg(data),
      'tmplId': 'chopsticks_03'
    },
    'ORDER_STATE_CHANGE': {
      'msg': orderStateChangeMsg(data),
      'tmplId': 'chopsticks_04'
    },
    'CANCEL_APPROVED': {
      'msg': cancelApprovedMsg(data),
      'tmplId': 'chopsticks_02'
    },
    'ORDER_SENT': {
      'msg': orderSentMsg(data),
      'tmplId': 'chopsticks_01'
    },
    'MOBILE_AUTH': {
      'msg': mobileAuthMsg(data),
      'tmplId': 'chopsticks_05'
    },
  }
  
  const config = [{
    'message_type': 'AT',
    'phn': formatNumber(number),
    'profile': 'beaed98a65b993e706e963a8aa941c2db48e4938',
    'reserveDt': '00000000000000',
    ...eventToConfig[event]
  }]
  
  bizm.post(`/v2/sender/send`, config)
    .then((res) => {
      log('sendAlert res', res);
    })
    .catch((e) => {
      log('sendAlert error', e);
    })
}

const newOrderMsg = ({ itemName, optsString, qty, buyerName, url }) => {
  return (`[Chopsticks] 새로운 주문이 있습니다.

◆ 상품명 : ${itemName}
◆ 옵션 : ${optsString}
◆ 수량 : ${qty}

◆ 구매자 : ${buyerName}

◆ 주문 확인 : ${url}
`)
}

const orderStateChangeMsg = ({ itemName, optsString, qty, buyerName, newState, url }) => {
  return (`[Chopsticks] ${newState} 신청이 있습니다.

◆ 상품명 : ${itemName}
◆ 옵션 : ${optsString}
◆ 수량 : ${qty}

◆ 구매자 : ${buyerName}

◆ ${newState} 신청 확인 : ${url}
`)
}

const cancelApprovedMsg = ({ itemName, sellerName, buyerName, price, transactionMethod }) => {
  return (`안녕하세요. Chopsticks입니다.

${buyerName}님의 결제 취소 승인이 완료되었습니다.

◆ 상품명 : ${itemName}
◆ Designed by ${sellerName}

◆ 취소금액 : ${`${price}원`}
◆ 결제수단 : ${transactionMethod}

결제수단에 따라 영업일 기준 1~5일 이후 환불금액 확인이 가능합니다. 
`)
}

const orderSentMsg = ({ itemName, shopTitle, buyerName, delivCompany, invoice, url }) => {
  return (`안녕하세요. Chopsticks입니다.

${buyerName}님께서 주문하신 상품이 발송되었습니다.

◆ 상품명 : ${itemName}
◆ Designed by ${shopTitle}

◆ 택배사 : ${delivCompany}
◆ 송장번호 : ${invoice}
◆ 배송조회 : ${url}
`)
}

const mobileAuthMsg = ({ code }) => {
  return `[${code}] 인증번호를 입력하시면 인증이 완료됩니다. `
}