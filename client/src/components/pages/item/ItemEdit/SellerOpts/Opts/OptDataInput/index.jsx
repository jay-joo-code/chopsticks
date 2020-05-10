import React, { useEffect } from 'react';
import styled from 'styled-components';
import OptDataElt from './OptDataElt';
import Body from 'src/components/common/fonts/Body';

const Container = styled.div`
  max-height: 600px;
  max-width: 800px;
  overflow: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  
  @media (min-width: ${props => props.theme.desktopContentWidth}px) {
    padding-right: 10rem;

    & > * {
      margin-left: 9rem;
    }
  }
`

const OptDataInput = ({ formik }) => {
  useEffect(() => {
    const combinations = optGrpsToCombinations(formik.values.optGrps);
    const indexes = [...allPossibleCases(...combinations)];
    const optData = indexes.map((index) => {
      const optString = index.map((optIndex, i) => {
        return formik.values.optGrps[i].opts[optIndex];
      }).join(' / ');
      
      const matches = formik.values.optData.filter((opt) => opt.optString === optString);
      if (matches.length !== 0) return matches[0];
      
      let data = {
        index,
        optString,
        qty: 0,
        diff: 0
      }
      return data;
    });
    formik.setFieldValue('optData', optData);
  }, [formik.values.optGrps])
  
  function* allPossibleCases(head = [], ...tail) {
    let remainder = tail.length ? allPossibleCases(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
  }
  
  const optGrpsToCombinations = (optGrps) => {
    if (!optGrps) return;
    
    const combinations = optGrps.map((optGrp) => {
      let res = [];
      for (let i = 0; i < optGrp.opts.length; i++ ) {
        res.push(i)
      }
      return res;
    })
    return combinations;
  }
  
  return (
    <Container>
      {formik.values.optData.length !== 0 && (
        <Header>
          <Body>추가금액</Body>
          <Body>수량</Body>
        </Header>
      )}
      {formik.values.optData && formik.values.optData.map((opt, i) => (
        <OptDataElt i={i} formik={formik} />
      ))}
    </Container>
  )
};

export default OptDataInput;
