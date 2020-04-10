import React from 'react';
import styled from 'styled-components';
import TabbedPage from 'src/components/layout/TabbedPage';

import BasicInfo from './BasicInfo';
import Policies from './Policies';
import CompanyInfo from './CompanyInfo';

const Container = styled.div`
`;

const Settings = ({ user }) => {
  const pages = [{
    name: '기본정보',
    component: <BasicInfo user={user} />,
  }, {
    name: '배송 / 정책',
    component: <Policies user={user} />,
  }, {
    name: '사업자 정보',
    component: <CompanyInfo user={user} />,
  }];
  return (
    <Container>
      <TabbedPage
        pages={pages}
      />
    </Container>
  );
};

export default Settings;
