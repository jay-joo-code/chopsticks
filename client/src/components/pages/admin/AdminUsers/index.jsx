import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Heading from 'src/components/common/fonts/Heading';
import api from 'src/util/api';
import log from 'src/util/log';
import Btn from 'src/components/common/buttons/Btn';

const Container = styled.div`

`;

const ToggleFilter = styled(Btn)`
  margin: 2rem 0;
`

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterShops, setFilterShops] = useState(false);
  
  useEffect(() => {
    api.get('/user')
      .then((res) => {
        if (filterShops) {
          const usersWithShop = res.data.filter((user) => user.shop.accepted);
          setUsers(usersWithShop)
        } else {
          setUsers(res.data);
        }
      })
      .catch((e) => log(`ERROR AdminUsers`, e))
  }, [filterShops])
  
  return (
    <Container>
      <Heading>유저</Heading>
      <ToggleFilter
        onClick={() => setFilterShops(!filterShops)}
      >
        모든 유저 / 샵 승인된 유저
      </ToggleFilter>
      <div className="tableContainer">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Shop</th>
              <th>Cart Items</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr>
                <td width="5%">
                  {i + 1}
                </td>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.shop.title}
                </td>
                <td>
                  {user.cart.length}
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
