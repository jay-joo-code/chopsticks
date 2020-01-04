import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import RedButton from 'src/components/common/buttons/RedButton';

import { useSelector } from 'react-redux';
import log from 'src/util/log';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Intro = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const handleApplicationAttempt = () => {
    log('click');
    if (!user) {
      history.push('/login');
    } else {
      history.push('/shop/apply');
    }
  };
  return (
    <div id="container">
      <div className="shop_op">
        <p className="txt">Millions of shoppers can’t wait to see what you have in store</p>
        <ButtonContainer>
          <RedButton onClick={handleApplicationAttempt}>샵 오픈 신청하기</RedButton>
        </ButtonContainer>
        <div className="terms">
          <ul>
            <li>
              <p className="tlt">
                            1. Overview
              </p>
              <p className="cont">
                            Chopsticks is an online marketplace for buying and selling independent design products. But we're more than a shopping site; we provide a community for talented independent designers worldwide.
              </p>
            </li>
            <li>
              <p className="tlt">
                            2. Benifits
              </p>
              <p className="cont">
                            Showcase your designs to the right customers Chopsticks members are design lovers who will understand and appreciate your work. Simple and user-friendly shop management tool Creating listings, processing orders, and managing your shop become effortless, so you can focus on what really matters—your designs!
              </p>
            </li>
            <li>
              <p className="tlt">
                            3. Fees
              </p>
              <p className="cont">
                            Transaction Fee:
                            Chopsticks will collect a transaction fee (this fee includes a “selling fee” and “payment processing
                            fee”) for each order. This fee will only be collected for successful sales transactions.
                            The transaction fee is calculated in the following manner: transaction fee = (product price +
                            shipping fees) *15% + NT$ 15
              </p>
            </li>
            <li>
              <p className="tlt">
                            4. What can be sold on Chopsticks
              </p>
              <p className="cont">
                            Original design: a product that is designed and/or created by a designer. Its design should show originality. The product should not be listed as a prohibited item in the Allowed & Prohibited Items policy.
              </p>
            </li>
            <li>
              <p className="tlt">
                            5. Responsibilities
              </p>
              <p className="cont">
                            Shop management
                            Original design: a product that is designed and/or created by a designer. Its design should show originality. The product should not be listed as a prohibited item in the Allowed & Prohibited Items policy.
                <br />
                            Online support
                            Original design: a product that is designed and/or created by a designer. Its design should show originality. The product should not be listed as a prohibited item in the Allowed & Prohibited Items policy.
              </p>
            </li>
            <li>
              <p className="tlt">
                            6. Final note
              </p>
              <p className="cont">
                            Chopsticks strictly forbids under-the-table selling as well as listing violations of the Allowed & Prohibited Items policy. We have invested to make Chopsticks a presence in Asia and the world, so that more people can see great designs—like yours! Let's collaborate on a level of mutual respect for each other's professionalism and specialization.
              </p>
            </li>
          </ul>
        </div>
        <ButtonContainer>
          <RedButton onClick={handleApplicationAttempt}>샵 오픈 신청하기</RedButton>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default Intro;
