import { Order } from '../../../model';

export const checkNewOrderById = (prev: Order[], updateData: Order): number => {
  let index = 0;
  prev.forEach((order, checkIndex) => {
    if (order.id === updateData.id) {
      index = checkIndex;
    }
  });
  return index;
};
