import React, { useState, useEffect } from 'react';
import axios from 'axios';
import log from 'src/util/log';
import styled from 'styled-components';

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.green};
`

const AdminShops = () => {
  const [version, setVersion] = useState(0);
  const [disabledShops, setDisabledShops] = useState([]);
  const [activeShops, setActiveShops] = useState([]);
  
  useEffect(() => {
    axios.get('/api/shop')
      .then((res) => {
        const allShops = res.data;
        let activeShops = [];
        const disabledShops = allShops.filter((user) => {
          if (user.shop.accepted) activeShops.push(user);
          return !user.shop.accepted;
        })
        log(disabledShops)
        log(activeShops)
        setDisabledShops(disabledShops);
        setActiveShops(activeShops);
      })
      .catch((e) => {
        log(`ERROR fetch shops admin`);
      })
  }, [version])
  
  const setShopState = (id, shopData, state) => {
    const data = {
      shop: {
        ...shopData,
        accepted: state
      }
    }
    axios.put(`/api/shop/${id}/update`, data)
      .then((res) => {
        setVersion(version + 1);
      })
      .catch((e) => {
        log('ERROR accept shop', e);
      })
  }
  
  return (
    <div className="container-fluid">
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
            <tr>
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
                  type='button' 
                  className="btn btn-default btn-xs"
                  onClick={() => setShopState(user._id, user.shop, true)}
                >
                  Accept
                </button>
              </td>
              <td>
                {user.shop.createdAt}
              </td>
            </tr>
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
            <tr>
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
                  type='button' 
                  className="btn btn-default btn-xs"
                  onClick={() => setShopState(user._id, user.shop, false)}
                >
                  Disable
                </button>
              </td>
              <td>
                {user.shop.createdAt}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
  </div>
  )
};

export default AdminShops;
