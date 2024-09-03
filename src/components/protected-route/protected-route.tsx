import { ReactElement, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { checkUserAuth } from '../../services/slices/user-slice';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  regRoute?: boolean;
  children: ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  regRoute,
  children
}: ProtectedRouteProps) => {
  const { isAuthChecked, data } = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (regRoute && data) {
    return <Navigate replace to='/profile' />;
  }

  if (!data) {
    if (!onlyUnAuth && !regRoute) {
      return <Navigate replace to='/login' />;
    }
  }

  if (data && onlyUnAuth) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
