import { Order } from '../../../model';

export const dataSorted = (orderList: Order[]) => {
  //매출
  let sales = 0;
  //주문 건 수 변수
  let salesCount = orderList.length;
  // 커스텀 주문 건수
  let orderCustom = [];
  //메뉴 주문 건수
  let orderMenu = [];

  // 베이스 메뉴별 판매량
  const menuCount: { name: string; count: number }[] = [];
  const ageCount: { gen: string; count: number }[] = [];

  //한번의 순회 반복문으로 다양한 데이터를 걸러야함...
  let counts: { [key: string]: number } = {};
  let ageCounts: { [key: string]: number } = {};

  orderList.forEach((order) => {
    const base = order.orderMenu.base;
    counts[base] ? counts[base]++ : (counts[base] = 1);
    if (order.user.age) {
      const age = Math.floor(order.user.age / 10);
      ageCounts[age] ? ageCounts[age]++ : (ageCounts[age] = 1);
    }
    sales += order.price;
    order.orderMenu.bread ? orderCustom.push(order) : orderMenu.push(order);
  });

  Object.keys(counts).forEach((base) => {
    menuCount.push({ name: base, count: counts[base] });
  });
  Object.keys(ageCounts).forEach((age) => {
    ageCount.push({ gen: age, count: ageCounts[age] });
  });

  return {
    sales: `${sales.toLocaleString('ko-KR')}원`,
    salesCount: `${salesCount}건`,
    orderCustomNum: `${orderCustom.length}건`,
    orderMenuNum: `${orderMenu.length}건`,
    menuCount: menuCount,
    ageCount: ageCount
  };
};
