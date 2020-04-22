const getTotalPrice = (cartObj) => {
  const { item, quantity, diff } = cartObj;
  
  if (!item.optGrps) return item.price * quantity;
  else return (item.price + diff) * quantity;
}

export default getTotalPrice;