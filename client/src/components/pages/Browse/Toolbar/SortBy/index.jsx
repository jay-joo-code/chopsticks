import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';

const Container = styled.div`

`;

const CustomSelect = styled(Select)`
  font-size: .7rem;
  overflow: visible;
`

const SortBy = () => {
  const [sortCode, setSortCode] = useState('');
  const sortList = [{
    text: '정렬',
    code: ''
  },
  {
    text: '인기순',
    code: 'popular'
  },
  {
    text: '최신순',
    code: 'recent'
  },
  {
    text: '가격 (낮은순)',
    code: 'priceLow'
  },
  {
    text: '가격 (높은순)',
    code: 'priceHigh'
  }];
  
  const handleChange = (e) => setSortCode(e.target.value);
  useEffect(() => {
    
  }, [sortCode])
  
  return (
    <Container>
      <CustomSelect value={sortCode} onChange={handleChange}>
        {sortList.map((sortElt) => (
          <option key={sortElt.text} value={sortElt.code}>{sortElt.text}</option>
        ))}
      </CustomSelect>
    </Container>
  )
};

export default SortBy;