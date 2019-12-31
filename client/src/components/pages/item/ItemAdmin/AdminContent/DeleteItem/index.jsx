import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/common/Button';
import axios from 'axios';
import log from 'src/util/log';
import { useHistory } from 'react-router-dom';

const Container = styled.div`

`;

const DeleteItem = (props) => {
  const history = useHistory();
  const handleDelete = () => {
    const itemId = props._id;
    axios.delete(`/api/item/${itemId}/delete`)
      .then(() => {
        alert('상품이 성공적으로 삭제됬습니다');
        history.push('/profile/items');
      })
      .catch((e) => {
        log('ERROR deleting item', e);
      });
  };
  return (
    <Container>
      <Button onClick={handleDelete} danger inverted>상품 삭제</Button>
    </Container>
  );
};

export default DeleteItem;
