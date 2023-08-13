import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import { Order } from '../../model/Order';
import { User } from '../../model/User';
import { styled } from 'styled-components';

const Grade = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [userTotalPrices, setUserTotalPrices] = useState<{ [username: string]: number }>({});
  const [userUpgradeGrades, setUserUpgradeGrades] = useState<{ [username: string]: string }>({});

  const getOrderInfo = async () => {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) {
      console.error('Error fetching order data:', error);
    } else {
      setOrderData(data as Order[]);
    }
  };

  const getUserInfo = async () => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users data:', error);
    } else {
      setUserData(data as User[]);
    }
  };

  useEffect(() => {
    getOrderInfo();
    getUserInfo();
  }, []); // Fetch order and user data when the component mounts

  useEffect(() => {
    // Calculate total prices for each user
    const userPrices: { [username: string]: number } = {};

    orderData.forEach((order) => {
      const username = order.user.name;
      const price = order.price;

      if (username !== null) {
        if (userPrices[username]) {
          userPrices[username] += price;
        } else {
          userPrices[username] = price;
        }
      }
    });

    setUserTotalPrices(userPrices);

    const upgradeGrades: { [username: string]: string } = {};

    Object.keys(userPrices).forEach((username) => {
      const totalPrice = userPrices[username];

      if (totalPrice >= 70000) {
        upgradeGrades[username] = 'Gold';
      } else if (totalPrice >= 30000) {
        upgradeGrades[username] = 'Silver';
      } else {
        upgradeGrades[username] = 'basic';
      }
    });

    // Update user upgrade grades
    setUserUpgradeGrades(upgradeGrades);
  }, [orderData]);

  const handleReflectClick = async (username: string) => {
    const newGrade = userUpgradeGrades[username];

    // Collect promises for updating both orders and users
    const orderUpdatePromises = orderData.map(async (order) => {
      if (order.user.name === username) {
        order.user.grade = newGrade;
        // Update the order's user grade
        await supabase
          .from('orders')
          .update({ user: { ...order.user, grade: newGrade } })
          .eq('id', order.id);
      }
      return order;
    });

    const userUpdatePromises = userData.map(async (user) => {
      if (user.name === username) {
        user.grade = newGrade;
        // Update the user's grade
        await supabase.from('users').update({ grade: newGrade }).eq('name', user.name);
      }
      return user;
    });

    // Await both promises
    await Promise.all(orderUpdatePromises);
    await Promise.all(userUpdatePromises);

    // Refresh data and update local state
    getOrderInfo();
    getUserInfo();
  };

  const sortedUsernames = Object.keys(userTotalPrices).sort((a, b) => {
    const gradeA = userData.find((user) => user.name === a)?.grade;
    const gradeB = userData.find((user) => user.name === b)?.grade;
    if (gradeA === gradeB) {
      return userTotalPrices[b] - userTotalPrices[a];
    } else if (gradeA === 'Gold') {
      return -1;
    } else if (gradeA === 'Silver' && gradeB === 'basic') {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <Container>
      <Table>
        <thead>
          <TableRow userGrade="index">
            <TableHeader>이름</TableHeader>
            <TableHeader>현재 회원 등급</TableHeader>
            <TableHeader>업데이트 될 회원 등급</TableHeader>
            <TableHeader>회원 ID</TableHeader>
            <TableHeader>총 주문 액</TableHeader>
            <TableHeader>최근 주문 일시</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {sortedUsernames?.map((username, index) => {
            const user = userData.find((user) => user.name === username);
            const order = orderData.find((order) => order.user.name === username); // 수정된 부분

            if (user) {
              return (
                <TableRow key={username} userGrade={user.grade}>
                  <TableCell>{username}</TableCell>
                  <TableCell>{user.grade}</TableCell>
                  <TableCell>{userUpgradeGrades[username]}</TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{userTotalPrices[username]}</TableCell>
                  <TableCell>{order!.time.slice(0, 10)}</TableCell>
                  <ReflectCell>
                    {orderData.find((order) => order.user.name === username)?.user.grade !==
                      userUpgradeGrades[username] && (
                      <ReflectButton onClick={() => handleReflectClick(username)}>Reflect</ReflectButton>
                    )}
                  </ReflectCell>
                </TableRow>
              );
            }
          })}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  margin: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableRow = styled.tr<{ userGrade: string }>`
  // 사용자 지정 속성을 선언합니다.
  background-color: ${(props) =>
    props.userGrade === 'Gold'
      ? '#B73D52'
      : props.userGrade === 'Silver'
      ? '#DB8B77'
      : props.userGrade === 'basic'
      ? '#F3BF8F'
      : '#FFD99B'};
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-weight: bold;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const ReflectCell = styled.td`
  text-align: center;
`;

const ReflectButton = styled.button`
  background-color: #b73d52;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #872f40;
  }
`;

export default Grade;
