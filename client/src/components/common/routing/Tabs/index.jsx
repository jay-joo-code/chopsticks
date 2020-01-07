import React from 'react';
import styled from 'styled-components';

const Container = styled.div `

`;

const Tabs = (props) => {
  const { options } = props;

  return (
    <Container>
        <div class="o_tap">
                <ul>
                {options.map((opt) => (
                  <li>
                    <a>{opt.text}</a>
                  </li>
                ))}
                </ul>
            </div>
    </Container>
  )
};

export default Tabs;
