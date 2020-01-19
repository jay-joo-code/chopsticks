import React, { useState } from 'react';
import styled from 'styled-components';
import PopupButton from 'src/components/common/buttons/PopupButton';
import Slider from '@material-ui/core/Slider';
import { useLocation, useHistory } from 'react-router-dom';
import log from 'src/util/log';
import qs from 'qs';
import RedButton from 'src/components/common/buttons/RedButton';
import updateQuery from 'src/util/path/updateQuery';

const Container = styled.div`
  display: inline-block;
`;

const ContentContainer = styled.div`
  width: 250px;
  max-width: 100%;
  padding-top: 2rem;
`;

const BtnCont = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Price = () => {
  const location = useLocation();
  const history = useHistory();
  const MAX = 10;
  const [value, setValue] = useState([0, MAX]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSearch = () => {
    const query = {
      minPrice: value[0],
      maxPrice: value[1],
    };
    updateQuery(query, location, history);
    setActive(false);
    setBtnText(`${value[0]}만원 ~ ${value[1]}만원`);
  };
  const [active, setActive] = useState(false);
  const [btnText, setBtnText] = useState('가격');
  const content = (
    <ContentContainer>
      <Slider
        value={value}
        max={MAX}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
      <BtnCont>
        <RedButton green onClick={handleSearch}>적용</RedButton>
      </BtnCont>
    </ContentContainer>
  );

  return (
    <Container>
      <PopupButton
        btnText={btnText}
        label="가격 (만원)"
        popupContent={content}
        active={active}
        setActive={setActive}
      />
    </Container>
  );
};

export default Price;
