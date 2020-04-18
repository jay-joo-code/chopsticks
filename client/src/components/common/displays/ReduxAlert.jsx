import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'src/components/common/displays/Alert';

const ReduxAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  
  const setShow = (state) => {
    dispatch({
      type: 'ALERT_SET', 
      payload: {
        show: false
      }
    })
  }
  
  return (
    <Alert
      show={alert.show}
      msg={alert.msg}
      setShow={setShow}
      color={alert.color}
    />
  )
};

export default ReduxAlert;
