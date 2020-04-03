export const cartObjToOptsString = (cartObj) => {
  if (!cartObj || !cartObj.item.optGrps) return '';
  
  const strArray = cartObj.item.optGrps.map((optGrp, i) => {
    return optGrp.opts[cartObj.optionsIndex[i]].name
  })
  return strArray.join(', ')
}