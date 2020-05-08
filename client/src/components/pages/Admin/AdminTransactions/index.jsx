import React, { useState, useEffect } from 'react';
import api from 'src/util/api';
import log from 'src/util/log';
import styled from 'styled-components';
import TransactionsTable from './TransactionsTable';
import Loading from 'src/components/common/displays/Loading';

const Container = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const MonthSection = styled.div`
  margin-bottom: 2rem;
  display: flex;
`;

const Arrow = styled.button`
  padding: 0 .5rem;
  opacity: .6;
  background: inherit;
`;

const Month = styled.p`
  font-weight: bold;
`;

const AdminTransactions = () => {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const embedRevenue = (sellers) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: orders } = await api.get('/order');
        let sellersWithRevenue = [...sellers].map((seller) => {
          const monthlyOrders = orders.filter((order) => {
            const isSellersOrder = order.seller._id === seller._id;
            const isTargetMonthsOrder = new Date(order.createdAt).getMonth() === monthIndex;
            return isSellersOrder && isTargetMonthsOrder;
          });
          const accumulator = (acc = 0, order) => acc + order.cartObj.price;
          const monthlyRevenue = monthlyOrders.reduce(accumulator, 0);
          return {
            ...seller,
            monthlyRevenue
          }
        });
        resolve(sellersWithRevenue)
      }
      catch (e) {
        reject(e);
      }
    })
  }
  
  const reload = () => {
    setLoading(true);
    api.get(`/user`)
      .then((res) => {
        const sellers = res.data.filter((user) => user.shop.applied && user.shop.accepted);
        embedRevenue(sellers)
          .then((sellersWithRevenue) => {
            setSellers(sellersWithRevenue);
            setLoading(false);
          })
          .catch((e) => {
            log('ERROR AdminTransactions', e)
            setLoading(false);
          })
      })
      .catch((e) => {
        log('ERROR AdminTransactions', e)
        setLoading(false);
      })
  }
  
  // seller initial load
  useEffect(() => {
    reload();
  }, [])
  
  // recompute revenue data for each seller on monthIndex change
  useEffect(() => {
    setLoading(true);
    embedRevenue(sellers)
      .then((sellersWithRevenue) => {
        setSellers(sellersWithRevenue);
        setLoading(false);
      })
      .catch((e) => {
        log('ERROR AdminTransactions', e);
        setLoading(false);
      })
  }, [monthIndex])
  
  const changeMonth = (val) => {
    let newIndex = monthIndex + val;
    if (newIndex < 0) newIndex = 0;
    if (newIndex > 11) newIndex = 11;
    setMonthIndex(newIndex);
  };
  
  return (
    <Container>
      <MonthSection>
        <Arrow
          type="button"
          onClick={() => changeMonth(-1)}
        >
          {'<'}
        </Arrow>
        <Month>{`${monthIndex + 1}월`}</Month>
        <Arrow
          type="button"
          onClick={() => changeMonth(1)}
        >
          {'>'}
        </Arrow>
      </MonthSection>
      {loading
        ? <Loading />
        : <TransactionsTable
            sellers={sellers}
            setSellers={setSellers}
            reload={reload}
            monthIndex={monthIndex}
          />
      }
    </Container>
  );
};

export default AdminTransactions;
