import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Star } from 'src/assets/svgs/star.svg';

const Stars = styled.div`
  position: absolute;
  top: .5rem;
  right: .5rem;
  border-radius: 30px;
  font-size: 1rem;
  color: #66c088;
  font-weight: 600;
  display: flex;
  align-items: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  font-size: .6rem;
  padding: .2rem .5rem;
`;

const StyledStar = styled(Star)`
  height: .6rem;
  width: .6rem;
  margin-right: .2rem;
`;

const ReviewStars = ({ stars }) => {
  return (
    <Stars>
      <StyledStar />
      {stars}
    </Stars>
  )
};

export default ReviewStars;
