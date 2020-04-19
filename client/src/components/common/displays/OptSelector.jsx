import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const OptSelector = () => {
  return (
    <Container>
      {item.optGrps.map((optGrp, optGrpIndex) => (
          <SelectCont>
            <Select
              value={optionsIndex[optGrpIndex] || ''}
              onChange={(e) => handleOptChange(e, optGrpIndex)}
              placeholder={optGrp.title}
            >
              {optGrp.opts.map((opt, i) => {
                let curIndex = [...optionsIndex];
                curIndex.splice(optGrpIndex, 1, `${i}`);
                const curOpt = findOptByIndex(curIndex)
                
                const dispStr = isLastOpt && curOpt
                  ? formatOptStr(curOpt)
                  : opt;
                  
                return (
                  <option key={opt} value={i}>
                    {dispStr}
                  </option>
                )
              })}
            </Select>
          </SelectCont>
        ))}
    </Container>
  )
};

export default OptSelector;
