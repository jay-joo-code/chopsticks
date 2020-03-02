const getTotalPrice = (cartObj) => {
  const { item, quantity, optionsIndex } = cartObj;
  if (!item.optGrps) return item.price * quantity;
  
  const optPrices = item.optGrps.map((optGrp, i) => {
    return optGrp.opts[optionsIndex[i]].diff
  })
  const optPrice = optPrices.reduce((acc, cur) => acc + cur, 0);
  const totalPrice = (item.price + optPrice) * quantity;
  
  return totalPrice;
}

export default getTotalPrice;