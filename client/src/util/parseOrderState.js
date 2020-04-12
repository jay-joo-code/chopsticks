
const orderStateToString = (state) => {
  const stateMap = {
    'new': '배송전',
    'pending': '배송전',
    'delivering': '배송중',
    'complete': '배송완료',
    'exchangeRequested': '교환대기',
    'exchangePending': '교환대기',
    'exchangeRejected': '교환거절',
    'exchanged': '교환완료',
    'refundRequested': '환불대기',
    'refundPending': '환불대기',
    'refundRjected': '환불거절',
    'refunded': '환불완료',
    'cancelRequested': '취소대기',
    'cancelRejected': '취소거절',
    'canceled': '취소완료',
    'error': '오류'
  }
  return stateMap[state];
}

const orderStateToActions = (state) => {
  const actionsMap = {
    'new': ['취소문의'],
    'pending': ['취소문의'],
    'delivering': ['배송추적', '교환문의', '환불문의'],
    'complete': ['배송추적', '교환문의', '환불문의']
  }
  return actionsMap[state];
}

export {
  orderStateToString,
  orderStateToActions
};