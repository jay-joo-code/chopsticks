import React, { useState, useEffect } from 'react';
import log from 'src/util/log';
import api from 'src/util/api';
import styled from 'styled-components';

import ShopPopup from './ShopPopup';

const Tr = styled.tr`
  cursor: pointer;
`

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.theme.green};
`;

const AdminShops = () => {
  const [version, setVersion] = useState(0);
  const [disabledShops, setDisabledShops] = useState([]);
  const [activeShops, setActiveShops] = useState([]);

  useEffect(() => {
    api.get('/shop')
      .then((res) => {
        const allShops = res.data;
        const activeShops = [];
        const disabledShops = allShops.filter((user) => {
          if (user.shop.accepted) activeShops.push(user);
          return !user.shop.accepted;
        });
        setDisabledShops(disabledShops);
        setActiveShops(activeShops);
      })
      .catch((e) => {
        log('ERROR fetch shops admin');
      });
  }, [version]);

  const setShopState = (id, shopData, state) => {
    const data = {
      shop: {
        ...shopData,
        accepted: state,
      },
    };
    api.put(`/shop/${id}/update`, data)
      .then((res) => {
        setVersion(version + 1);
      })
      .catch((e) => {
        log('ERROR accept shop', e);
      });
  };
  
  const handleActionClick = (e, user, newState) => {
    e.stopPropagation();
    setShopState(user._id, user.shop, newState)
  }
  
  // popup
  const [displayPopup, setDisplayPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedShopType, setSelectedShopType] = useState();
  const togglePopup = (user, type) => {
    setSelectedShopType(type)
    setSelectedUser(user);
    setDisplayPopup(true);
  }

  return (
    <div className="container-fluid">
      <ShopPopup 
        display={displayPopup} 
        handleClosePopup={() => setDisplayPopup(false)}
        user={selectedUser}
        setShopState={setShopState}
        type={selectedShopType}
      />
      <div className="page-header">
        <div className="page-title">
          <Title>Shop Applications</Title>
        </div>
      </div>
      <div className="tableContainer">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Shop Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {disabledShops.map((user, i) => (
              <Tr onClick={() => togglePopup(user, 'disabled')}>
                <td width="5%">
                  {i + 1}
                </td>
                <td>
                  {user._id}
                </td>
                <td>
                  {user.shop.title}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.mobile}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-default btn-xs"
                    onClick={(e) => handleActionClick(e, user, true)}
                  >
                  Accept
                  </button>
                </td>
                <td>
                  {user.shop.createdAt}
                </td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="page-header">
        <div className="page-title">
          <Title>Active Shops</Title>
        </div>
      </div>
      <div className="tableContainer">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>ID</th>
              <th>Shop Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {activeShops.map((user, i) => (
              <Tr onClick={() => togglePopup(user, 'active')}>
                <td width="5%">
                  {i + 1}
                </td>
                <td>
                  {user._id}
                </td>
                <td>
                  {user.shop.title}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.mobile}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-default btn-xs"
                    onClick={(e) => handleActionClick(e, user, false)}
                  >
                  Disable
                  </button>
                </td>
                <td>
                  {user.shop.createdAt}
                </td>
              </Tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminShops;
