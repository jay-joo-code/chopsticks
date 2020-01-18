import qs from 'qs';

const updateQuery = (query, location, history) => {
  const prevQuery = qs.parse(location.search.split('?')[1]);
  
}

export default updateQuery;