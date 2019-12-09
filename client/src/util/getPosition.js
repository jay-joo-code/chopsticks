const getLocation = () => {
  window.navigator.geolocation.getCurrentPosition((position) => {
    return position;
  });
}

export default getLocation;