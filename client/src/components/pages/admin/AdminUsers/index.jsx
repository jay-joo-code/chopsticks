import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from 'src/components/common/fonts/Heading';
import api from 'src/util/api';
import log from 'src/util/log';

const Container = styled.div`

`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    api.get('/user')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((e) => log(`ERROR AdminUsers`, e))
  }, [])
  
  return (
    <Container>
      <Row>
        <Heading>유저</Heading>
        <p>{users.length}명</p>
      </Row>
      <div className="tableContainer">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>이메일</th>
              <th>이름</th>
              <th>휴대전화</th>
              <th>샵 정보</th>
              <th>가입일자</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr>
                <td width="5%">
                  {i + 1}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.mobile}
                </td>
                <td>
                  {user.shop.title}
                </td>
                <td>
                  {user.shop.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  )
};

export default AdminUsers;
