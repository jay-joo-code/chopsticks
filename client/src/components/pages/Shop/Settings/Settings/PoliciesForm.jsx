import React, { useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OutlinedTextarea from 'src/components/common/form/OutlinedTextarea';
import Btn from 'src/components/common/buttons/Btn';
import api from 'src/util/api';
import fetchSelfAndStore from 'src/util/auth/fetchSelfAndStore';
import log from 'src/util/log';
import Alert from 'src/components/common/displays/Alert';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  
  @media (min-width: ${(props) => props.theme.desktopContentWidth}px) {
    width: 50%;
  }
`;

const Msg = styled.p`
  color: ${(props) => props.theme.primary};
  font-size: .8rem;
`;

const initDelivery = '*도서 산간 지방일 경우 추가 비용이 발생합니다. \n*배송 시, 디자이너 및 작가 별로 배송비가 부과됩니다';
const initRefund = '*주문제작 상품의 경우 단순변심으로 인한 환불이 불가합니다.\n' +
'*상품 수령일로부터 7일 이내 교환 / 환불 가능합니다.\n' +
'*단순 변심으로 인한 반품의 경우, 배송비를 차감한 금액이 환불되며, 제품의 상태가 재판매 가능하여야 합니다.\n' +
'*단순 변심으로 인한 교환의 경우, 왕복 배송비가 추가로 발생합니다.\n' +
'*상품의 하자로 인한 경우, 동일 상품에 한해서 교환 및 배송비를 포함한 전액이 환불 됩니다.\n' +
'*상품 출고 이후 취소요청 시, 반품절차에 따라 처리됩니다.\n\n'  +
'교환/환불이 불가능한 경우\n' +
'*제품을 사용 또는 훼손한 경우, 사은품 누락, 상품 TAG, 보증서, 상품 부자재가 제거 혹은 분실된 경우.\n' +
'*일봉 포장을 개봉했거나 내부 포장재를 훼손 또는 분실한 경우.(단, 제품 확인을 위한 개봉 제외)\n' +
'*시간이 경과되어 재판매가 어려울 정도로 상품 가치가 상실된 경우.\n' +
'*주문/제작 상품의 경우, 상품의 제작이 이미 진행된 경우.\n' +
'*기타 전자상거래 등에서의 소비자보호에 관한 법률이 정하는 청약 철회 제한 사유에 해당하는 경우.'

const PoliciesForm = ({ user }) => {
  const { delivery, refund, etc } = user.shop.policies || {};
  const [msg, setMsg] = useState('');
  const formik = useFormik({
    initialValues: {
      delivery: delivery || initDelivery,
      refund: refund || initRefund,
      etc: etc || '',
    },
    validationSchema: Yup.object({
      delivery: Yup.string()
        .required('필수'),
      refund: Yup.string()
        .required('필수'),
      etc: Yup.string()
        .required('필수'),
    }),
    onSubmit: (values) => {
      const updatedShop = { ...user.shop, policies: values };
      const updatedUser = { ...user, shop: updatedShop };
      api.put(`/user/${user._id}/update`, updatedUser)
        .then((res) => {
          fetchSelfAndStore(user._id);
          setShowAlert(true);
        })
        .catch((e) => log('ERROR update shop policies'));
    },
  });

  // alert after success
  const [showAlert, setShowAlert] = useState(false);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="delivery"
          label="제작 / 배송"
          height={400}
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="refund"
          label="환불 / 교환"
          height={400}
        />
      </InputContainer>
      <InputContainer>
        <OutlinedTextarea
          formik={formik}
          name="etc"
          label="추가 정보"
          height={400}
        />
      </InputContainer>
      <Btn
        type="submit"
      >
저장
      </Btn>
      {msg && msg.length > 0 && <Msg>{msg}</Msg>}
      <Alert
        show={showAlert}
        setShow={setShowAlert}
        msg="저장되었습니다"
      />
    </Form>
  );
};

export default PoliciesForm;
