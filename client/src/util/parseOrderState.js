
const orderStateToString = (state) => {
  const stateMap = {
    'pending': '배송전',
    'delivering': '배송중',
    'complete': '배송완료',
    'exchangePending': '교환대기',
    'exchanged': '교환완료',
    'refundPending': '환불대기',
    'refunded': '환불완료',
    'cancelPending': '취소대기',
    'canceled': '취소완료',
    'error': '오류'
  }
  return stateMap[state];
}

const orderStateToActions = (state) => {
  const actionsMap = {
    'pending': ['취소문의'],
    'delivering': ['배송추적', '환불/교환 문의'],
    'complete': ['배송추적', '환불/교환 문의', '리뷰쓰기'],
    'exchangePending': [],
    'exchanged': [],
    'refundPending': [],
    'refunded': [],
    'cancelPending': [],
    'canceled': [],
    'error': []
  }
  return actionsMap[state];
}

export {
  orderStateToString,
  orderStateToActions
};