import cfg from 'src/config';

const trackerUrl = (order) => {
  const { companyCode, invoice } = order.deliv;
  return `${cfg.T_BASE}/trackingInfo?t_key=${cfg.T_KEY}&t_code=${companyCode}&t_invoice=${invoice}` 
}

export default trackerUrl;