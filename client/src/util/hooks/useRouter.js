import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
import { useMemo } from 'react';
import queryString from 'query-string';

export default function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  
  const query = {
    ...queryString.parse(location.search), // Convert string to object
    ...params
  }
  
  const setQuery = (newQuery) => {
    const queryStr = queryString.stringify(newQuery);
    const newPath = `${location.pathname}?${queryStr}`;
    history.push(newPath);
  }
  
  const updateQuery = (queryObj) => {
    const newQuery = Object.assign({}, query, queryObj);
    setQuery(newQuery);
  }

  const updatePathAndQuery = (path, queryObj) => {
    const newQuery = Object.assign({}, query, queryObj);
    const queryStr = queryString.stringify(newQuery);
    const newPath = `${path}?${queryStr}`;
    history.push(newPath);
  }

  return useMemo(() => {
    return {
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      query,
      updateQuery,
      updatePathAndQuery,
      match,
      location,
      history
    };

  }, [params, match, location, history]);

}
