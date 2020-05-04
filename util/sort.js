const sortRandom = (data) => {
  return data.sort((a, b) => a.sortIndex - b.sortIndex);
};

const sortRecent = (data) => {
  const sortedData = data.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  return sortedData;
};

const sortPriceLow = (data) => {
  return data.sort((a, b) => a.price - b.price);
};

const sortPriceHigh = (data) => {
  return data.sort((a, b) => b.price - a.price);
};

module.exports = {
  sortRecent,
  sortPriceLow,
  sortPriceHigh,
  sortRandom,
};