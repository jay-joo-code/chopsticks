const alertReducer = (state = { show: false, msg: '', color: 'primary' }, action) => {
  switch (action.type) {
    case 'ALERT_SET':
      return {
        show: action.payload.show,
        msg: action.payload.msg,
        color: action.payload.color
      };
    default:
      return state
  }
}

export default alertReducer;