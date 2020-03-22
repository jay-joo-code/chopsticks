const trackerUrl = (order) => {
  const { companyCode, invoice } = order.deliv;
  const { REACT_APP_TRACKER_BASE, REACT_APP_TRACKER_KEY } = process.env;
  return `${REACT_APP_TRACKER_BASE}/trackingInfo?t_key=${REACT_APP_TRACKER_KEY}&t_code=${companyCode}&t_invoice=${invoice}` 
}

export default trackerUrl;