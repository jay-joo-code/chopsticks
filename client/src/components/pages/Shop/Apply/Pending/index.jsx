import React from 'react';
import { Link } from 'react-router-dom';
import MsgPageContainer from 'src/containers/MsgPageContainer';
import Btn from 'src/components/common/buttons/Btn';

const Pending = () => {
  const btn = (
    <Link to='/'>
      <Btn
        color='secondary'
      >
        Go Home
      </Btn>
    </Link>
    )
  
  return (
    <MsgPageContainer
      title='샵 오픈 신청이 완료되었습니다'
      msg='샵 오픈 신청은 24시간 이내로 확인 및 수락되며, 
          그 이후 상품 등록을 진행하실 수 있도록 개별 안내 드리도록 하겠습니다.'
      btn={btn}
    />
    )
};

export default Pending;
