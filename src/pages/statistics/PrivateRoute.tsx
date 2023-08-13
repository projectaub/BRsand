import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

export const PrivateRoute = (): React.ReactElement => {
  const token = localStorage.getItem('sb-oavbcvwhegykdcczsqfr-auth-token');
  const tokenCheck = (token: string | null): boolean => {
    if (token) {
      return true;
    } else {
      alert('로그인 후 이용 가능합니다.');
      return false;
    }
  };

  return tokenCheck(token) ? <Outlet /> : <Navigate to="/" />;
};
