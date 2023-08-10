import { Order } from '../../../model';
import { supabase } from '../../../supabase';

export const getTimeFromPostgreSQL = (time: string): string => {
  const monthsInKorean = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const translate = new Date(time);
  // 한국 표준시로 변환
  translate.setHours(translate.getHours()); // 영국과 한국의 시차는 9시간입니다.
  const month = monthsInKorean[translate.getMonth()];
  const day = translate.getDate();
  const hours = translate.getHours();
  const minutes = translate.getMinutes();
  return `${month} ${day}일 ${hours}시 ${minutes}분`;
};

export const checkNewOrderById = (prev: Order[], updateData: Order): { index: number; isNew: boolean } => {
  let index = 0;
  let isNew = true;
  prev.forEach((order, checkIndex) => {
    if (order.id === updateData.id) {
      index = checkIndex;
      isNew = !isNew;
    }
  });
  return { index, isNew };
};

//실시간 업데이트 // 구독
export const updateOrderData = (orders: Order[], setOrders: React.Dispatch<React.SetStateAction<Order[]>>) => {
  supabase
    .channel('custom-db-channel')
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'orders' }, (payload) => {
      const newOrder = payload.new as Order;
      if (newOrder.isDone) {
        const changedOrder = orders.filter((order) => {
          return order.id !== payload.new.id;
        });
        setOrders([...changedOrder]);
        return;
      }
      // 함수실행 => 기존의 주문번호를 가지고 같은게 있으면 그 인덱스를 반환하고 신규주문이면 0을 반환함
      const condition = checkNewOrderById(orders, newOrder);
      if (condition.isNew) {
        // 신규 주문이기 때문에 추가해서 state 세팅
        setOrders([...orders, newOrder]);
      } else if (!condition.isNew) {
        // orders  해당하는 주문만 값을 바꿔서 setOrders
        orders.splice(condition.index, 1, newOrder);
        setOrders([...orders]);
      }
    })
    .subscribe();
};

export const orderStateChanger = async (order: Order) => {
  if (!order.isActive) {
    if (window.confirm('주문을 접수하시겠습니까?')) {
      try {
        const { data, error } = await supabase.from('orders').update({ isActive: !order.isActive }).eq('id', order.id);
      } catch (error) {
        console.error('Error Updating orders:', error);
      }
    } else return;
  } else {
    if (window.confirm('[조리완료]로 변경하시겠습니까?')) {
      try {
        const { data, error } = await supabase.from('orders').update({ isDone: !order.isDone }).eq('id', order.id);
      } catch (error) {
        console.error('Error Updating orders:', error);
      }
    } else return;
  }
};

export const orderCounter = (orders: Order[]): { new: number; active: number } => {
  let newOrder = 0;
  let activeOrder = 0;
  orders.forEach((order) => {
    if (order.isActive === false) {
      newOrder++;
    } else {
      activeOrder++;
    }
  });
  return { new: newOrder, active: activeOrder };
};

export const filteredOrder = (orders: Order[]): { newOrder: Order[]; activeOrder: Order[] } => {
  let newOrder: Order[] = [];
  let activeOrder: Order[] = [];
  orders.forEach((order) => {
    if (!order.isActive) {
      newOrder.push(order);
    } else {
      activeOrder.push(order);
    }
  });
  return { newOrder, activeOrder };
};
