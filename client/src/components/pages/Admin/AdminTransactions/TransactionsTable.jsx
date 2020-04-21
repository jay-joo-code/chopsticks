import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import log from 'src/util/log';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Center = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Complete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Cancel = styled.span`
  text-decoration: underline;
  cursor: pointer;
`

const TransactionsTable = ({ sellers, setSellers, reload, monthIndex }) => {
  const classes = useStyles();
  
  const updatePaymentState = (sellerToUpdate, newState) => {
    let newPaidByMonth = [...sellerToUpdate.shop.paidByMonth];
    newPaidByMonth.splice(monthIndex, 1, newState);
    const newShop = {
      ...sellerToUpdate.shop,
      paidByMonth: newPaidByMonth
    }
    
    // local update
    setSellers(sellers.map((seller) => {
      if (seller._id === sellerToUpdate._id) {
        return {
          ...sellerToUpdate,
          shop: newShop
        }
      }
      return seller;
    }))
    
    // db update
    api.put(`/user/${sellerToUpdate._id}/update`, { shop: newShop })
      .then(() => {})
      .catch((e) => {
        log('ERROR TransactionsTable', e);
        reload();
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Shop Name</TableCell>
            <TableCell align="center">이름</TableCell>
            <TableCell align="center">이메일</TableCell>
            <TableCell align="center">휴대폰번호</TableCell>
            <TableCell align="center">은행명</TableCell>
            <TableCell align="center">계좌번호</TableCell>
            <TableCell align="center">매출금액</TableCell>
            <TableCell align="center">확인</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellers.map((seller) => (
            <TableRow key={seller._id}>
              <TableCell align="center">{seller.shop.title}</TableCell>
              <TableCell align="center">{seller.name}</TableCell>
              <TableCell align="center">{seller.email}</TableCell>
              <TableCell align="center">{seller.mobile}</TableCell>
              <TableCell align="center">
                {(seller.shop.account && seller.shop.account.bank )
                  ? seller.shop.account.bank 
                  : '미등록'
                }
              </TableCell>
              <TableCell align="center">
                {(seller.shop.account && seller.shop.account.number )
                  ? seller.shop.account.number 
                  : '미등록'
                }
              </TableCell>
              <TableCell align="right">{seller.monthlyRevenue.toLocaleString()}</TableCell>
              <TableCell align="center">
                {seller.shop.paidByMonth[monthIndex]
                  ? (
                    <Complete>
                      <p>이체완료</p>
                      <Cancel onClick={() => updatePaymentState(seller, false)}>취소</Cancel>
                    </Complete>
                  )
                  : <Center><Btn size='sm' onClick={() => updatePaymentState(seller, true)}>이체확인</Btn></Center>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsTable;
