import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'src/components/common/form/Select';
import OutlinedInput from 'src/components/common/form/OutlinedInput';
import api from 'src/util/api';
import log from 'src/util/log';
import companies from './companies';

const Container = styled.div `
  font-size: .7rem;
  line-height: 1.2;
`;

const Deliv = ({ order, v, setV }) => {
  const canEdit = ['pending', 'exchangePending'];
  const disabled = !canEdit.includes(order.state);
  
  const stopPropagation = (e) => {
    e.stopPropagation();
  }

  const [code, setCode] = useState(order.deliv.companyCode || '');
  const [invoice, setInvoice] = useState(order.deliv.invoice || '');
  
  useEffect(() => {
    if (!code || !companies) return;

    const company = companies.filter((company) => company["Code"] === code);

    if (!company.length) return;

    const data = {
      deliv: {
        ...order.deliv,
        company: company[0]["Name"],
        companyCode: code
      }
    }

    api.put(`/order/${order._id}/update`, data)
      .then(() => {
        setV(v + 1);
      })
      .catch((e) => {
        log(`ERROR Deliv`, e)
      })
  }, [code])
  
  useEffect(() => {
    if (!invoice) return;
    
    const data = {
      deliv: {
        ...order.deliv,
        invoice,
      }
    }
    
    api.put(`/order/${order._id}/update`, data)
      .then(() => {
        setV(v + 1);
      })
      .catch((e) => {
        log(`ERROR Deliv`, e)
      })
  }, [invoice])
  
  return (
    <Container>
      <Select 
        onClick={stopPropagation}
        placeholder='택배사'
        onChange={(e) => setCode(e.target.value)}
        value={code}
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
        grey
        value={invoice}
        onChange={(e) => setInvoice(e.target.value)}
        disabled={disabled}
        placeholder='송장번호'
      />
    </Container>
  )
};

export default Deliv;
