import React from 'react';
import styled from 'styled-components';
import RedButton from 'src/components/common/buttons/RedButton';

const DyncCont = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: inline-block;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SideCont = styled.div`
  margin: 1rem;
`;

const Name = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #000;
  opacity: .8;
  margin-bottom: .5rem;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.green};
`;

const BuyButton = styled(RedButton)`
  margin: .5rem 0;
`;

const Compressed = ({ item, expanded, setExpanded }) => {
  const price = item && item.price && item.price.toLocaleString('en');
  if (!item) return <div />;
  const handleClick = () => {
    setExpanded(!expanded);
  };
  return (
    <DyncCont>
      <Container>
        <SideCont>
          <Name>{item.name}</Name>
          <Price>
            {price}
원
          </Price>
        </SideCont>
        <SideCont>
          <BuyButton green rounded onClick={handleClick}>구매 정보</BuyButton>
        </SideCont>
      </Container>
    </DyncCont>
  );
};

export default Compressed;
