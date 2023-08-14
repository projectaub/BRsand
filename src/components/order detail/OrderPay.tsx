import React from 'react';
import { styled } from 'styled-components';

export interface RequestPayAdditionalParams {
  digital?: boolean;
  vbank_due?: string;
  m_redirect_url?: string;
  app_scheme?: string;
  biz_num?: string;
}

export interface Display {
  card_quota?: number[];
}

export interface RequestPayParams extends RequestPayAdditionalParams {
  pg?: string;
  pay_method: string;
  escrow?: boolean;
  merchant_uid: string;
  name?: string;
  amount: number;
  custom_data?: any;
  tax_free?: number;
  currency?: string;
  language?: string;
  buyer_name?: string;
  buyer_tel: string;
  buyer_email?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  notice_url?: string | string[];
  display?: Display;
}

export interface RequestPayAdditionalResponse {
  apply_num?: string;
  vbank_num?: string;
  vbank_name?: string;
  vbank_holder?: string | null;
  vbank_date?: number;
}

export interface RequestPayResponse extends RequestPayAdditionalResponse {
  success: boolean;
  error_code: string;
  error_msg: string;
  imp_uid: string | null;
  merchant_uid: string;
  pay_method?: string;
  paid_amount?: number;
  status?: string;
  name?: string;
  pg_provider?: string;
  pg_tid?: string;
  buyer_name?: string;
  buyer_email?: string;
  buyer_tel?: string;
  buyer_addr?: string;
  buyer_postcode?: string;
  custom_data?: any;
  paid_at?: number;
  receipt_url?: string;
}

export type RequestPayResponseCallback = (response: RequestPayResponse) => void;

export interface Iamport {
  init: (accountID: string) => void;
  request_pay: (params: RequestPayParams, callback?: RequestPayResponseCallback) => void;
}

declare global {
  interface Window {
    IMP?: Iamport;
  }
}

const OrderPay = ({ updateOrder, setPay }: any) => {
  // 결제시스템을 작동

  //

  const submitPay = () => {
    setPay(false);
    updateOrder();
  };

  const onClickPayment = () => {
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init('imp47047177'); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data: RequestPayParams = {
      // kcp, kakaopay 등록해놨음
      pg: 'kakaopay', // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
      amount: 10000, // 결제금액
      name: '벼락샌드', // 주문명
      buyer_name: '홍길동', // 구매자 이름
      buyer_tel: '01012341234', // 구매자 전화번호
      buyer_email: 'example@example', // 구매자 이메일
      buyer_addr: '신사동 661-16', // 구매자 주소
      buyer_postcode: '06018' // 구매자 우편번호
    };

    /* 4. 결제 창 호출하기 */
    IMP.request_pay(data, callback);
  };

  /* 3. 콜백 함수 정의하기 */
  function callback(response: RequestPayResponse) {
    const { success, error_msg } = response;

    if (success) {
      alert('결제에 성공하였습니다.');
      submitPay();
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  }
  return (
    <div style={{ width: '240px', margin: '340px auto' }}>
      <StH>결제방식을 선택해주세요.</StH>
      <SPay onClick={submitPay}>현금</SPay>
      <SPay onClick={onClickPayment}>카드</SPay>
    </div>
  );
};

const StH = styled.h1`
  text-align: center;
  font-size: 18px;
`;

const SPay = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 5px;
  font-size: 17px;
  cursor: pointer;
  margin: 10px;

  background-color: #b73d52;
  color: white;
  border: none;
  &:hover {
    background-color: #ffcd7c;
    color: white;
  }
`;

export default OrderPay;
