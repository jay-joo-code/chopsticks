import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import companies from './companies';

const Container = styled.div `
  font-size: .7rem;
  line-height: 1.2;
`;

const Deliv = ({ order, updateOrder }) => {
  const canEdit = ['pending', 'exchangePending'];
  const disabled = !canEdit.includes(order.state);
  
  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const [tempInvoice, setTempInvoice] = useState(order.deliv.invoice);
  const handleChange = (value, type) => {
    let updatedData;
    if (type === 'code') {
      const code = value;
      const filteredCompanies = companies.filter((company) => company["Code"] === code);
      if (!filteredCompanies.length) return;
      updatedData = {
        company: filteredCompanies[0]["Name"],
        companyCode: code,
      }
      const newOrder = {
        ...order,
        deliv: {
          ...order.deliv,
          ...updatedData,
        }
      }
      updateOrder(newOrder);
    }
    else if (type === 'invoice') {
      setTempInvoice(value);
    }
  }

  // update order.deliv.invoice to tempInvoice on blur
  const handleBlur = () => {
    const updatedData = { invoice: tempInvoice };
    const newOrder = {
      ...order,
      deliv: {
        ...order.deliv,
        ...updatedData,
      }
    }
    updateOrder(newOrder);
  }
  
  // reset deliv data when state changed to exchangePending
  useEffect(() => {
    if (order.state === 'exchangePending') {
      setTempInvoice('');
      const newOrder = {
        ...order,
        deliv: {
          ...order.deliv,
          company: '',
          companyCode: '',
          invoice: '',
        }
      }
      updateOrder(newOrder);
    }
  }, [order.state])
  
  // don't render on 새주문 페이지
  if (order.state === 'new') return <div />;
  
  return (
    <Container>
      <Select 
        onClick={stopPropagation}
        placeholder='택배사'
        onChange={(e) => handleChange(e.target.value, 'code')}
        value={order.deliv.companyCode || ''}
        width={100}
        disabled={disabled}
      >
        {companies && companies.map((company) => (
          <option key={company["Code"]} value={company["Code"]}>{company["Name"]}</option>
        ))}
      </Select>
      <OutlinedInput
        onClick={stopPropagation}
        width={100}
        value={tempInvoice}
        onChange={(e) => handleChange(e.target.value, 'invoice')}
        onBlur={handleBlur}
        disabled={disabled}
        placeholder='송장번호'
      />
    </Container>
  )
};

export default Deliv;
