import React from 'react';
import styled from 'styled-components';
import Tabs from './Tabs';
import MainImg from './MainImg';
import Owner from './Owner';
import Purchase from './Purchase';
import useCurrentItem from 'src/util/hooks/useCurrentItem';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    flex-wrap: nowrap;
  }
`;

const Col = styled.div`
  width: 100%;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: auto;
    width: ${props => props.sidebar ? '310px' : ''};
  }
`

const ItemPub = () => {
  const item = useCurrentItem();
  
  if (!item) return <div />;
  
  return (
    <Container>
      <Col sidebar>
       <Owner item={item} />
      </Col>
      <Col>
        <MainImg item={item} />
        <Tabs />
      </Col>
      <Col sidebar>
        <Purchase item={item} />
      </Col>
    </Container>
  );
};

export default ItemPub;
