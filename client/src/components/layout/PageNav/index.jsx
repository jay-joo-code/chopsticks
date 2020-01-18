import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import log from 'src/util/log';
import updateQuery from 'src/util/path/updateQuery';
import { useHistory, useLocation } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PageElt = styled.div`
  cursor: pointer;
  margin: 0 .5rem;
  font-weight: ${props => props.current ? 'bold' : '300'};
`

const PageNav = ({ metadata, ...rest }) => {
  const { page, totalPages } = metadata;
  const [pageArr, setPageArr] = useState([]);
  useEffect(() => {
    setPageArr(new Array(totalPages).fill(1))
  }, [totalPages])
  
  const history = useHistory();
  const location = useLocation();
  const handlePageChange = (newPage) => {
    const query = {
      page: newPage
    }
    updateQuery(query, location, history);
  }
  
  return (
    <Container {...rest}>
      {pageArr.map((elt, i) => (
        <PageElt 
          key={Math.random()} 
          current={page === i + 1} 
          onClick={() => handlePageChange(i + 1)}
        >
          {i + 1}
        </PageElt>
      ))}
    </Container>
  )
};

export default PageNav;
