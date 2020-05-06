import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import updateQuery from 'src/util/path/updateQuery';
import getQuery from 'src/util/path/getQuery';
import { useHistory, useLocation } from 'react-router-dom';

const Container = styled.div`

`;

const CustomSelect = styled(Select)`
  font-size: .7rem;
  overflow: visible;
`;

const SortBy = () => {
  const [sortCode, setSortCode] = useState('');
  const sortList = [{
    text: '랜덤순',
    code: 'random',
  },
  {
    text: '최신순',
    code: 'recent',
  },
  {
    text: '가격 (낮은순)',
    code: 'priceLow',
  },
  {
    text: '가격 (높은순)',
    code: 'priceHigh',
  }];

  const history = useHistory();
  const location = useLocation();
  const handleChange = (e) => {
    const { value } = e.target;
    const query = { sort: value };
    updateQuery(query, location, history);
  };

  useEffect(() => {
    const query = getQuery(location);
    setSortCode(query.sort);
  }, [location]);

  return (
    <Container>
      <CustomSelect value={sortCode} onChange={handleChange}>
        {sortList.map((sortElt) => (
          <option key={sortElt.text} value={sortElt.code}>{sortElt.text}</option>
        ))}
      </CustomSelect>
    </Container>
  );
};

export default SortBy;
