import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import OrderPopup from './OrderPopup';
import MenuBtn from './MenuBtn';
import Menu from './Menu';
import ActionBtn from '../ActionBtn';
import Checkbox from './Checkbox';

const Wrapper = styled.div`
  
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  background: white;
  margin: .5rem 0 0 0;
  position: relative;
  cursor: pointer;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    flex-direction: row;
    align-items: center;
    padding: .5rem 0;
  }
`;

const ShowOn = styled.div`
  display: ${(props) => (props.display === 'desktop' ? 'none' : 'block')};
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    display: ${(props) => (props.display === 'desktop' ? 'block' : 'none')};
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: .9;
  width: auto;
  padding: 0 1rem;
  overflow: hidden;
  white-space: initial;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    width: ${(props) => props.width};
    padding: 0;
  }
`;

const DisplayGroup = styled.div`
  display: flex;
  margin: 1rem 0;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    margin: 0;
  }
`;

const Text = styled.p`
  font-size: ${(props) => (props.size === 'sm' ? '10px' : '12px')};
  line-height: 1rem;
`;

const Img = styled.img`
  object-fit: cover;
  height: 3rem;
  width: 3rem;
`;

const OrderListCardIndex = ({
  order, colWidths, v, setV, selected, setSelected,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(0);
  const openPopup = (e) => {
    setShowPopup(1);
  };

  // text formatting
  const {
    image, images, primaryImageIndex, name, optGrps,
  } = order.cartObj.item;
  const imgSrc = image || images[primaryImageIndex];
  const idx = order.cartObj.optionsIndex;
  const opts = optGrps && optGrps.map((optGrp, i) => optGrp.opts[idx[i]].name).join(' ')
  const orderDesc = `수량 ${order.cartObj.quantity}, 옵션 ${opts || '없음'}`;
  const date = new Date(order.createdAt).toLocaleDateString('ko-KR');

  if (!order) return <div />;

  return (
    <Wrapper>
      <Container
        onClick={openPopup}
        type="button"
      >
        <DisplayGroup>
          <Col width={colWidths[0]}>
            <Checkbox
              order={order}
              selected={selected}
              setSelected={setSelected}
            />
          </Col>
          <Col width={colWidths[1]}>
            <Text size="sm">{order.bootpay.receipt_id}</Text>
            <Text>{order.deliv.recipient}</Text>
          </Col>
          <ShowOn display="mobile">
            <MenuBtn
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          </ShowOn>
        </DisplayGroup>
        <Link to={`/item/${order.cartObj.item._id}`}>
          <DisplayGroup>
            <Col width={colWidths[2]}>
              <Img src={imgSrc} />
            </Col>
            <Col width={colWidths[3]}>
              <Text>{name}</Text>
              <Text size="sm">{orderDesc}</Text>
              <Text>{`${order.cartObj.price.toLocaleString()}원`}</Text>
            </Col>
          </DisplayGroup>
        </Link>
        <Col width={colWidths[4]}>
          <Text>{date}</Text>
        </Col>
        <Col width={colWidths[5]} />
        <Col width={colWidths[6]} />
        <DisplayGroup>
          <Col width={colWidths[7]}>
            <ActionBtn
              order={order}
              v={v}
              setV={setV}
            />
          </Col>
        </DisplayGroup>
        <Col width={colWidths[8]}>
          <ShowOn display="desktop">
            <MenuBtn
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
          </ShowOn>
        </Col>
        <Menu
          order={order}
          setV={setV}
          v={v}
          showMenu={showMenu}
        />
      </Container>
      <OrderPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        order={order}
      />
    </Wrapper>
  );
};

export default OrderListCardIndex;
