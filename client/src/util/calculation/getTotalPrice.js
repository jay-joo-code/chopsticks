const getTotalPrice = (cartObj) => {
  const { item, quantity, optionsIndex } = cartObj;
  const optOne = item.options.length > 0 && item.options[optionsIndex[0]];
  const optTwo = item.optionsTwo.length > 0 && item.optionsTwo[optionsIndex[1]];
  const totalPrice = (item.price + (optOne.priceChange || 0) + (optTwo.priceChange || 0)) * quantity;
  return totalPrice;
}

export default getTotalPrice;