import React from 'react';
import { Link } from 'react-router-dom';
import MsgPageContainer from 'src/containers/MsgPageContainer';
import Btn from 'src/components/common/buttons/Btn';

const Pending = () => {
  const btn = (
    <Link to='/shop/apply'>
      <Btn
        color='secondary'
      >
        Open a Shop
      </Btn>
    </Link>
    )

  return (
    <MsgPageContainer
      msg='Chopsticks는 창작자 여러분의 독창적이고 개성 있는
          공예ㆍ디자인 제품을 자유롭게 선보이고 교류할 수 있는
          새로운 디자인 플레이스를 함께 만들어가고자 합니다.'
      btn={btn}
    />
  )
};

export default Pending;
