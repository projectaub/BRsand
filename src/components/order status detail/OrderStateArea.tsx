import React from 'react';
import { Order } from '../../model';
import OrderStateCard from './OrderStateCard';

interface Props {
  orderList: Order[];
}

const OrderStateArea = ({ orderList }: Props) => {
  console.log(orderList);
  return <OrderStateCard></OrderStateCard>;
};

export default OrderStateArea;
