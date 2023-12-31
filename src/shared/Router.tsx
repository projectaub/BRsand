import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Join from '../pages/join/Join';
import Login from '../pages/login/Login';
import Mypage from '../pages/mypage/Mypage';
import OrderPage from '../pages/orderpage/OrderPage';
import Orderstatus from '../pages/order status/Orderstatus';
import SalesStatus from '../pages/sales status/SalesStatus';
import InventoryStatus from '../pages/Inventory status/InventoryStatus';
import Statistics from '../pages/statistics/Statistics';
import OrderMenu from '../pages/orderpage/OrderMenu';
import OrderCustom from '../pages/orderpage/OrderCustom';
import Mobile from './layout/Mobile';
import { PrivateRoute } from '../pages/statistics/PrivateRoute';
import AdminLogin from '../pages/admin/login/AdminLogin';
import LoginSocial from '../components/login/LoginSocial';
import Web from './layout/Web';
import Grade from '../components/grade/Grade';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mobile />}>
          {/* 유저 로그인 / 회원가입 / 마이페이지 */}
          <Route path="/" element={<Main />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/login-social" element={<LoginSocial />} />

          {/* 주문관련 - 모바일 */}
          <Route element={<PrivateRoute />}>
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/order-custom" element={<OrderCustom />} />
            <Route path="/order-menu" element={<OrderMenu />} />
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Web />}>
            <Route path="/salestatus" element={<SalesStatus />} />
            <Route path="/inventorystatus" element={<InventoryStatus />} />
            <Route path="/statistics/:id" element={<Statistics />} />
            <Route path="/orderstatus/:id" element={<Orderstatus />} />
            <Route path="/grade/:id" element={<Grade />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
