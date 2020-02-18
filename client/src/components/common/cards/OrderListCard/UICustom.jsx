import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import OrderPopup from './OrderPopup';

const Wrapper = styled.div`
  
`

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
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    flex-direction: row;
    align-items: center;
    padding: .5rem 0;
  }
`;

const ShowOn = styled.div`
  display: ${props => props.display === 'desktop' ? 'none' : 'block'};
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    display: ${props => props.display === 'desktop' ? 'block' : 'none'};
  }
`

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
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    width: ${props => props.width};
    padding: 0;
  }
`

const DisplayGroup = styled.div`
  display: flex;
  margin: 1rem 0;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    margin: 0;
  }
` 

const Text = styled.p`
  font-size: ${props => props.size === 'sm' ? '10px' : '12px'};
  line-height: 1rem;
`

const Img = styled.img`
  object-fit: cover;
  height: 3rem;
  width: 3rem;
`

const DotContainer = styled.button`
  padding: 0 1rem;
  background: inherit;
  z-index: 20;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    padding: 0;
  }
`

const Dot = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  opacity: .8;
  line-height: 0rem;
  margin-bottom: .4rem;
`

const Menu = styled.div`
  position: absolute;
  right: -4.5rem;
  top: 0;
  width: 4rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MenuOpt = styled.button`
  font-size: .7rem;
  margin: .3rem 0;
  background: inherit;
`

const OrderListCardUICustom = ({ order, colWidths, imgSrc, name, orderDesc, date, btn, handleCancel, selected, setSelected }) => {
  // menu
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu)
  };
  const canCancel = order.state === 'pending' || order.state === 'delivering';
  
  const menu = (
    <DotContainer
      type='button'
      onClick={toggleMenu}
    >
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
    </DotContainer>
    )
  
  // checkbox
  const handleCheckboxChange = (e) => {
    if (e.target.checked && !selected.includes(order._id)) {
      // selecting an unselected elt
      let newSelected = [...selected];
      newSelected.push(order._id);
      setSelected(newSelected);
    } 
    else if (!e.target.checked && selected.includes(order._id)) {
      // unselecting a selected elt
      let newSelected = [...selected]
      newSelected.splice(selected.indexOf(order._id), 1);
      setSelected(newSelected);
    }
  }
  
  // details popup
  const [showPopup, setShowPopup] = useState(0);
  const openPopup = (e) => {
    setShowPopup(1);
  };
  const closePopup = () => setShowPopup(0);
  
  return (
    <Wrapper 
    >
    <OrderPopup 
      showPopup={showPopup}
      setShowPopup={setShowPopup}
      order={order}
    />
    <Container
      onClick={openPopup}
      type='button'
    >
      <DisplayGroup>
        <Col width={colWidths[0]}>
          <input 
            type="checkbox" 
            checked={selected.includes(order._id) ? 1 : 0}
            onChange={handleCheckboxChange}
          />
        </Col>
      <Col width={colWidths[1]}>
        <Text size='sm'>{order.bootpay.receipt_id}</Text>
        <Text>{order.deliv.recipient}</Text>
      </Col>
      <ShowOn display='mobile'>
          {menu}
        </ShowOn>
      </DisplayGroup>
      <Link to={`/item/${order.cartObj.item._id}`}>
        <DisplayGroup>
          <Col width={colWidths[2]}>
            <Img src={imgSrc} />
          </Col>
          <Col width={colWidths[3]}>
            <Text>{name}</Text>
            <Text size='sm'>{orderDesc}</Text>
            <Text>{`${order.cartObj.price.toLocaleString()}원`}</Text>
          </Col>
        </DisplayGroup>
      </Link>
      <Col width={colWidths[4]}>
        <Text>{date}</Text>
      </Col>
      <Col width={colWidths[5]}>
        
      </Col>
      <Col width={colWidths[6]}>
        
      </Col>
      <DisplayGroup>
        <Col width={colWidths[7]}>
          {btn}
        </Col>
      </DisplayGroup>
      <Col width={colWidths[8]}>
        <ShowOn display='desktop'>
          {menu}
        </ShowOn>
      </Col>
      {showMenu && (
        <Menu>
          {canCancel && (<MenuOpt 
            type='button'
            onClick={handleCancel}
          >취소</MenuOpt>)}
          <MenuOpt 
            type='button'
          >주문내역</MenuOpt>
        </Menu>
      )}
    </Container>
  </Wrapper>
  )
};

export default OrderListCardUICustom;
